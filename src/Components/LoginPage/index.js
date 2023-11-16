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
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {

  const navigate = useNavigate();
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const minPasswordLength = 8;
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userData);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
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
    setEmailDirty(true);
    setPasswordDirty(true);

    let matchEmail = false;
    let martchPassword = false;
    let validLogin = false;
    let name = '';

    users.forEach(element => {
      if(element.email === email){
        matchEmail = true;
        if(element.password === password){
          martchPassword = true;
          validLogin = true;
          name = element.name;
        }
      } 
    });
    if(validLogin){
      if(emailValid && password.length >= minPasswordLength && hasDigit && hasLowerCase && hasUpperCase){
        navigate('/dashboard', {state: {name: name}});
      }
    } else{
      if(!matchEmail){
        alert("The email address you entered is incorrect. Please double-check and try again.");
      }else if(!martchPassword){
        alert("The password you entered is incorrect. Please double-check and try again.");
      }
    }
  };
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
    for (let i = 0; i < value.length; i++){
      if(value[i] >= '0' && value[i] <= '9'){
        setHasDigit(true);
      }else if(value[i] >= 'a' && value[i] <= 'z'){
        setHasLowerCase(true);
      }else if(value[i] >= 'A' && value[i] <= 'Z'){
        setHasUpperCase(true);
      }
    }
  }
  if (users) {
    console.log('User data in the store:', users);
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <div>
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
              onChange={(e) => {handleEmail(e)}}
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
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {handlePassword(e)}}
            />
            {
              !password.length && passwordDirty ? (
                <span style={{fontSize:'0.9em', color:'red'}}>*Password is Required</span >
              ) : passwordDirty && password.length < minPasswordLength ? (
                <span style={{fontSize:'0.9em', color:'red'}}>*Password must contain a minimum of {minPasswordLength} characters</span >
              ) : passwordDirty && !hasLowerCase ? (
                <span style={{fontSize:'0.9em', color:'red'}}>*Password must contain atleast one lower case character</span >
              ) : passwordDirty && !hasUpperCase ? (
                <span style={{fontSize:'0.9em', color:'red'}}>*Password must contain atleast one upper case character</span >
              ) : passwordDirty && !hasDigit ? (
                <span style={{fontSize:'0.9em', color:'red'}}>*Password must contain atleast one digit</span >
              ) : <></>
            }
            </div>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onSubmit={ () => {handleSubmit()}}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link variant="body2" style={{cursor: 'pointer'}} onClick={() => {navigate('/forgotPassword')}}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link variant="body2" style={{cursor: 'pointer'}} onClick={() => {navigate('/signUp')}}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}