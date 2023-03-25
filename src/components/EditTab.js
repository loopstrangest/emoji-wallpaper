import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useState, useEffect } from "react";
import emojiRegex from "emoji-regex";
import {
  Box,
  Slider,
  TextField,
  Typography,
} from "@mui/material";

export const EditTab = ({emojiSize, setEmojiSize, emojiMargin, setEmojiMargin, emojiRotation, setEmojiRotation, emojiSkew, setEmojiSkew, orientation, setOrientation}) => {

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
    setOrientation(orientation === "row" ? "column" : "row");
  };

  function setEmojiImgSize(size) {
    const emojiSpans = document.querySelectorAll("em-emoji span");
    emojiSpans.forEach((emojiSpan) => {
      emojiSpan.style.display = "block";
      emojiSpan.style.height = size;
      emojiSpan.style.width = size;
    });
    console.log("set emoji spans to", size);
    const emojis = document.querySelectorAll("em-emoji span img");
    emojis.forEach((emoji) => {
      emoji.style.maxHeight = size;
      emoji.style.maxWidth = size;
      emoji.style.height = size;
      emoji.style.width = size;
    });
  }

  const handleSizeChange = (event, newValue) => {
    setEmojiSize(newValue * downloadScaleFactor);
    setEmojiImgSize(`${newValue * downloadScaleFactor}px`);
  };

  const handleMarginChange = (event, newValue) => {
    setEmojiMargin(newValue * downloadScaleFactor);
  };

  function validateEmoji(text) {
    // Regular expression for matching emojis and Emoji ZWJ Sequences
    let emojiArray = [];
    let emojiCount = 0;
    const regex = emojiRegex();
    for (const match of text.matchAll(regex)) {
      const emoji = match[0];
      emojiArray.push(emoji);
      emojiCount += 1;
      if (emojiCount == 4) {
        break;
      }
    }
    if (emojiArray.length > 0) {
      return emojiArray;
    } else {
      return undefined;
    }
  }

  const sizeAndSpacingSliders =  <Box sx={{ display: "flex", flexDirection: "column", ml: dimensions.width > 700 ? 0.5 : 0,
   mr:dimensions.width > 700 ? 3 : 2 }}>
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
      width: "250px",
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
    min={0}
    max={60}
    defaultValue={emojiMargin / downloadScaleFactor}
    onChangeCommitted={handleMarginChange}
    aria-label="Emoji size slider"
    valueLabelDisplay="auto"
    sx={{
      width: "250px",
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
</Box>;

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
      mb:"0px",
      outline:"0px solid red",
      padding: "8px",
      borderRadius: "8px",
    }}
  >
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mt:dimensions.width > 700 ? 3 : 0,
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
      
      {dimensions.width > 700 ? sizeAndSpacingSliders : <></> }
      <Box mx={0.5}>
        <TextField
          type="number"
          label="Angle"
          defaultValue={emojiRotation}
          onChange={(e) => {
            console.log(e);
            e.target.value
              ? setEmojiRotation(e.target.value)
              : setEmojiRotation(0)
}          }
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
              ? setEmojiSkew(e.target.value)
              : setEmojiSkew(0)
          }
          sx={{ width: "100px" }}
          InputLabelProps={{
            style: { color: "black" },
          }}
        ></TextField>
      </Box>
    </Box>
    {dimensions.width <= 700 ? sizeAndSpacingSliders : <></> }
  </Box>
  );
};
