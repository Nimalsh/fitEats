import React from 'react';
import { Container, CssBaseline, Grid, TextField, Typography, Box, Button, Avatar } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup'; // Import Yup
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../State/Authentication/Action';
import { useDispatch } from 'react-redux';

const initialValues = {
  email: "",
  password: ""
};

// Define validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(loginUser({ userData: values, navigate }));
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ color: 'white' }}>
          Sign in
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema} // Apply validation schema
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
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
              <Field
                as={TextField}
                name="password"
                label="Password"
                fullWidth
                variant="outlined"
                margin="normal"
                type="password"
                required
                autoComplete="current-password"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                InputLabelProps={{
                  style: { color: '#fff' },
                }}
                InputProps={{
                  style: { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' },
                }}
              />
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{
                      padding: '10px 0',
                      fontSize: '16px',
                      borderRadius: '8px',
                      bgcolor: 'primary.main',
                    }}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
        <Typography variant='body2' align='center' sx={{ mt: 3, color: 'white' }}>
          Don't have an account?
          <Button size='small' onClick={() => navigate("/account/register")} sx={{ color: 'primary.main', fontWeight: 'bold', marginLeft: '4px' }}>
            Register
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};


