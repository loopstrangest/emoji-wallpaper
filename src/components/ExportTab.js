import React, { useState } from "react";
import { Button, Box, TextField } from "@mui/material";
import { downloadWallpaper } from "../functions/Export";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

export const ExportTab = ({ presetExport, setPresetExport, userDimensions, setUserDimensions }) => {

  const downloadScaleFactor = 2;

  const handleDimensionChange = (e, dimension) => {
    const value = parseInt(e.target.value) || 64;
    if (value === "" || value > 5000) return;
    setUserDimensions((prev) => ({
      ...prev,
      [dimension]: value * downloadScaleFactor,
    }));
    setPresetExport(null);
  };

  const handleButtonClick = (dimensions, index) => {
    setUserDimensions({ width: dimensions.width * downloadScaleFactor, height: dimensions.height * downloadScaleFactor });
    setPresetExport(index);
  };

  console.log('userDimensions:', userDimensions);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Box>
          <Button
            variant="text"
            sx={{
              m: 0.5,
              color: "black",
             
              padding:"4px",
          borderRadius:"8px",
              outline: presetExport === 1 ? "2px solid black" : "none",
              backgroundColor: presetExport === 1 ? "white" : "none",
            }}
            onClick={() =>
              handleButtonClick(
                { width: window.screen.width, height: window.screen.height },
                1
              )
            }
          >
            This Screen
          </Button>
          <Button
            variant="text"
            sx={{
              m: 0.5,
              color: "black",
              textTransform: "none",
              padding:"4px",
          borderRadius:"8px",
              outline: presetExport === 2 ? "2px solid black" : "none",
              backgroundColor: presetExport === 2 ? "white" : "none",
            }}
            onClick={() =>
              handleButtonClick(
                { width: window.innerWidth, height: window.innerHeight },
                2
              )
            }
          >
            This Webpage
          </Button>
          <Button
            variant="text"
            sx={{
              m: 0.5,
              color: "black",
              textTransform: "none",
              padding:"4px",
          borderRadius:"8px",
              outline: presetExport === 3 ? "2px solid black" : "none",
              backgroundColor: presetExport === 3 ? "white" : "none",
            }}
            onClick={() => handleButtonClick({ width: 1500, height: 500 }, 3)}
          >
            <TwitterIcon sx={{ marginRight: 1 }} />
            Header
          </Button>
          <Button
            variant="text"
            sx={{
              m: 0.5,
              color: "black",
              textTransform: "none",
              padding:"4px",
          borderRadius:"8px",
              outline: presetExport === 4 ? "2px solid black" : "none",
              backgroundColor: presetExport === 4 ? "white" : "none",
            }}
            onClick={() => handleButtonClick({ width: 820, height: 312 }, 4)}
          >
            <FacebookIcon sx={{ marginRight: 1 }} />
            Cover Photo
          </Button>
        </Box>
        <Box>
          <TextField
            label="Width"
            type="number"
            defaultValue={presetExport === null ? userDimensions.width / downloadScaleFactor : null}
            sx={{ width: "100px", mx: 0.5 }}
            InputProps={{ inputProps: { min: 24, max: 5000, step: 1 } }}
            onChange={(e) => handleDimensionChange(e, "width")}
          />
          <TextField
            label="Height"
            type="number"
            defaultValue={presetExport === null ? userDimensions.height / downloadScaleFactor : null}
            sx={{ width: "100px", mx: 0.5 }}
            InputProps={{ inputProps: { min: 24, max: 5000, step: 1 } }}
            onChange={(e) => handleDimensionChange(e, "height")}
          />
        </Box>
      </Box>
      <Button
        variant="contained"
        sx={{ mt: 2, backgroundColor:"black", 
        '&:hover, &:active': {
          backgroundColor: "black",
          color:"white",
        } }}
        onClick={() => downloadWallpaper()}
      >
        Download
      </Button>
    </Box>
  );
};
