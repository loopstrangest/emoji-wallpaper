import { MuiColorInput } from "mui-color-input";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import EastIcon from "@mui/icons-material/East";
import NorthIcon from "@mui/icons-material/North";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import NorthWestIcon from "@mui/icons-material/NorthWest";
import SouthIcon from "@mui/icons-material/South";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import SouthWestIcon from "@mui/icons-material/SouthWest";
import WestIcon from "@mui/icons-material/West";
import ZoomInMapIcon from "@mui/icons-material/ZoomInMap";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";

export const ColorTab = ({
  color,
  setColor,
  colorStyle,
  setColorStyle,
  gradientDirection,
  setGradientDirection,
}) => {
  const [showGradients, setShowGradients] = useState(false);

  const handleColorChange = (newColor) => {
    updateColor(newColor, 0);
  };

  const handleColor2Change = (newColor) => {
    updateColor(newColor, 1);
  };

  const updateColor = (newColor, index) => {
    const updatedColor = [...color];
    updatedColor[index] = newColor;
    setColor(updatedColor);
    localStorage.setItem("color", JSON.stringify(updatedColor));
  };

  const updateColorStyle = (newColorStyle) => {
    setColorStyle(newColorStyle);
    localStorage.setItem("colorStyle", newColorStyle);
  };

  const updateGradientDirection = (newGradientDirection) => {
    setGradientDirection(newGradientDirection);
    localStorage.setItem("gradientDirection", newGradientDirection);
  };

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
        padding: "8px",
        borderRadius: "8px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 2,
        }}
      >
        <Button
          sx={{
            mx: "8px",
            padding: "4px",
            borderRadius: "8px",
            color: "black",
            cursor: "pointer",
            outline: colorStyle === "solid" ? "2px solid black" : "none",
            backgroundColor: colorStyle === "solid" ? "white" : "none",
          }}
          onClick={() => {
            updateColorStyle("solid");
          }}
        >
          Solid
        </Button>
        <Button
          sx={{
            mx: "8px",
            padding: "4px",
            borderRadius: "8px",
            color: "black",
            cursor: "pointer",
            outline: colorStyle === "gradient" ? "2px solid black" : "none",
            backgroundColor: colorStyle === "gradient" ? "white" : "none",
          }}
          onClick={() => updateColorStyle("gradient")}
        >
          Gradient
        </Button>
      </Box>
      {colorStyle === "solid" && (
        <Box>
          <MuiColorInput
            variant="outlined"
            format="hex8"
            sx={{ width: "150px", flexGrow: 1 }}
            value={color[0]}
            onChange={handleColorChange}
          />
        </Box>
      )}
      {colorStyle === "gradient" && (
        <Box sx={{ display: "flex", position: "relative" }}>
          <MuiColorInput
            variant="outlined"
            format="hex8"
            sx={{ width: "150px", flexGrow: 1 }}
            value={color[0]}
            onChange={handleColorChange}
          />
          {showGradients && (
            <Box
              onClick={() => setShowGradients(false)}
              sx={{
                cursor: "pointer",
                position: "absolute",
                borderRadius: "8px",
                outline: "2px solid black",
                zIndex: 10,
                width: "330px",
                height: "36px",
                left: 0,
                right: 0,
                top: "10px",
                margin: "auto",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                backdropFilter: "blur(10px)",
              }}
            >
              {gradientDirection !== "S" && (
                <SouthIcon
                  onClick={() => updateGradientDirection("S")}
                  sx={{ fontSize: "36px" }}
                />
              )}
              {gradientDirection !== "N" && (
                <NorthIcon
                  onClick={() => updateGradientDirection("N")}
                  sx={{ fontSize: "36px" }}
                />
              )}
              {gradientDirection !== "E" && (
                <EastIcon
                  onClick={() => updateGradientDirection("E")}
                  sx={{ fontSize: "36px" }}
                />
              )}
              {gradientDirection !== "W" && (
                <WestIcon
                  onClick={() => updateGradientDirection("W")}
                  sx={{ fontSize: "36px" }}
                />
              )}
              {gradientDirection !== "SE" && (
                <SouthEastIcon
                  onClick={() => updateGradientDirection("SE")}
                  sx={{ fontSize: "36px" }}
                />
              )}
              {gradientDirection !== "SW" && (
                <SouthWestIcon
                  onClick={() => updateGradientDirection("SW")}
                  sx={{ fontSize: "36px" }}
                />
              )}
              {gradientDirection !== "NE" && (
                <NorthEastIcon
                  onClick={() => updateGradientDirection("NE")}
                  sx={{ fontSize: "36px" }}
                />
              )}
              {gradientDirection !== "NW" && (
                <NorthWestIcon
                  onClick={() => updateGradientDirection("NW")}
                  sx={{ fontSize: "36px" }}
                />
              )}
              {gradientDirection !== "IN" && (
                <ZoomInMapIcon
                  onClick={() => updateGradientDirection("IN")}
                  sx={{ fontSize: "36px" }}
                />
              )}
              {gradientDirection !== "OUT" && (
                <ZoomOutMapIcon
                  onClick={() => updateGradientDirection("OUT")}
                  sx={{ fontSize: "36px" }}
                />
              )}
            </Box>
          )}
          <Box
            sx={{ display: "flex", cursor: "pointer" }}
            onClick={() => setShowGradients(true)}
          >
            <Box sx={{ my: "auto", mx: "16px" }}>
              {gradientDirection === "SE" ? (
                <SouthEastIcon sx={{ fontSize: "48px" }} />
              ) : gradientDirection === "SW" ? (
                <SouthWestIcon sx={{ fontSize: "48px" }} />
              ) : gradientDirection === "NE" ? (
                <NorthEastIcon sx={{ fontSize: "48px" }} />
              ) : gradientDirection === "NW" ? (
                <NorthWestIcon sx={{ fontSize: "48px" }} />
              ) : gradientDirection === "N" ? (
                <NorthIcon sx={{ fontSize: "48px" }} />
              ) : gradientDirection === "S" ? (
                <SouthIcon sx={{ fontSize: "48px" }} />
              ) : gradientDirection === "E" ? (
                <EastIcon sx={{ fontSize: "48px" }} />
              ) : gradientDirection === "W" ? (
                <WestIcon sx={{ fontSize: "48px" }} />
              ) : gradientDirection === "IN" ? (
                <ZoomInMapIcon sx={{ fontSize: "48px" }} />
              ) : (
                <ZoomOutMapIcon sx={{ fontSize: "48px" }} />
              )}
            </Box>
          </Box>
          <MuiColorInput
            variant="outlined"
            format="hex8"
            sx={{ width: "150px", flexGrow: 1 }}
            value={color[1]}
            onChange={handleColor2Change}
          />
        </Box>
      )}
    </Box>
  );
};
