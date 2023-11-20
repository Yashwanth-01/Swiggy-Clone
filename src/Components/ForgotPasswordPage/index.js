import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../../store/userDataSlice';

function ForgotPassword() {

  const defaultTheme = createTheme();

  const navigate = useNavigate();
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const minPasswordLength = 8;

  const dispatch = useDispatch();
  const users = useSelector((state) => state.userData);

  const [email, setEmail] = React.useState("");
  const [emailDirty, setEmailDirty] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [newPasswordDirty, setNewPasswordDirty] = React.useState(false);
  const [confirmPasswordDirty, setConfirmPasswordDirty] = React.useState(false);
  const [emailValid, setEmailValid] = React.useState(true);

  const [newPasswordHasDigit, setNewPasswordHasDigit] = React.useState(false);
  const [newPasswordHasLowerCase, setNewPasswordHasLowerCase] = React.useState(false);
  const [newPasswordHasUpperCase, setNewPasswordHasUpperCase] = React.useState(false);
  const [confirmPasswordHasDigit, setConfirmPasswordHasDigit] = React.useState(false);
  const [confirmPasswordHasLowerCase, setConfirmPasswordHasLowerCase] = React.useState(false);
  const [confirmPasswordHasUpperCase, setConfirmPasswordHasUpperCase] = React.useState(false);

  const [passwordMatch, setPasswordMatch] = React.useState(false);


  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the submission of the forgot password form, e.g., send a reset email.
    setEmailDirty(true);
    setNewPasswordDirty(true);
    setConfirmPasswordDirty(true);
    if(emailValid && newPassword.length >= minPasswordLength && newPasswordHasDigit && newPasswordHasLowerCase && newPasswordHasUpperCase
      && confirmPassword.length >= minPasswordLength && confirmPasswordHasDigit && confirmPasswordHasLowerCase && confirmPasswordHasUpperCase 
      && passwordMatch) {
        let unique = true;
        users.map((user) => {
          if(user.email === email){
            unique = false;
          }
        })
        if(!unique){
          dispatch(updatePassword({email: email, password: confirmPassword}));
          alert("Password updated! Please proceed to login.");
          navigate('/');
        } else {
          alert("The email address is not in use. Please use a different email address or proceed to login.");
        }
      }
    
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailDirty(true);
    validateEmail();
  }
  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
    setNewPasswordDirty(true);
    validateNewPassword(e.target.value);

  }
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordDirty(true);
    validateConfirmPassword(e.target.value);
    validatePasswordMatch(newPassword, e.target.value);

  }

  const validateEmail = () => {
    setEmailValid(emailRegex.test(email));
  }

  const validateNewPassword = (value) => {
    setNewPasswordHasDigit(false);
    setNewPasswordHasLowerCase(false);
    setNewPasswordHasUpperCase(false);
    for (let i = 0; i < value.length; i++) {
      if (value[i] >= '0' && value[i] <= '9') {
        setNewPasswordHasDigit(true);
      } else if (value[i] >= 'a' && value[i] <= 'z') {
        setNewPasswordHasLowerCase(true);
      } else if (value[i] >= 'A' && value[i] <= 'Z') {
        setNewPasswordHasUpperCase(true);
      }
    }
  }

  const validateConfirmPassword = (value) => {
    setConfirmPasswordHasDigit(false);
    setConfirmPasswordHasLowerCase(false);
    setConfirmPasswordHasUpperCase(false);
    for (let i = 0; i < value.length; i++) {
      if (value[i] >= '0' && value[i] <= '9') {
        setConfirmPasswordHasDigit(true);
      } else if (value[i] >= 'a' && value[i] <= 'z') {
        setConfirmPasswordHasLowerCase(true);
      } else if (value[i] >= 'A' && value[i] <= 'Z') {
        setConfirmPasswordHasUpperCase(true);
      }
    }
  }

  const validatePasswordMatch = (newPassword, value) => {
    if (newPassword === value) {
      setPasswordMatch(newPassword === value);
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
            {/* Icon or logo */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password ?
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
              id="newPassword"
              autoComplete="current-password"
              value={newPassword}
              onChange={(e) => { handleNewPassword(e) }}
            />
            {
              !newPassword.length && newPasswordDirty ? (
                <span style={{ fontSize: '0.9em', color: 'red' }}>*Enter new password</span >
              ) : newPasswordDirty && newPassword.length < minPasswordLength ? (
                <span style={{ fontSize: '0.9em', color: 'red' }}>*Password must contain a minimum of {minPasswordLength} characters</span >
              ) : newPasswordDirty && !newPasswordHasLowerCase ? (
                <span style={{ fontSize: '0.9em', color: 'red' }}>*Password must contain atleast one lower case character</span >
              ) : newPasswordDirty && !newPasswordHasUpperCase ? (
                <span style={{ fontSize: '0.9em', color: 'red' }}>*Password must contain atleast one upper case character</span >
              ) : newPasswordDirty && !newPasswordHasDigit ? (
                <span style={{ fontSize: '0.9em', color: 'red' }}>*Password must contain atleast one digit</span >
              ) : <></>
            }
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
              value={confirmPassword}
              onChange={(e) => { handleConfirmPassword(e) }}
            />
            {
              !confirmPassword.length && confirmPasswordDirty ? (
                <span style={{ fontSize: '0.9em', color: 'red' }}>*Confirm password</span >
              ) : confirmPasswordDirty && confirmPassword.length < minPasswordLength ? (
                <span style={{ fontSize: '0.9em', color: 'red' }}>*Password must contain a minimum of {minPasswordLength} characters</span >
              ) : confirmPasswordDirty && !confirmPasswordHasLowerCase ? (
                <span style={{ fontSize: '0.9em', color: 'red' }}>*Password must contain atleast one lower case character</span >
              ) : confirmPasswordDirty && !confirmPasswordHasUpperCase ? (
                <span style={{ fontSize: '0.9em', color: 'red' }}>*Password must contain atleast one upper case character</span >
              ) : confirmPasswordDirty && !confirmPasswordHasDigit ? (
                <span style={{ fontSize: '0.9em', color: 'red' }}>*Password must contain atleast one digit</span >
              ) : (newPassword.length > 0 && confirmPassword.length > 0) && !passwordMatch ? (
                <span style={{ fontSize: '0.9em', color: 'red' }}>Password don't match</span>
              ) : <></>
            }

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e) => { handleSubmit(e) }}
            >
              Reset Password
            </Button>
            <Grid container>
              <Grid item>
                <Link variant="body2" style={{ cursor: 'pointer' }} onClick={() => { navigate('/') }}>
                  Remember your password? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default ForgotPassword;

