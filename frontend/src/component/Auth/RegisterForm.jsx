import React from 'react';
import { Container, CssBaseline, Grid, TextField, Typography, Box, Button, Avatar, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd'; // Replace with a more fitting icon
import { registerUser } from '../State/Authentication/Action';
import { useDispatch } from 'react-redux';

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  // address: "",
  // mobileNumber: "",
  // passwordConfirmation: "",
  role:"ROLE_CUSTOMER"
};

export const RegisterForm = () => {
  const navigate = useNavigate();
  
  const dispatch=useDispatch()

  const handleSubmit = (values) => {
   dispatch(registerUser({userData:values,navigate}))
    // Handle registration logic here (e.g., API calls, state updates)
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ backgroundColor: 'transparent' }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ color: 'white' }}>
          Register
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="fullName"
                    label="Full Name"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    autoComplete="given-name"
                    error={touched.fullName && Boolean(errors.fullName)}
                    helperText={touched.fullName && errors.fullName}
                    InputLabelProps={{
                      style: { color: '#fff' },
                    }}
                    InputProps={{
                      style: { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white', height: '50px' },
                    }}
                  />
                </Grid>
                <Grid item xs={12} >
                  <Field
                    as={TextField}
                    name="email"
                    label="Email"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    required
                    autoComplete="email"
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    InputLabelProps={{
                      style: { color: '#fff' },
                    }}
                    InputProps={{
                      style: { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white', height: '50px' },
                    }}
                  />
                </Grid>
                <Grid item xs={12} >
                  {<Field
                    as={TextField}
                    name="password"
                    label="Password"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    type="password"
                    required
                    autoComplete="new-password"
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    InputLabelProps={{
                      style: { color: '#fff' },
                    }}
                    InputProps={{
                      style: { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white', height: '50px' },
                    }}
                  />/* <Field
                    as={TextField}
                    name="mobileNumber"
                    label="Mobile Number"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    autoComplete="tel"
                    required
                    error={touched.mobileNumber && Boolean(errors.mobileNumber)}
                    helperText={touched.mobileNumber && errors.mobileNumber}
                    InputLabelProps={{
                      style: { color: '#fff' },
                    }}
                    InputProps={{
                      style: { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white', height: '50px' },
                    }}
                  /> */}
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* <Field
                    as={TextField}
                    name="password"
                    label="Password"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    type="password"
                    required
                    autoComplete="new-password"
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    InputLabelProps={{
                      style: { color: '#fff' },
                    }}
                    InputProps={{
                      style: { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white', height: '50px' },
                    }}
                  /> */}
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* <Field
                    as={TextField}
                    name="passwordConfirmation"
                    label="Confirm Password"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    type="password"
                    required
                    error={touched.passwordConfirmation && Boolean(errors.passwordConfirmation)}
                    helperText={touched.passwordConfirmation && errors.passwordConfirmation}
                    InputLabelProps={{
                      style: { color: '#fff' },
                    }}
                    InputProps={{
                      style: { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white', height: '50px' },
                    }}
                  /> */}
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: '#fff' }} id="role-label">Role</InputLabel>
                    <Field
                      as={Select}
                      name="role"
                      labelId="role-label"
                      id="role"
                      label="Role"
                      error={touched.role && Boolean(errors.role)}
                      helperText={touched.role && errors.role}
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: 'white',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#fff',
                        },
                        '& .MuiSvgIcon-root': {
                          color: '#fff',
                        },
                        '& .MuiInputBase-input': {
                          height: '40px', // Reduced height for the role field
                        }
                      }}
                    >
                      <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
                      <MenuItem value={"ROLE_RESTAURANT_OWNER"}>Rstaurnat Owner</MenuItem>
                      <MenuItem value={"ROLE_DELIVERY_DRIVER"}>Delivery driver</MenuItem>
                      <MenuItem value={"ROLE_NUTRITION"}>Nutrition</MenuItem>
                      <MenuItem value={"ROLE_ADMIN"}>Admin</MenuItem>
                    </Field>
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  marginTop: 3,
                  padding: '10px 0',
                  fontSize: '16px',
                  borderRadius: '8px',
                  bgcolor: 'primary.main',
                }}
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
        <Typography variant='body2' align='center' sx={{ mt: 3, color: 'white' }}>
          Already have an account?
          <Button size='small' onClick={() => navigate("/account/login")} sx={{ color: 'primary.main', fontWeight: 'bold', marginLeft: '4px' }}>
            Login
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};
