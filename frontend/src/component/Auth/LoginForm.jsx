import React from 'react';
import { Container, CssBaseline, Grid, TextField, Typography, Box, Button, Avatar, Paper, ButtonBase } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../State/Authentication/Action';
import { useDispatch } from 'react-redux';

const initialValues = {
  email: "",
  password: ""
};

export const LoginForm = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const handleSubmit = (values) => {
    dispatch(loginUser({userData:values,navigate}))
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ backgroundColor: 'transpredarent' }}>
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
        {/* <Paper
          elevation={6}
          sx={{
            padding: 4,
            backgroundColor: 'rgba(0, 0, 0, 0.6)', // Transparent black background
            borderRadius: '8px',
            mt: 3,
            width: '100%',
            color: 'white' // Ensure text is readable on dark background
          }}
        > */}
          <Formik onSubmit={handleSubmit} initialValues={initialValues}>
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
                InputLabelProps={{
                  style: { color: '#fff' }, // Label color white
                }}
                InputProps={{
                  style: { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' }, // Input field background and text color
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
                InputLabelProps={{
                  style: { color: '#fff' }, // Label color white
                }}
                InputProps={{
                  style: { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' }, // Input field background and text color
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
                      bgcolor: 'primary.main', // Match button background color
                    }}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
            <Typography variant='body2' align='center' sx={{mt:3}}>
              Don't have account ?
              <Button size='small' onClick={()=>navigate("/account/register")}>
                register
                </Button> 
            </Typography>
        {/* </Paper> */}
      </Box>
    </Container>
  );
};



