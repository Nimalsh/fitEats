import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme, { Colours } from '../../assets/theme/theme';
import Google from '../../assets/images/google.png';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth-service';
import UserService from '../../services/user-service';

const theme1 = createTheme();

export default function SignIn() {
  const navigate = useNavigate();

  const initialValues = { userName: "", password: "" };
  const [formValues, setFormValues] = React.useState(initialValues);
  const [formErrors, setFormErrors] = React.useState({});
  const [isSubmit, setIsSubmit] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    const { userName, password } = formValues;

    // Perform authentication logic here
    if (userName === 'admin' && password === 'password') {
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.userName) {
      errors.userName = "UserName is required!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    }
    return errors;
  };

  React.useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const { userName, password } = formValues;
      AuthService.login(userName, password).then(() => {
        UserService.getUserInfo().then(
          (response) => {
            localStorage.setItem("ROLE", JSON.stringify(response.data.roles));
            localStorage.setItem("USERNAME", JSON.stringify(response.data.userName));
            const ROLE = JSON.parse(localStorage.getItem('ROLE'));
            const CHECKROLE = ROLE[0].authority;
            if (CHECKROLE !== "restaurant") {
              navigate("/");
            } else {
              navigate("/dashboard");
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }, (error) => {
        setFormErrors({ NotFound: error.response.data });
      });
    }
  }, [formErrors, isSubmit, formValues, navigate]);

  return (
    <ThemeProvider theme={theme1}>
      <Container component="main" maxWidth="xs" sx={{ marginLeft: '6%', [theme.breakpoints.down('sm')]: { marginLeft: '3.6%' } }}>
        <Box sx={{ padding: "5%", marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', background: '', backgroundColor: Colours.transparenceGrey, backdropFilter: "blur(30px)", borderRadius: "33px" }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main', background: Colours.avatarWhite }} />
          <Typography component="h1" variant="h5" style={{ color: Colours.grayWhite }}>Sign In</Typography>
          <form onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              sx={{ input: { color: Colours.formWhite }, label: { color: Colours.formWhite, fontFamily: 'Poppins' }, "& label.Mui-focused": { color: Colours.formWhite } }}
              margin="normal"
              required
              fullWidth
              label="Username"
              name="userName"
              autoComplete="name"
              id="userName"
              value={formValues.userName}
              onChange={handleChange}
              error={!!formErrors.userName}
              helperText={formErrors.userName}
            />
            <TextField
              sx={{ input: { color: Colours.formWhite }, label: { color: Colours.formWhite, fontFamily: 'Poppins' }, "& label.Mui-focused": { color: Colours.formWhite }, borderColor: Colours.formWhite }}
              margin="normal"
              required
              fullWidth
              label="Password"
              name="password"
              autoComplete="password"
              type="password"
              id="password"
              value={formValues.password}
              onChange={handleChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, background: Colours.green, '&:hover': { background: Colours.yellow }, color: Colours.dark, fontSize: '20px', marginTop: '7%', fontFamily: 'Poppins' }}>Sign In</Button>
            <Link href="./ForgetPassword" variant="body2" sx={{ marginLeft: '60%', marginBottom: '10%', fontFamily: 'Poppins' }}>Forgot password?</Link>
            <Typography sx={{ color: Colours.formWhite, fontSize: { lg: '15px', xs: '10px' }, paddingLeft: '32%', marginTop: '5%', marginBottom: '5%', fontFamily: 'Poppins' }}>---Or Login with---</Typography>
            <Grid container xs>
              <Grid item xs sx={{ marginLeft: '49%' }}>
                <Link href="#" variant="body2">
                  <img src={Google} alt="Logo" className="social-icons-gg" />
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}