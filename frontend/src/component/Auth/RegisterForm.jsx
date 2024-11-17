

import React from 'react';
import { Container, CssBaseline, Grid, TextField, Typography, Box, Button, Avatar, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup'; // Import Yup
import { useNavigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { registerUser } from '../State/Authentication/Action';
import { useDispatch } from 'react-redux';

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  role: "ROLE_CUSTOMER"
};

// Define validation schema using Yup
const validationSchema = Yup.object({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  role: Yup.string().required('Role is required')
});

export const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(registerUser({ userData: values, navigate }));
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
          validationSchema={validationSchema} // Apply validation schema
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
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                      style: { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white', height: '50px' },
                    }}
                  />
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
                          height: '40px',
                        }
                      }}
                    >
                      <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
                      <MenuItem value={"ROLE_RESTAURANT_OWNER"}>Restaurant Owner</MenuItem>
                      <MenuItem value={"ROLE_DELIVERY_DRIVER"}>Delivery Driver</MenuItem>
                      <MenuItem value={"ROLE_NUTRITION"}>Nutritionist</MenuItem>
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
