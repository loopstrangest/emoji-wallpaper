import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useState, useEffect } from "react";
import emojiRegex from "emoji-regex";
import { Box, Slider, TextField, Typography } from "@mui/material";

export const EditTab = ({
  emojiSize,
  setEmojiSize,
  emojiMargin,
  setEmojiMargin,
  emojiRotation,
  setEmojiRotation,
  emojiSkew,
  setEmojiSkew,
  orientation,
  setOrientation,
}) => {
  document.body.style.overflow = "hidden";
  const downloadScaleFactor = 2;

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  const emojiTypeStyles = {
    cursor: "pointer",
    padding: "4px",
    fontSize: "48px",
    borderRadius: "100px",
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  const handleOrientation = () => {
    updateOrientation(orientation === "row" ? "column" : "row");
  };

  function setEmojiImgSize(size) {
    const emojiSpans = document.querySelectorAll("em-emoji span");
    emojiSpans.forEach((emojiSpan) => {
      emojiSpan.style.display = "block";
      emojiSpan.style.height = size;
      emojiSpan.style.width = size;
    });
    const emojis = document.querySelectorAll("em-emoji span img");
    emojis.forEach((emoji) => {
      emoji.style.maxHeight = size;
      emoji.style.maxWidth = size;
      emoji.style.height = size;
      emoji.style.width = size;
    });
  }

  const handleSizeChange = (event, newValue) => {
    updateEmojiSize(newValue * downloadScaleFactor);
    setEmojiImgSize(`${newValue * downloadScaleFactor}px`);
  };

  const handleMarginChange = (event, newValue) => {
    updateEmojiMargin(newValue * downloadScaleFactor);
  };

  const updateEmojiSize = (newEmojiSize) => {
    setEmojiSize(newEmojiSize);
    localStorage.setItem("emojiSize", newEmojiSize);
  };

  const updateEmojiMargin = (newEmojiMargin) => {
    setEmojiMargin(newEmojiMargin);
    localStorage.setItem("emojiMargin", newEmojiMargin);
  };

  const updateEmojiRotation = (newEmojiRotation) => {
    setEmojiRotation(newEmojiRotation);
    localStorage.setItem("emojiRotation", newEmojiRotation);
  };

  const updateEmojiSkew = (newEmojiSkew) => {
    setEmojiSkew(newEmojiSkew);
    localStorage.setItem("emojiSkew", newEmojiSkew);
  };

  const updateOrientation = (newOrientation) => {
    setOrientation(newOrientation);
    localStorage.setItem("orientation", newOrientation);
  };

  const sizeAndSpacingSliders = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        ml: dimensions.width > 700 ? 0.5 : 0,
        mr: dimensions.width > 700 ? 3 : 0,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ pl: "27px", pr: "16px" }}>Size</Typography>
        <Slider
          min={24}
          max={120}
          defaultValue={emojiSize / downloadScaleFactor}
          onChangeCommitted={handleSizeChange}
          aria-label="Emoji size slider"
          valueLabelDisplay="auto"
          sx={{
            width: dimensions.width > 700 ? "250px" : "225px",
            my: "auto",
            zIndex: "1",
            color: "black",
            "& .MuiSlider-thumb": {
              backgroundColor: "black",
            },
            "& .MuiSlider-valueLabel": {
              backgroundColor: "black",
            },
          }}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ pr: "16px" }}>Spacing</Typography>
        <Slider
          min={Math.floor(emojiSize / 8) * -1}
          max={60}
          defaultValue={emojiMargin / downloadScaleFactor}
          onChangeCommitted={handleMarginChange}
          aria-label="Emoji size slider"
          valueLabelDisplay="auto"
          sx={{
            width: dimensions.width > 700 ? "250px" : "225px",
            my: "auto",
            zIndex: "1",
            color: "black",
            "& .MuiSlider-thumb": {
              backgroundColor: "black",
            },
            "& .MuiSlider-valueLabel": {
              backgroundColor: "black",
            },
          }}
        />
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        flexWrap: "wrap",
        overflow: "auto",
        width: "min-content",
        margin: "auto",
        mb: "0px",
        outline: "0px solid red",
        padding: "8px",
        borderRadius: "8px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: dimensions.width > 700 ? 3 : 0,
        }}
      >
        <AutorenewIcon
          sx={{
            mr: 0.5,
            cursor: "pointer",
            fontSize: "64px",
            borderRadius: "100px",
          }}
          onClick={handleOrientation}
        />

        {dimensions.width > 700 ? sizeAndSpacingSliders : <></>}
        <Box mx={0.5}>
          <TextField
            type="number"
            label="Angle"
            defaultValue={emojiRotation}
            onChange={(e) => {
              e.target.value
                ? updateEmojiRotation(e.target.value)
                : updateEmojiRotation(0);
            }}
            sx={{ width: "100px" }}
            InputLabelProps={{
              style: { color: "black" },
            }}
          ></TextField>
        </Box>
        <Box mx={0.5}>
          <TextField
            type="number"
            label="Skew"
            defaultValue={emojiSkew}
            onChange={(e) =>
              e.target.value
                ? updateEmojiSkew(e.target.value)
                : updateEmojiSkew(0)
            }
            sx={{ width: "100px" }}
            InputLabelProps={{
              style: { color: "black" },
            }}
          ></TextField>
        </Box>
      </Box>
      {dimensions.width <= 700 ? sizeAndSpacingSliders : <></>}
    </Box>
  );
};
