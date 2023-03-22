import "./App.css";
import { EmojiPicker } from "./components";
import { Box } from "@mui/material";
import { createTheme, ThemeProvider, Typography } from '@mui/material/styles';


const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // This will prevent the button text from being capitalized
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontWeight: 400,
          fontSize: "1rem",
          '&:hover': {
            backgroundColor:"unset",
            outline: "2px solid black",
          },
        },
      },
    },
  },
});

function App() {
  return (
<ThemeProvider theme={theme}>
    <Box
      className="App"
      sx={{
        height:"100%",
        width:"100%",
        overflow: "hidden",
      }}
    >
       
      <EmojiPicker />
      </Box>
      </ThemeProvider>
      
   
  );
}

export default App;
