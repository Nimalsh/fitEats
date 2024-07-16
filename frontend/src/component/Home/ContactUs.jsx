import React from 'react';
import { Container, CssBaseline, Grid, TextField, Typography, Box, Button, Avatar, Paper, ButtonBase } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import contactimg from '../../assets/images/contact-us-communication-support-service-assistance-concept.jpg';

const ContactUs = () => {
  const initialValues = {
    name: "",
    email: "",
    message: ""
  };

  const handleSubmit = (values) => {
    console.log(values); // Handle form submission
  };

  return (
    <Container component="main"sx={{ backgroundColor: 'transparent' }}>
      <CssBaseline />
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h4" sx={{ color: 'gray' }}>
          Contact Us
        </Typography>
        <Typography variant="body1" sx={{ color: 'gray', mb: 3 }}>
          We'd love to hear from you! Whether you have a question about our services, need assistance, or just want to give feedback, feel free to reach out.
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={6}>
            <img src={contactimg} alt='Contact Us' className='w-full h-80 rounded-lg shadow-md mt-10' />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Typography variant="h6" sx={{ color: 'gray', mb: 2 }}>
              Get in Touch
            </Typography>
            <Formik onSubmit={handleSubmit} initialValues={initialValues}>
              <Form>
                <Field
                  as={TextField}
                  name="name"
                  label="Your Name"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  required
                  InputLabelProps={{ style: { color: 'gray' } }}
                  InputProps={{ style: { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'gray' } }}
                />
                <Field
                  as={TextField}
                  name="email"
                  label="Your Email"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  required
                  InputLabelProps={{ style: { color: 'gray' } }}
                  InputProps={{ style: { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'gray' } }}
                />
                <Field
                  as={TextField}
                  name="message"
                  label="Your Message"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  required
                  multiline
                  InputLabelProps={{ style: { color: 'gray' } }}
                  InputProps={{ style: { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'gray' } }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ padding: '10px 0', fontSize: '16px', borderRadius: '8px', mt: 2 }}
                >
                  Send Message
                </Button>
              </Form>
            </Formik>
          </Grid>
        </Grid>
        <Box sx={{ marginTop: 8, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ color: 'gray' }}>
            Visit Us
          </Typography>
          <Typography variant="body1" sx={{ color: 'gray', mb: 1 }}>
            Drop by our office during business hours. We'd love to meet you in person!
          </Typography>
          <Typography variant="body1" sx={{ color: 'gray' }}>
            Address: 123 Main Street, Colombo, Sri Lanka
          </Typography>
          <Typography variant="body1" sx={{ color: 'gray' }}>
            Phone: +123 456 789
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default ContactUs;
