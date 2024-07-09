import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme, { Colours } from '../../assets/theme/theme';
import Skeleton from '@mui/material/Skeleton';
import axios from 'axios';


const theme1 = createTheme();

const ForgetPasswordBanner = () => {

  const [email, setEmail] = React.useState("");

  const [formErrors, setFormErrors] = React.useState({});

  const [isSubmit, setIsSubmit] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = email;

    setIsSubmit(true);

    if ((formErrors).length === 0 && isSubmit) {
      console.log({
        email: email
      });
    }
    
    axios.post("http://localhost:8072/Foodify/forgot_password", email)
    .then(response => {
      //console.log(response);
        //console.log(response.data);
        window.location = "http://localhost:3000" //This line of code will redirect you once the submission is succeed
    })

  }

  const handleChange = event => {
    setEmail(event.target.value)
  }

  

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
            height:"500px"
           
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main',background:Colours.avatarWhite }}>
            </Avatar>
          <Typography component="h1" variant="h5" style={{color:Colours.grayWhite}}>
          Forget Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                    sx={{ input: 
                    { color: "#fff" }, marginTop: 4, marginBottom: 2,
                    "label": {color: "#fff"},
                    "& label.Mui-focused": {
                    color:"#fff"
                    }
                
                }}    
                  autoComplete="given-name"
                  name="email"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  onChange={handleChange}
                  // {...(formErrors.email && { error: true, helperText: formErrors.email })}
                  autoFocus
                />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 ,
                background: Colours.green,
                 '&:hover': {
               backgroundColor: Colours.yellow,
                },
               color: Colours.dark,
               fontSize: '20px',
               marginTop:'5%',
               hover: Colours.green }}
               >
              Send Email
            </Button>      
          </Box>        
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default ForgetPasswordBanner