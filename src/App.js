import logo from './logo.svg';
import './App.css';
import LoginPage from './Components/LoginPage/index';
import SignUpPage from './Components/SignUpPage/index';
import { useState } from 'react';
import {Routes, Route} from 'react-router-dom';
import ForgotPassword from './Components/ForgotPasswordPage';
import Dashboard from './Components/Dashboard';


function App() {
  
  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/signUp' element={<SignUpPage/>}/>
        <Route path='/forgotPassword' element={<ForgotPassword/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>

      
      
    </div>
  );
}

export default App;