import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme, { Colours } from '../../assets/theme/theme';
import Google from '../../assets/images/google.png';
import Skeleton from '@mui/material/Skeleton';

import axois from "axios";
import { useNavigate } from 'react-router-dom';


const theme1 = createTheme();

const RegisterBannerPremiumUser = () => {

  const navigate = useNavigate();

  // -------------initial states for fields---------------------------
  const initialValues = { userName: "", email: "", password: "" };

  // ----------create state name form values--------
  const [formValues, setFormValues] = React.useState(initialValues);

  // ----------create state name form errors--------
  const [formErrors, setFormErrors] = React.useState({});

  // -------------usestate for submit form-----------
  const [isSubmit, setIsSubmit] = React.useState(false);

  // -------function to handle changes in the input fields and set it to formvalues----------
  const handleChange = (e) => {

    // destructuring inputfield
    const { name, value } = e.target;
    // get the relavant name as key and assign value to it
    setFormValues({ ...formValues, [name]: value });

  }

  // --------------function for form validation------------------------
  const validate = (values) => {

    // const data = new FormData(event.currentTarget);

    const errors = {};
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;
    const regex2 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[0-9])(?=.[!@#$%^&]).{8,}$/gm;
    const regexsimple = /^(?=.*[a-z]).{1,}$/gm;
    const regexcapital = /^(?=.*[A-Z]).{1,}$/gm;
    const regexnumber = /^(?=.*[0-9]).{1,}$/gm;
    const regexsymbol = /^(?=.*[!@#$%^&]).{1,}$/gm;
    const regexsymbol2 = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9].$/gm;

    if (!values.userName) {

      errors.userName = "UserName is required!";
    } else if (!regexsymbol2.test(values.userName)) {
      errors.userName = "Not a valid username";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (!regexsimple.test(values.password)) {
      errors.password = "The string must contain at least 1 lowercase alphabetical character";
    } else if (!regexcapital.test(values.password)) {
      errors.password = "The string must contain at least 1 uppercase alphabetical character";
    } else if (!regexnumber.test(values.password)) {
      errors.password = "The string must contain at least 1 numeric character";
    } else if (!regexsymbol.test(values.password)) {
      errors.password = "The string must contain at least one special character";
    } else if (values.password.length < 8) {
      errors.password = "Password must be more than 8 charactors";
    }

    return errors;
  }
  // ------------------------end of validations------------------------

  // --------------use effects fo form errors--------------
  // 1 check keys of form error object
  // ------------send data if corrects---------
  React.useEffect((event) => {

    const errors = {};
    if (Object.keys(formErrors).length === 0 && isSubmit) {

      // creating user object
      const registeredCustomer = {
        userName: formValues.userName,
        email: formValues.email,
        password: formValues.password,
        accountState: "premiumUser",
      }

      // here we put the url and the user object that in @requestbody in backend
      axois.post("http://localhost:8072/Register/Signuppremiumuser", registeredCustomer)
        .then(data => {
          navigate("/Login")
        })
        .catch(error => {

          if (error.response.data) {

            error.response.data.fieldErrors.forEach(fieldError => {
            //  console.log(error.response.data)

              if (fieldError.field == 'userName') {
              //  console.log(fieldError.field)
                errors.userName = fieldError.message;
                setFormErrors(errors);
                //console.log(formErrors);
              } else if (fieldError.field == 'email') {
                //console.log(fieldError.field)
                errors.email = fieldError.message;
                setFormErrors(errors);
                //console.log(formErrors);
              }


            });
          }

        });

    }
  }, [formErrors])

  // -----------------------fnction for sending data--------------------
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // creating user object
    const registeredCustomer = {
      userName: data.get('userName'),
      email: data.get('email'),
      password: data.get('password'),
      accountState: data.get('accountState'),
    }

    setFormErrors(validate(formValues));
    setIsSubmit(true);

    if ((formErrors).length === 0 && isSubmit) {
      console.log({
        email: data.get('email'),
        password: data.get('password'),
      });
    }
    // here we put the url and the user object that in @requestbody in backend
    // axois.post("http://localhost:8072/register/Signupuser", registeredCustomer);

    // Navigate("/login");
  };
  // ---------------------------------------------------------

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ mt: { lg: '90px', xs: '10px' }, ml: { sm: '40px' } }}
        position="absolute" p="20px" >
        <Skeleton
          sx={{ backgroundColor: Colours.transparenceGrey }}
          variant="circular" width={140} height={140} />
      </Box>
      <Container component="main" maxWidth="xs"
        sx={{
          marginLeft: '6%',
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
            background: '',
            backgroundColor: Colours.transparenceGrey,
            backdropFilter: "blur(30px)",
            borderRadius: "33px"

          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main',background:Colours.avatarWhite }}>
            </Avatar> */}
          <Typography component="h1" variant="h5" style={{ color: Colours.grayWhite }}>
            Sign Up
          </Typography>

          {/* -------------------beggining of the form------------------------ */}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

            <TextField
              sx={{
                input:
                  { color: "#fff" }, marginTop: 2,
                "label": { color: "#fff" },
                "& label.Mui-focused": {
                  color: "#fff"
                }

              }}
              autoComplete="given-name"
              name="userName"
              required
              fullWidth
              id="userName"
              label="UserName"
              value={formValues.userName}
              onChange={handleChange}
              {...(formErrors.userName && { error: true, helperText: formErrors.userName })}
              autoFocus
            />

            <TextField
              sx={{
                input:
                  { color: "#fff" }, marginTop: 2,
                "label": { color: "#fff" },
                "& label.Mui-focused": {
                  color: "#fff"
                }

              }}
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              {...(formErrors.email && { error: true, helperText: formErrors.email })}
              autoComplete="email"
            />

            <TextField
              sx={{
                input:
                  { color: "#fff" }, marginTop: 2,
                "label": { color: "#fff" },
                "& label.Mui-focused": {
                  color: "#fff"
                }

              }}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={formValues.password}
              onChange={handleChange}
              {...(formErrors.password && { error: true, helperText: formErrors.password })}
              autoComplete="new-password"
            />


            <input type="hidden" id="accountState" name="accountState" value="user" required />

            <FormControlLabel
              style={{ color: Colours.grayWhite }}
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label={<label>I accept the <Link href='Terms'>Terms & Conditions.</Link></label>}
            />

            {/*--------------submit buttons------------------ */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3, mb: 2,
                background: Colours.green,
                '&:hover': {
                  backgroundColor: Colours.yellow,
                },
                color: Colours.dark,
                fontSize: '20px',
                marginTop: '5%',
                hover: Colours.green
              }}
            >
              Sign Up
            </Button>
            <Typography  
            sx={{
              color:'white', 
              fontSize:{lg:'15px', xs:'10px'},
              textAlign:"center",
              marginTop:'5%',
              marginBottom:'5%'
              }}>
            ---Or Signup with---
            </Typography>
            
            <Grid container xs >
              <Grid item xs  marginLeft="45%">
                <Link href="#" variant="body2">
                <img src={Google} alt="Logo" className='social-icons-gg' />
                </Link>
              </Grid>
              {/* <Grid item xs marginRight="35%">
                <Link href="#" variant="body2">
                <img src={Facebook} alt="Logo" className='social-icons-gg' />
                </Link>
              </Grid> */}
            </Grid>
            <Typography
            sx={{
              color:'white', 
              fontSize:{lg:'15px', xs:'10px'},
              textAlign:"center",
              marginTop:'5%',
              marginBottom:'5%'
              }}>
                Already have an account? &nbsp;
                <Link href="../login" >
                  Sign In 
                </Link>
              </Typography>
          </Box>
          {/* <Box 
          sx={{mt:{lg:'90px', xs:'10px'},ml:{sm:'40px'}}}
                    position="absolute" p="20px" >
                    <Skeleton 
                      sx={{ backgroundColor:Colours.transparenceGrey,marginLeft:'100%', marginTop:'80%'}}
                      variant="circular" width={140} height={140}/>
       </Box> */}
        </Box>
        {/* <Grid container item xs={6} direction="column" padding="40" margin="20 auto" >
                    <Skeleton variant="circular" width={140} height={140} style={{margin:"0%"}} />
                    <Skeleton variant="circular" width={140} height={140} style={{margin:"20%"}} />
                    <img  src={BiggerImage} alt="big-image" className="bigger-image" />

    </Grid> */}
      </Container>
    </ThemeProvider>
  );
}

export default RegisterBannerPremiumUser