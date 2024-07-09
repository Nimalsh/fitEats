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

  const initialValues = {  email: "" };
  const [formValues, setFormValues] = React.useState(initialValues);
  const [isSubmit, setIsSubmit] = React.useState(false);
  const handleChange = (e) => {

    // destructuring inputfield
    const { name, value } = e.target;
    // get the relavant name as key and assign value to it
    setFormValues({ ...formValues, [name]: value });

  }

  React.useEffect((event) => {

    const errors = {};
    if (isSubmit) {

      // creating restaurant object
      const forgotPassword = {
      
        email: formValues.email,
      
      }

      // here we put the url and the restaurant object that in @requestbody in backend
      axios.post("http://localhost:8072/Foodify/forgot_password", forgotPassword)
    
        .then(data => {
          // this part if sucess

        })
        .catch(error =>{
          if(error.response.data){
            console.log("There is an error")
          }
        })

    }
  })



  const handleSubmit = (event) => {
    // event.preventDefault();
    const data = new FormData(event.currentTarget);
    const forgotPassword = {

      email: data.get('email'),

    }

    setIsSubmit(true);

    if (isSubmit) {
      console.log({
        email: data.get('email'),

      });
    }
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
                  value={formValues.email}
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