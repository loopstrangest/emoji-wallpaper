import { Box, Link, Typography } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import HomeIcon from "@mui/icons-material/Home";
import MailIcon from "@mui/icons-material/Mail";

export const AboutTab = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        flexWrap: "wrap",
        overflow: "auto",
        width: "auto",
        margin: "auto",
        mb: "0px",
        padding: "8px",
        borderRadius: "8px",
      }}
    >
      <Box sx={{ width: "100%", display:"flex", justifyContent:"space-between", mb:1 }}>
        <Link
          href="https://twitter.com/strangestloop"
          target="_blank"
          rel="noopener noreferrer"
          sx={{color:"black", padding:"4px", borderRadius:"100px", width:"48px", height:"48px",
           '&:hover': { outline: "2px solid black"},
          }}
        >
          <TwitterIcon sx={{fontSize: "48px"}}/>
        </Link>
        <Link
          href="mailto:loopstrangest@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{color:"black", padding:"4px", borderRadius:"100px", width:"48px", height:"48px",
           '&:hover': { outline: "2px solid black"},
          }}
        >
          <MailIcon sx={{fontSize: "48px"}}/>
        </Link>
        <Link
          href="https://strangestloop.io"
          target="_blank"
          rel="noopener noreferrer"
          sx={{color:"black", padding:"4px", borderRadius:"100px", width:"48px", height:"48px",
           '&:hover': { outline: "2px solid black"},
          }}
        >
          <HomeIcon sx={{fontSize: "48px"}}/>
        </Link>
        <Link
          href="https://buymeacoffee.com/loopy"
          target="_blank"
          rel="noopener noreferrer"
          sx={{color:"black", padding:"4px", borderRadius:"100px", width:"48px", height:"48px",
           '&:hover': { outline: "2px solid black"},
          }}
        >
          
          <img src="/images/bmc.png" width="30"/>
      
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Typography sx={{ width: "100%" }}>
          Emoji Wallpaper was created by an artist who codes.
          <br />
          Feel free to tag him in wallpapers you share on Twitter :^)
        </Typography>
      </Box>
    </Box>
  );
};
