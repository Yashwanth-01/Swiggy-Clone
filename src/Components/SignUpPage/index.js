import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from '../../store/userDataSlice';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignUp() {

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const minPasswordLength = 8;

  const dispatch = useDispatch();
  const users = useSelector((state) => state.userData);

  const navigate = useNavigate();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstNameDirty, setFirstNameDirty] = React.useState(false);
  const [lastNameDirty, setLastNameDirty] = React.useState(false);
  const [emailDirty, setEmailDirty] = React.useState(false);
  const [passwordDirty, setPasswordDirty] = React.useState(false);
  const [emailValid, setEmailValid] = React.useState(true);
  const [hasDigit, setHasDigit] = React.useState(false);
  const [hasLowerCase, setHasLowerCase] = React.useState(false);
  const [hasUpperCase, setHasUpperCase] = React.useState(false);


  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
    setFirstNameDirty(true);
    setLastNameDirty(true);
    setEmailDirty(true);
    setPasswordDirty(true);

    const isFirstNameValid = firstName.length > 0;
    const isLastNameValid = lastName.length > 0;
    const isEmailValid = email.length > 0 && emailValid;
    const isPasswordValid = password.length >= minPasswordLength && hasDigit && hasLowerCase && hasUpperCase;


    if (isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid) {
      let unique = true;
      if (users.length > 0) {
        users.forEach((element) => {
          if (element.email === email) {
            unique = false;
          }
        });
      }

      if (unique) {
        dispatch(createUser({ name: firstName + " " + lastName, email: email, password: password }));
        alert("Thank you for signing up! Please proceed to login.");
        navigate('/');
      } else {
        alert("The email address is already in use. Please use a different email address or proceed to login.");
      }
    }

  };

  if (users) {
    console.log('User data in the store:', users);
  }


  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setFirstNameDirty(true);
  }
  const handleLastName = (e) => {
    setLastName(e.target.value);
    setLastNameDirty(true);
  }
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailDirty(true);
    validateEmail();
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordDirty(true);
    validatePassword(e.target.value);
  }

  const validateEmail = () => {
    setEmailValid(emailRegex.test(email));
  }

  const validatePassword = (value) => {
    setHasDigit(false);
    setHasLowerCase(false);
    setHasUpperCase(false);
    for (let i = 0; i < value.length; i++) {
      if (value[i] >= '0' && value[i] <= '9') {
        setHasDigit(true);
      } else if (value[i] >= 'a' && value[i] <= 'z') {
        setHasLowerCase(true);
      } else if (value[i] >= 'A' && value[i] <= 'Z') {
        setHasUpperCase(true);
      }
    }
  }
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onChange={(e) => { handleFirstName(e) }}
                />
                {
                  !firstName.length && firstNameDirty ? <span style={{ fontSize: '0.9em', color: 'red' }}>*FirstName is Required</span> : <></>
                }
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => { handleLastName(e) }}
                />
                {
                  !lastName.length && lastNameDirty ? <span style={{ fontSize: '0.9em', color: 'red' }}>*LastName is Required</span> : <></>
                }
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => { handleEmail(e) }}
                />
                {
                  !email.length && emailDirty ? (
                    <span style={{ fontSize: '0.9em', color: 'red' }}>*Email is Required</span>
                  ) : !emailValid && emailDirty ? (
                    <span style={{ fontSize: '0.9em', color: 'red' }}>*Invalid Email</span>
                  ) : <></>
                }
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => { handlePassword(e) }}
                />
                {
                  !password.length && passwordDirty ? (
                    <span style={{ fontSize: '0.9em', color: 'red' }}>*Password is Required</span >
                  ) : passwordDirty && password.length < minPasswordLength ? (
                    <span style={{ fontSize: '0.9em', color: 'red' }}>*Password must contain a minimum of {minPasswordLength} characters</span >
                  ) : passwordDirty && !hasLowerCase ? (
                    <span style={{ fontSize: '0.9em', color: 'red' }}>*Password must contain atleast one lower case character</span >
                  ) : passwordDirty && !hasUpperCase ? (
                    <span style={{ fontSize: '0.9em', color: 'red' }}>*Password must contain atleast one upper case character</span >
                  ) : passwordDirty && !hasDigit ? (
                    <span style={{ fontSize: '0.9em', color: 'red' }}>*Password must contain atleast one digit</span >
                  ) : <></>
                }
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e) => { handleSubmit(e) }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link variant="body2" style={{ cursor: 'pointer' }} onClick={() => { navigate('/') }}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}