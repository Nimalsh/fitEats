import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary:{
            main: '#FFF'
        },
        secondary:{
            main: '#FAC213'
        }

    },
    
    typography: {
        fontFamily: [
          'Poppins'
        ],
        button: {
            textTransform: 'none',
        },
        subtitle1: {
            Secondary: "#fff"
        }

        
        
    },

    // targeting components
    Components: {
        

    }

});



export default theme;