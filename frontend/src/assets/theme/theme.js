import { createTheme } from "@mui/material/styles";

export const Colours = {
    primary: "#3A3A3A",
    secondary: "#757575",
    green: "#95CD41",
    richBlack: "#0B0B0",
    grayWhite: "#EFEAEA",
    dark: "#272727",
    darkgray: "#454545",
    yellow:'#FAC213',
    darkgray2:'#A8A8A8',
    gray1:'rgba(249, 249, 249, 0.2)',
    gray2:'rgba(168, 168, 168, 0.2)',
    gray3:'rgba(249, 249, 249, 0.7)',

    white: '#FFF',
    transparenceGrey:'#6B6B6B33',
    avatarWhite:'#6B6B6B33',

    formWhite:'#EFEAEA',
    darkform:'rgba(23, 23, 23, 0.4)',
    textfield:'#D9D9D9',

    animationWhite:'#F9F9F933',
    white:'#FFFFFF',
    formWhite:'#fff',
    cardBlack:"#171717",

    

    
};

export const Fonts = {
    heading1: '30px',
    heading2: '20px',
    heading3: '15px',
    heading4: '12px',
    heading5: '10px',
};

const theme = createTheme({
    palette: {
        primary:{
            main: '#FFF'
        },
        secondary:{
            main: '#FAC213'
        },
        success:{
            main: '#95CD41'
        }

    },

    
    typography: {
        fontFamily: [
          'Poppins'
        ],
        button: {
            textTransform: 'none'
        },
    },

    // targeting components
    Components: {
        tab: {
            textColor: '#FFF',
        },
        
    }

});



export default theme;