import React from 'react';
import { Container, CssBaseline, Grid, TextField, Typography, Box, Button, Avatar } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd'; // Replace with a more fitting icon

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  address: "",
  mobileNumber: "",
  passwordConfirmation: ""
};

export const RegisterForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log(values);
    // Handle registration logic here (e.g., API calls, state updates)
  };

  const validate = (values) => {
    const errors = {};

    if (!values.firstName) {
      errors.firstName = 'Required';
    }
    if (!values.lastName) {
      errors.lastName = 'Required';
    }
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Required';
    }
    if (!values.passwordConfirmation) {
      errors.passwordConfirmation = 'Required';
    } else if (values.passwordConfirmation !== values.password) {
      errors.passwordConfirmation = 'Passwords do not match';
    }
    if (!values.address) {
      errors.address = 'Required';
    }
    if (!values.mobileNumber) {
      errors.mobileNumber = 'Required';
    } else if (!/^\d+$/.test(values.mobileNumber)) {
      errors.mobileNumber = 'Invalid mobile number';
    }

    return errors;
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
          validate={validate}
        >
          {({ values, errors, touched }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="firstName"
                    label="First Name"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    autoComplete="given-name"
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                    InputLabelProps={{
                      style: { color: '#fff' },
                    }}
                    InputProps={{
                      style: { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    autoComplete="family-name"
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                    InputLabelProps={{
                      style: { color: '#fff' },
                    }}
                    InputProps={{
                      style: { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
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
                      style: { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
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
                      style: { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
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
                      style: { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
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
                      style: { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="address"
                    label="Address"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    autoComplete="address-line1"
                    required
                    error={touched.address && Boolean(errors.address)}
                    helperText={touched.address && errors.address}
                    InputLabelProps={{
                      style: { color: '#fff' },
                    }}
                    InputProps={{
                      style: { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' },
                    }}
                  />
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

