import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme, { Colours } from '../../assets/theme/theme';
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import BackgroundImage from '../../assets/images/Background_image.png';
import PlateImage from '../../assets/images/plate.png';   
import CircleImage from '../../assets/images/circle.png';    

const theme1 = createTheme();

const RestaurantSignUpTwo = () => {
  const navigate = useNavigate();

  const initialValues = { businessRegistrationNumber: '', businessRegistrationYear: '' };
  const [formValues, setFormValues] = React.useState(initialValues);
  const [formErrors, setFormErrors] = React.useState({});
  const [isSubmit, setIsSubmit] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;
    const regexsimple = /^(?=.*[a-z]).{1,}$/gm;
    const regexcapital = /^(?=.*[A-Z]).{1,}$/gm;
    const regexnumber = /^(?=.*[0-9]).{1,}$/gm;
    const regexsymbol = /^(?=.*[!@#$%^&]).{1,}$/gm;

    if (!values.businessRegistrationNumber) {
      errors.businessRegistrationNumber = 'Business Registration Number is required!';
    }  

    if (!values.businessRegistrationYear) {
      errors.businessRegistrationYear = 'Business Registration Year is required!';
    }  

 
    return errors;
  };

  React.useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const registeredCustomer = {
        businessRegistrationNumber: formValues.businessRegistrationNumber,
        businessRegistrationYear: formValues.businessRegistrationYear, 
        accountState: 'restaurant',
      };

      axios
        .post('http://localhost:8072/Restaurant/Register/Signuprestaurant', registeredCustomer)
        .then((data) => {
          navigate('/login');
        })
        .catch((error) => {
          if (error.response.data) {
            const errors = {};
            error.response.data.fieldErrors.forEach((fieldError) => {
              if (fieldError.field === 'restaurantName') {
                errors.restaurantName = fieldError.message;
              } else if (fieldError.field === 'email') {
                errors.email = fieldError.message;
              }
              setFormErrors(errors);
            });
          }
        });
    }
  }, [formErrors, isSubmit, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
          sx={{
            position: 'absolute', // Ensures the background covers the entire window
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${BackgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1, // Sends the background behind other content
          }} 
      >
        <Box sx={{ mt: { lg: '90px', xs: '100px' }, ml: { sm: '60px' },  width: { xs: '100%', sm: '400px', md: '500px' } }} position="absolute" p="20px">
          <Skeleton sx={{ backgroundColor: Colours.transparenceGrey }} variant="circular" width={140} height={140} />
        </Box>
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            marginTop: '10%',
            marginLeft: '10%',
            [theme.breakpoints.down('sm')]: {
              marginLeft: '5%',
            },
          }}
        >
          <Box
            sx={{
              padding: '5%',
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: Colours.transparenceGrey,
              backdropFilter: 'blur(30px)',
              borderRadius: '33px',
            }}
          >
            <Typography component="h1" variant="h3" style={{ color: Colours.grayWhite }}>
              Restaurant
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                sx={{
                  input: { color: '#fff' },
                  marginTop: 2,
                  'label': { color: '#fff' },
                  '& label.Mui-focused': {
                    color: '#fff',
                  },
                }}
                required
                fullWidth
                id="restaurantName"
                label="Business Registration Number"
                name="restaurantName"
                value={formValues.restaurantName}
                onChange={handleChange}
                error={!!formErrors.restaurantName}
                helperText={formErrors.restaurantName}
                autoComplete="restaurantName"
              />
              <TextField
                sx={{
                  input: { color: '#fff' },
                  marginTop: 2,
                  'label': { color: '#fff' },
                  '& label.Mui-focused': {
                    color: '#fff',
                  },
                }}
                required
                fullWidth
                id="address"
                label="Business Registration Year"
                name="address"
                value={formValues.address}
                onChange={handleChange}
                error={!!formErrors.address}
                helperText={formErrors.address}
                autoComplete="address"
              />

  <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
        mt: 2,
        mb: 2,
        mr: 6,
        ml: 6
      }}
    >
      <Button
        fullWidth
        variant="contained"
        sx={{
          backgroundColor: '#f2f2f2',
          borderRadius: '20px',
          height: '60px',
          '&:hover': {
            backgroundColor: '#e0e0e0',
          },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '70%',
            backgroundColor: '#95CD41', // Adjusted to a similar green color
            borderRadius: '20px',
            height: '70%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Upload Certificate
        </Box>
      </Button>
    </Box>
 
                                   


              <Grid container spacing={2} sx={{ mt: 3, mb: 2 }}>
                <Grid item xs={6}>
                <Link href="/restaurant-signup3">
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      background: Colours.green,
                      '&:hover': {
                        backgroundColor: Colours.lightGreen,
                      },
                      color: Colours.dark,
                      fontSize: '20px',
                      borderRadius: '20px', // Make the edges circular
                    }}
                  >
                    Next
                  </Button>
                  </Link>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      background: '#800000',
                      '&:hover': {
                        backgroundColor: '#800000',
                      },
                      color: '#FFFFFF',
                      fontSize: '20px',
                      borderRadius: '20px', // Make the edges circular
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            right: '50px',
            bottom: '0', 
            transform: 'translateY(-50%)',
            width: '50%',
            height: '100%', 
            backgroundImage: `url(${PlateImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'right',
            borderRadius: '33px',
          }}
        />
       
        <Box
          sx={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
           <Typography sx={{ color: 'white', marginRight: '8px' }}>
            Already have an account?
          </Typography>
          <Link href="../restaurant/login">
            <Button
              variant="contained"
              sx={{
                background: '#008000',
                '&:hover': {
                  backgroundColor: Colours.lightGreen,
                },
                color:  '#FFFFFF',
                fontSize: '20px',
                borderRadius: '20px',
              }}
            >
              Login
            </Button>
          </Link>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default RestaurantSignUpTwo;

