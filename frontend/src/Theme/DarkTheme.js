const { createTheme } = require("@mui/material");

export const darkTheme=createTheme({
  palette:{
    mode:"dark",
    primary:{
      main:"#777525"
    },
    secondary:{
      main:"#5A20CB"
    },
    black:{
      main:"#0D0D0D"
    },
    background:{
      main:"#0000000",
      default:"#0D0D0D",
      paper:"#0D0D0D"

    },
    textColor:{
      main:"#111111"
    }
  }
})