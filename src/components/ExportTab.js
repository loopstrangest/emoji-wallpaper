import React, { useState } from "react";
import { Button, Box, CircularProgress, TextField } from "@mui/material";
import { downloadWallpaper } from "../functions/Export";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiCircularProgress: {
      styleOverrides: {
        colorPrimary: {
          color: "#ffffff",
        },
      },
    },
  },
});

export const ExportTab = ({
  presetExport,
  setPresetExport,
  userDimensions,
  setUserDimensions,
}) => {
  const downloadScaleFactor = 2;

  const handleDimensionChange = (e, dimension) => {
    const value = parseInt(e.target.value) || 64;
    if (value === "" || value > 5000) return;
    updateUserDimensions((prev) => ({
      ...prev,
      [dimension]: value * downloadScaleFactor,
    }));
    updatePresetExport(null);
  };

  const handleButtonClick = (dimensions, index) => {
    updateUserDimensions({
      width: dimensions.width * downloadScaleFactor,
      height: dimensions.height * downloadScaleFactor,
    });
    updatePresetExport(index);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasError, setHasError] = useState(false);

  const download = async () => {
    setIsLoading(true);

    // Add a short delay before calling downloadWallpaper()
    setTimeout(async () => {
      const result = await downloadWallpaper();

      setIsLoading(false);
      if (result.success) {
        setIsCompleted(true);

        setTimeout(() => {
          setIsCompleted(false);
        }, 500); // Duration for displaying the checkmark
      } else {
        setHasError(true);

        setTimeout(() => {
          setHasError(false);
        }, 500); // Duration for displaying the X icon
      }
    }, 200); // Delay before executing downloadWallpaper()
  };

  const buttonContent = () => {
    if (isLoading) {
      return (
        <ThemeProvider theme={theme}>
          <CircularProgress color="primary" size={24} />
        </ThemeProvider>
      );
    } else if (isCompleted) {
      return <CheckIcon />;
    } else if (hasError) {
      return <ClearIcon />;
    } else {
      return "Download";
    }
  };

  const updatePresetExport = (newPresetExport) => {
    setPresetExport(newPresetExport);
    localStorage.setItem("presetExport", JSON.stringify(newPresetExport));
  };

  const updateUserDimensions = (newUserDimensions) => {
    setUserDimensions((prevState) => {
      const updatedDimensions =
        typeof newUserDimensions === "function"
          ? newUserDimensions(prevState)
          : newUserDimensions;

      localStorage.setItem("userDimensions", JSON.stringify(updatedDimensions));
      return updatedDimensions;
    });
  };

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
              textTransform: "none",
              padding: "4px",
              borderRadius: "8px",
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
              padding: "4px",
              borderRadius: "8px",
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
              padding: "4px",
              borderRadius: "8px",
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
              padding: "4px",
              borderRadius: "8px",
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
            defaultValue={
              presetExport === null
                ? userDimensions.width / downloadScaleFactor
                : null
            }
            sx={{ width: "100px", mx: 0.5 }}
            InputProps={{ inputProps: { min: 24, max: 5000, step: 1 } }}
            onChange={(e) => handleDimensionChange(e, "width")}
          />
          <TextField
            label="Height"
            type="number"
            defaultValue={
              presetExport === null
                ? userDimensions.height / downloadScaleFactor
                : null
            }
            sx={{ width: "100px", mx: 0.5 }}
            InputProps={{ inputProps: { min: 24, max: 5000, step: 1 } }}
            onChange={(e) => handleDimensionChange(e, "height")}
          />
        </Box>
      </Box>
      <Button
        variant="contained"
        sx={{
          mt: 2,
          mb: 1,
          textTransform: "none",
          backgroundColor: "black",
          "&:hover, &:active": {
            backgroundColor: "black",
            color: "white",
          },
        }}
        onClick={download}
        disabled={isLoading}
      >
        {buttonContent()}
      </Button>
    </Box>
  );
};
