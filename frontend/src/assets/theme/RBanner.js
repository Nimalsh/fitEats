import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import { Colours, Fonts } from "./theme";


export const BannerContainer = styled(Box)(({theme}) => ({
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    width:'100%',
    padding:'0px 0px',
    background:Colours.primary,
    // 
    // for the breakpoints
    //  
    [theme.breakpoints.down('sm')]: {
        flexDirection:"column",
        alignitems:'center',
    },
})); 

export const BannerContainer2 = styled(Box)(({theme}) => ({
    display:"flex",
    justifyContent:"left",
    flexDirection:"row",
    width:'100%',
    padding:'0px 0px',
    background:Colours.primary,
    // position:'absolute',
    // top:'150%',
    // background:Colours.primary,
    // 
    // for the breakpoints
    //  
    [theme.breakpoints.down('sm')]: {
        flexDirection:"column",
        alignitems:'center',
    },
})); 

export const BannerContent = styled(Box)(({src,theme}) => ({
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    maxWidth:'100%',
    height:'80vh',
    padding: '20px',
    backgroundImage:`url(${src})`,
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'relative',
    backgroundSize: 'cover',
    // overflow:'Hidden',
    [theme.breakpoints.down('sm')]: {
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'relative',
        backgroundSize: 'cover',
        height:'100px',
    },
}));
export const BannerImage = styled('img')(({src,theme}) => ({
    src: `url(${src})`,
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    overflow:'Hidden',
    margin:'0px',
    padding:'0',
    [theme.breakpoints.down('sm')]: {
        width: '10%',
    },
}));

export const BannerContent2 = styled(Box)(({theme}) => ({
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    maxWidth:'100%',
    padding: '20px',
    [theme.breakpoints.down('sm')]: {
        padding: '5px',
    },
}));

export const BannerTitle = styled(Typography)(({theme}) => ({
    fontSize:Fonts.heading1,
    color:Colours.green,
    lineHeight:1,
    marginBottom:'10px',
    [theme.breakpoints.down('sm')]: {
        fontSize:'15px',
    },
}));
export const BannerTitle2 = styled(Typography)(({theme}) => ({
    fontSize:Fonts.heading3,
    color:Colours.yellow,
    lineHeight:0.5,
    marginBottom:'10px',
    [theme.breakpoints.down('sm')]: {
        fontSize:'10px',
    },
}));

export const BannerLogo = styled('img')(({src,theme}) => ({
    src: `url(${src})`,
    width: '10%',
    borderRadius:'100%',
    margin:'1%',
    zIndex:1,
    [theme.breakpoints.down('sm')]: {
        width: '12%',
        marginBottom:'0',
        margin:'4%',
    },
}));

export const BannerButton1 = styled(Button)(({theme}) => ({
    fontSize:Fonts.heading2,
    lineHeight:0.5,
    margin:'10px',
    padding:'1%',
    background:Colours.yellow,
    color:Colours.richBlack,
    [theme.breakpoints.down('sm')]: {
        fontSize:'12px',
    },
}));
export const BannerButton2 = styled(Button)(({theme}) => ({
    fontSize:Fonts.heading2,
    lineHeight:0.5,
    margin:'10px',
    padding:'1%',
    background:Colours.grayWhite,
    [theme.breakpoints.down('sm')]: {
        fontSize:'12px',
    },
}));

export const BannerButtonRow = styled(Box)(({theme}) => ({
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    width:'100%',
    padding:'0px 0px',
    // 
    // for the breakpoints
    //  
    [theme.breakpoints.down('sm')]: {
        flexDirection:"column",
        alignitems:'center',
    },
})); 

export const Userprofilephoto = styled('img')(({src,theme}) => ({
    src: `url(${src})`,
    display:"flex",
    borderRadius: '50%',
    width: '100px',
    height: '100px',
    margin:'1%',
    zIndex:1,
    marginLeft:'40%',
    [theme.breakpoints.down('sm')]: {
        width: '12%',
        marginBottom:'0',
        margin:'4%',
    },
}));