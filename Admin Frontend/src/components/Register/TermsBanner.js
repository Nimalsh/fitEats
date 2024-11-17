import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme, { Colours } from '../../assets/theme/theme';
import Skeleton from '@mui/material/Skeleton';
// import BiggerImage from '../../assets/images/register_big_image.png';



const theme1 = createTheme();

const TermsBanner = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
        <Box 
      sx={{mt:{lg:'90px', xs:'10px'},ml:{sm:'40px'}}}
                    position="absolute" p="20px" >
                    <Skeleton 
                      sx={{ backgroundColor:Colours.transparenceGrey }}
                      variant="circular" width={140} height={140}/>
       </Box>
      <Container component="main" maxWidth="xs" 
      sx={{
        marginLeft:'6%',
        [theme.breakpoints.down('sm')]: {
          marginLeft: '3.6%',
        },
        }}>
        {/* <CssBaseline /> */}
        <Box
          sx={{
            padding: "5%",
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background:'',
            backgroundColor:Colours.transparenceGrey,
            backdropFilter: "blur(30px)",
            borderRadius:"33px",
            width: 1
           
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main',background:Colours.avatarWhite }}>
            </Avatar> */}
          <Typography component="h1" variant="h5" style={{color:Colours.grayWhite}}>
            Terms & Conditions
          </Typography>
          <Typography  
            sx={{
              color:'white', 
              fontSize:{lg:'15px', xs:'10px'},
              textAlign:"left",
              marginTop:'5%',
              marginBottom:'5%'
              }}>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Curabitur gravida arcu ac tortor dignissim convallis aenean et. In nibh mauris cursus mattis molestie a iaculis at erat. Mi ipsum faucibus vitae aliquet nec ullamcorper. Fermentum iaculis eu non diam phasellus vestibulum lorem. Id nibh tortor id aliquet lectus proin nibh. Augue lacus viverra vitae congue eu consequat ac felis. Diam vulputate ut pharetra sit amet aliquam id diam maecenas. Tristique senectus et netus et malesuada fames. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Ipsum a arcu cursus vitae congue mauris rhoncus. Proin sed libero enim sed faucibus turpis. Risus ultricies tristique nulla aliquet enim. Porttitor lacus luctus accumsan tortor posuere ac ut consequat semper. Maecenas volutpat blandit aliquam etiam.

Eget nullam non nisi est sit amet facilisis magna. Consequat ac felis donec et odio pellentesque diam. Accumsan lacus vel facilisis volutpat est velit egestas dui. Gravida cum sociis natoque penatibus et magnis dis.
            </Typography>
          </Box>
            
            
            
      </Container>
    </ThemeProvider>
  );
}

export default TermsBanner