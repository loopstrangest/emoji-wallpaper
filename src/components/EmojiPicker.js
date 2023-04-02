import "./EmojiPicker.css";
import { EmojiTab } from "./EmojiTab";
import { EditTab } from "./EditTab";
import { ColorTab } from "./ColorTab";
import { ExportTab } from "./ExportTab";
import { AboutTab } from "./AboutTab";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ConstructionIcon from "@mui/icons-material/Construction";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import InfoIcon from "@mui/icons-material/Info";
import { useState, useEffect, useLayoutEffect } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

export const EmojiPicker = () => {
  const [initializeApp, setInitializeApp] = useState(true);
  const [emojiSystem, setEmojiSystem] = useState(
    localStorage.getItem("emojiSystem") || "manyTypes"
  );
  const [setType, setSetType] = useState(
    localStorage.getItem("setType") || "apple"
  );
  const [skinTone, setSkinTone] = useState(
    localStorage.getItem("skinTone") || 0
  );
  const [emojiDisplay, setEmojiDisplay] = useState(
    localStorage.getItem("emojiDisplay") || "🌞🌻"
  );
  const [emoji, setEmoji] = useState(
    JSON.parse(localStorage.getItem("emoji")) || [
      "🌞",
      "🌻",
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ]
  );

  const downloadScaleFactor = 2;

  const convertToNumber = (input) => {
    if (typeof input === "string") {
      return parseInt(input, 10);
    }
    return input;
  };

  const [tab, setTab] = useState("emoji");

  const [orientation, setOrientation] = useState(
    localStorage.getItem("orientation") || "row"
  );
  const [emojiSize, setEmojiSize] = useState(
    convertToNumber(localStorage.getItem("emojiSize")) ||
      40 * downloadScaleFactor
  );
  const [emojiMargin, setEmojiMargin] = useState(
    convertToNumber(localStorage.getItem("emojiMargin")) || 0
  );
  const [emojiRotation, setEmojiRotation] = useState(
    localStorage.getItem("emojiRotation") || 0
  );
  const [emojiSkew, setEmojiSkew] = useState(
    localStorage.getItem("emojiSkew") || 0
  );
  const [emojiCount, setEmojiCount] = useState(1000);
  const [color, setColor] = useState(
    JSON.parse(localStorage.getItem("color")) || ["white", "white"]
  );
  const [colorStyle, setColorStyle] = useState(
    localStorage.getItem("colorStyle") || "solid"
  );
  const [gradientDirection, setGradientDirection] = useState(
    localStorage.getItem("gradientDirection") || "SE"
  );
  const [gradientCSS, setGradientCSS] = useState("to bottom right");
  const [transform, setTransform] = useState("none");
  const [presetExport, setPresetExport] = useState(
    JSON.parse(localStorage.getItem("presetExport")) || null
  );
  const [imagePadding, setImagePadding] = useState({
    width: 0,
    height: 0,
  });
  const [userDimensions, setUserDimensions] = useState(
    JSON.parse(localStorage.getItem("userDimensions")) || {
      width: window.innerWidth * downloadScaleFactor,
      height: window.innerHeight * downloadScaleFactor,
    }
  );
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [imagesReady, setImagesReady] = useState(false);

  document.body.style.overflow = "hidden";

  const handlePageResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  function calculateEmojiCount() {
    const imageWidth = userDimensions.width;
    const imageHeight = userDimensions.height;
    const emojiSizeWithMargin = emojiSize + emojiMargin * 2;
    const emojisPerRow = Math.floor(imageWidth / emojiSizeWithMargin);
    const emojisPerColumn = Math.floor(imageHeight / emojiSizeWithMargin);
    const widthPadding = (imageWidth - emojisPerRow * emojiSizeWithMargin) / 2;
    const heightPadding =
      (imageHeight - emojisPerColumn * emojiSizeWithMargin) / 2;
    console.log(
      imageWidth,
      imageHeight,
      emojiSize,
      emojiMargin,
      emojiSizeWithMargin,
      emojisPerRow,
      emojisPerColumn
    );
    setEmojiCount(emojisPerRow * emojisPerColumn);
    setImagePadding({ width: widthPadding, height: heightPadding });
  }

  function setEmojiImgSize(size) {
    console.log("size is", size);
    const emojiSpans = document.querySelectorAll("em-emoji span");
    emojiSpans.forEach((emojiSpan) => {
      emojiSpan.style.display = "block";
      emojiSpan.style.height = size;
      emojiSpan.style.width = size;
    });
    const emojis = document.querySelectorAll("em-emoji span img");
    emojis.forEach((emoji) => {
      console.log("found emoji");
      emoji.style.maxHeight = size;
      emoji.style.maxWidth = size;
      emoji.style.height = size;
      emoji.style.width = size;
    });
  }
  setEmojiImgSize(`${emojiSize}px`);

  function calculateTransform(
    childWidth,
    childHeight,
    containerWidth,
    containerHeight
  ) {
    // Calculate the scale factor required to fit the child element inside the container
    const widthScale = containerWidth / childWidth;
    const heightScale = containerHeight / childHeight;
    const displayScaleFactor = Math.min(widthScale, heightScale);
    if (displayScaleFactor >= 1) {
      setTransform("");
      return;
    }
    if (childWidth > childHeight) {
      setTransform(`scale(${displayScaleFactor})`);
    } else {
      setTransform(`scale(${displayScaleFactor})`);
    }
  }

  const emojiTabStyles = {
    fontSize: "44px",
  };

  const getEmojiById = (index) => {
    const numberOfEmoji = emoji.filter((emoji) => emoji).length;
    const selectedEmoji = emoji[index % numberOfEmoji];
    return selectedEmoji;
  };

  useEffect(() => {
    window.addEventListener("resize", handlePageResize, false);
  }, []);

  useEffect(() => {
    console.log("in set useffect");
    setEmojiImgSize(`${emojiSize}px`);
  }, []);

  useEffect(() => {}, [skinTone]);

  useEffect(() => {
    const emojiElements = document.querySelectorAll("em-emoji span img");
    emojiElements.forEach((element) => {
      element.style.width = emojiSize + "px";
      element.style.height = emojiSize + "px";
    });
  }, [emojiCount]);

  useEffect(() => {}, [emoji]);

  useEffect(() => {
    console.log("emojiSize, emojiMargin is", emojiSize, emojiMargin);
  }, [emojiSize, emojiMargin]);

  useEffect(() => {
    calculateEmojiCount();
    calculateTransform(
      userDimensions.width,
      userDimensions.height,
      dimensions.width,
      dimensions.height
    );
  }, [userDimensions, dimensions, emojiSize, emojiMargin]);

  const initObserver = () => {
    const targetNode = document.body;
    const config = { childList: true, subtree: true };
    const callback = (mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          const emojis = document.querySelectorAll("em-emoji span img");
          if (emojis.length > 0) {
            setImagesReady(true);
          }
        }
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);

    return observer;
  };

  useEffect(() => {
    const observer = initObserver();
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    setGradientCSS(
      gradientDirection === "SW"
        ? "to bottom left"
        : gradientDirection === "SE"
        ? "to bottom right"
        : gradientDirection === "NW"
        ? "to top left"
        : gradientDirection === "NE"
        ? "to top right"
        : gradientDirection === "N"
        ? "to top"
        : gradientDirection === "S"
        ? "to bottom"
        : gradientDirection === "E"
        ? "to right"
        : gradientDirection === "W"
        ? "to left"
        : "other"
    );
  }, [gradientDirection]); // <- add the count variable here

  return (
    <Container
      maxWidth={false}
      disableGutters={true}
      sx={{
        display: "flex",
        backgroundColor: "black",
        height: "100vh",
        width: "100vw",
        zIndex: "-2",
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          height: dimensions.height,
          width: dimensions.width,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {emojiCount <= 9000 ? (
          <Box
            id="emoji-wallpaper"
            sx={{
              display: "flex",
              minWidth: userDimensions.width,
              minHeight: userDimensions.height,
              position: "relative",
              height: userDimensions?.height,
              width: userDimensions?.width,
              transform: transform,
              //transformOrigin: "center center",
              zIndex: "0",
              overflow: "hidden",
            }}
          >
            <Grid
              container
              spacing={0}
              direction={orientation}
              alignContent="center"
              style={{
                paddingTop: orientation === "row" ? 0 : imagePadding.height,
                paddingLeft: orientation === "column" ? 0 : imagePadding.width,
                background:
                  colorStyle === "gradient" &&
                  gradientDirection !== "IN" &&
                  gradientDirection !== "OUT"
                    ? `linear-gradient(${gradientCSS}, ${color[0]}, ${color[1]})`
                    : colorStyle === "gradient" && gradientDirection === "OUT"
                    ? `radial-gradient(${color[0]}, ${color[1]})`
                    : colorStyle === "gradient" && gradientDirection === "IN"
                    ? `radial-gradient(${color[1]}, ${color[0]})`
                    : color[0],
              }}
            >
              {Array.from(Array(emojiCount)).map((_, index) => (
                <Grid
                  item
                  key={JSON.stringify(emoji + index + skinTone)}
                  style={{
                    position: "relative",
                    width: emojiSize + "px",
                    height: emojiSize + "px",
                    maxWidth: emojiSize + "px",
                    maxHeight: emojiSize + "px",
                    margin: emojiMargin + "px",
                    transform: `rotate(${emojiRotation}deg) skew(${emojiSkew}deg)`,
                    outline: "0px solid red",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: emojiSize + "px",
                      height: emojiSize + "px",
                      flexWrap: "wrap",
                    }}
                  >
                    {emojiSystem == "highResolution" ? (
                      <p
                        id={getEmojiById(index)}
                        style={{
                          position: "absolute",
                          top: "-" + emojiSize * 1.125 + "px",
                          display: "block",
                          fontSize: emojiSize + "px",
                          width: emojiSize + "px",
                          height: emojiSize + "px",
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                        }}
                        key={index}
                      >
                        {getEmojiById(index)}
                      </p>
                    ) : (
                      <em-emoji
                        id={getEmojiById(index)}
                        skin={skinTone.toString()}
                        set={setType}
                        size={emojiSize + "px"}
                        style={{
                          display: "block",
                          fontSize: emojiSize + "px",
                          width: emojiSize + "px",
                          height: emojiSize + "px",
                        }}
                        key={index}
                      />
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Typography
            sx={{
              position: "absolute",
              height: "auto",
              width: "auto",
              maxWidth: "90%",
              margin: "auto",
              padding: "8px",
              top: "32.5%",
              backgroundColor: "white",
              borderRadius: "8px",
              outline: "2px solid black",
            }}
          >
            Too many emojis. Try increasing emoji size or spacing, or decreasing
            wallpaper size.
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          alignItems: "center",
          bottom: "8px",
          left: 0,
          right: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flexWrap: "wrap",
            overflow: "auto",
            width: `${dimensions.width * 0.9}px`,
            maxWidth: "1200px",
            margin: "auto",
            padding: "8px",
            borderRadius: "8px",
            outline: "2px solid black",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(3px)",
          }}
        >
          {tab === "emoji" && (
            <EmojiTab
              setType={setType}
              setSetType={setSetType}
              emojiSystem={emojiSystem}
              setEmojiSystem={setEmojiSystem}
              emoji={emoji}
              setEmoji={setEmoji}
              emojiDisplay={emojiDisplay}
              setEmojiDisplay={setEmojiDisplay}
              setSkinTone={setSkinTone}
              initializeApp={initializeApp}
              setInitializeApp={setInitializeApp}
            />
          )}
          {tab === "edit" && (
            <EditTab
              emojiSize={emojiSize}
              setEmojiSize={setEmojiSize}
              emojiMargin={emojiMargin}
              setEmojiMargin={setEmojiMargin}
              emojiRotation={emojiRotation}
              setEmojiRotation={setEmojiRotation}
              emojiSkew={emojiSkew}
              setEmojiSkew={setEmojiSkew}
              orientation={orientation}
              setOrientation={setOrientation}
              dimensions={dimensions}
            />
          )}
          {tab === "color" && (
            <ColorTab
              color={color}
              setColor={setColor}
              colorStyle={colorStyle}
              setColorStyle={setColorStyle}
              gradientDirection={gradientDirection}
              setGradientDirection={setGradientDirection}
            />
          )}
          {tab === "export" && (
            <ExportTab
              presetExport={presetExport}
              setPresetExport={setPresetExport}
              userDimensions={userDimensions}
              setUserDimensions={setUserDimensions}
            />
          )}
          {tab === "about" && <AboutTab />}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Box
              sx={{
                width: "19%",
                cursor: "pointer",
                borderRadius: "8px",
                backgroundColor:
                  tab === "emoji" ? "rgba(255, 255, 255, 0.75)" : "none",
                outline: tab === "emoji" ? "2px solid black" : "none",
                "&:hover": {
                  outline: "2px solid black",
                },
              }}
              onClick={() => setTab("emoji")}
            >
              <EmojiEmotionsIcon
                sx={{
                  ...emojiTabStyles,
                }}
              />
            </Box>
            <Box
              sx={{
                width: "19%",
                cursor: "pointer",
                borderRadius: "8px",
                backgroundColor:
                  tab === "edit" ? "rgba(255, 255, 255, 0.75)" : "none",
                outline: tab === "edit" ? "2px solid black" : "none",
                "&:hover": {
                  outline: "2px solid black",
                },
              }}
              onClick={() => setTab("edit")}
            >
              <ConstructionIcon
                sx={{
                  ...emojiTabStyles,
                }}
              />
            </Box>
            <Box
              sx={{
                width: "19%",
                cursor: "pointer",
                borderRadius: "8px",
                backgroundColor:
                  tab === "color" ? "rgba(255, 255, 255, 0.75)" : "none",
                outline: tab === "color" ? "2px solid black" : "none",
                "&:hover": {
                  outline: "2px solid black",
                },
              }}
              onClick={() => setTab("color")}
            >
              <ColorLensIcon
                sx={{
                  ...emojiTabStyles,
                }}
              />
            </Box>
            <Box
              sx={{
                width: "19%",
                cursor: "pointer",
                borderRadius: "8px",
                backgroundColor:
                  tab === "export" ? "rgba(255, 255, 255, 0.75)" : "none",
                outline: tab === "export" ? "2px solid black" : "none",
                "&:hover": {
                  outline: "2px solid black",
                },
              }}
              onClick={() => setTab("export")}
            >
              <FileDownloadIcon
                sx={{
                  ...emojiTabStyles,
                }}
              />
            </Box>
            <Box
              sx={{
                width: "19%",
                cursor: "pointer",
                borderRadius: "8px",
                backgroundColor:
                  tab === "about" ? "rgba(255, 255, 255, 0.75)" : "none",
                outline: tab === "about" ? "2px solid black" : "none",
                "&:hover": {
                  outline: "2px solid black",
                },
              }}
              onClick={() => setTab("about")}
            >
              <InfoIcon
                sx={{
                  ...emojiTabStyles,
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
