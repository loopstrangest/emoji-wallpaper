import appleData from "@emoji-mart/data/sets/14/apple.json";
import facebookData from "@emoji-mart/data/sets/14/facebook.json";
import googleData from "@emoji-mart/data/sets/14/google.json";
import nativeData from "@emoji-mart/data/sets/14/native.json";
import twitterData from "@emoji-mart/data/sets/14/twitter.json";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AppleIcon from "@mui/icons-material/Apple";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useState, useEffect, useRef } from "react";
import emojiRegex from "emoji-regex";
import Picker from "@emoji-mart/react";
import { Box, TextField } from "@mui/material";
import { getEmojiDataFromNative } from "emoji-mart";
import { skinToneProps } from "emoji-mart";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";

export const EmojiTab = ({
  emoji,
  setEmoji,
  setType,
  setSetType,
  emojiDisplay,
  setEmojiDisplay,
  skinTone,
  setSkinTone,
  initializeApp,
  setInitializeApp,
}) => {
  const [emojiData, setEmojiData] = useState(appleData);
  const [openModal, setOpenModal] = useState(false);
  const inputRef = useRef();

  const dataList = [
    ["apple", appleData],
    ["facebook", facebookData],
    ["google", googleData],
    ["native", nativeData],
    ["twitter", twitterData],
  ];

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
    mx: "4px",
    fontSize: "48px",
    borderRadius: "100px",
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  const handleSetTypeChange = (newSetType) => {
    setSetType(newSetType);
    setEmojiData(dataList.find(([key]) => key === newSetType)[1]);
  };

  function validateEmoji(text) {
    // Regular expression for matching emojis and Emoji ZWJ Sequences
    console.log('validateEmoji text:', text);
    let emojiArray = [];
    let emojiCount = 0;
    const regex = emojiRegex();
    for (const match of text.matchAll(regex)) {
      const emoji = match[0];
      console.log('found emoji:', emoji);
      emojiArray.push(emoji);
      emojiCount += 1;
      if (emojiCount === 12) {
        break;
      }
    }
    if (emojiArray.length > 0) {
      console.log("emojiArray is", emojiArray);
      return emojiArray;
    } else {
      return undefined;
    }
  }

  function emojiString(emojiCodes) {
    return new Promise(async (resolve) => {
      if (emojiCodes) {
        const promises = emojiCodes.map(async (emojiCode) => {
          if (emojiCode) {
            const foundEmojiData = await getEmojiDataFromNative(
              emojiCode,
              setType,
              emojiData
            );
            if (foundEmojiData) {
              let emojiChar = foundEmojiData.native;
              if (
                emojiChar &&
                emojiChar.codePointAt(emojiChar.length - 1) !== 0xfe0f
              ) {
                emojiChar += "\uFE0F";
              }
              console.log('emojichar is', emojiChar);
              return emojiChar;
            }
          }
          return "";
        });

        const emojiStrings = await Promise.all(promises);
        resolve(emojiStrings.join(""));
      } else {
        resolve("");
      }
    });
  }

  const appendEmoji = (emoji) => {
    const updatedValue = emojiDisplay + emoji.native;
    handleCustomEmoji({ target: { value: updatedValue } });
  };

  const handleCustomEmoji = (event) => {
    const { value, selectionStart } = event.target;
    console.log("event", event);
    const prevCursorPosition = selectionStart;
    if (value === "") {
      console.log("value is", value);
      console.log("value is empty?");
      setEmoji([
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
        undefined,
        undefined,
      ]);
    } else {
      const validatedEmojis = validateEmoji(value);
      console.log("validatedEmojis", validatedEmojis);
      // Create a new array with the validatedEmojis values and fill the rest of the array with undefined
      const updatedEmojis = [
        ...validatedEmojis,
        ...Array(12 - validatedEmojis.length).fill(undefined),
      ];
      console.log("updatedEmojis:", updatedEmojis);

      setEmoji(updatedEmojis);
    }
    setTimeout(() => {
      inputRef.current.selectionStart = prevCursorPosition;
      inputRef.current.selectionEnd = prevCursorPosition;
    }, 0);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  console.log("here");

  useEffect(() => {
    const fetchInitialEmojiString = async () => {
      const emojiStr = await emojiString(emoji);
      console.log("Initial Emoji String:", emojiStr);
      setEmojiDisplay(emojiStr);
    };

    fetchInitialEmojiString();
  }, []);

  useEffect(() => {
    {
      initializeApp && setOpenModal(true);
    }
    setInitializeApp(false);
  }, []);

  useEffect(() => {
    (async () => {
      const emojiStr = await emojiString(emoji);
      console.log("Emoji String:", emojiStr);

      setEmojiDisplay(emojiStr);
    })();
  }, [emoji]);

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
        <AppleIcon
          sx={{
            ...emojiTypeStyles,
            outline: setType === "apple" ? "2px solid black" : "none",
            backgroundColor: setType === "apple" ? "white" : "none",
            "&:hover": {
              outline: "2px solid black",
            },
          }}
          onClick={() => handleSetTypeChange("apple")}
        />
        <FacebookIcon
          sx={{
            ...emojiTypeStyles,
            outline: setType === "facebook" ? "2px solid black" : "none",
            backgroundColor: setType === "facebook" ? "white" : "none",
            "&:hover": {
              outline: "2px solid black",
            },
          }}
          onClick={() => handleSetTypeChange("facebook")}
        />
        <GoogleIcon
          sx={{
            ...emojiTypeStyles,
            outline: setType === "google" ? "2px solid black" : "none",
            backgroundColor: setType === "google" ? "white" : "none",
            "&:hover": {
              outline: "2px solid black",
            },
          }}
          onClick={() => handleSetTypeChange("google")}
        />
        <TwitterIcon
          sx={{
            ...emojiTypeStyles,
            outline: setType === "twitter" ? "2px solid black" : "none",
            backgroundColor: setType === "twitter" ? "white" : "none",
            "&:hover": {
              outline: "2px solid black",
            },
          }}
          onClick={() => handleSetTypeChange("twitter")}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          label="Emojis (Max. 12)"
          value={emojiDisplay}
          onChange={handleCustomEmoji}
          inputRef={inputRef}
          InputLabelProps={{
            style: { color: "black" },
          }}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={handleOpenModal}
                sx={{ position: "absolute", right: 8, top: 9, p: 0 }}
              >
                <AddIcon
                  sx={{
                    fontSize: "36px",
                    borderRadius: "100px",
                    color: "black",
                    "&:hover": {
                      outline: "2px solid black",
                    },
                  }}
                />
              </IconButton>
            ),
            sx: { width: "300px",  display: "flex", alignItems: "center" },
          }}
        />
      </Box>
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="md"
        fullScreen
        PaperProps={{
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          },
        }}
      >
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
            onClick={handleCloseModal}
          ></Box>
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              opacity: 1,
            }}
          >
            <Picker
              key={setType}
              data={emojiData}
              set={setType}
              theme="auto"
              title="Select Emojis"
              onEmojiSelect={(emoji) => {
                if(emoji.skin){
                  setSkinTone(emoji.skin);
                }
                appendEmoji(emoji);
                setEmojiDisplay((display) => display + emoji.native);
              }}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
