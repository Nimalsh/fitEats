import React from 'react';
import { Route, Routes } from "react-router-dom";
import { Box } from '@mui/material';
import './assets/css/Main_App.css';
import Dashboard from './pages/Dashboard-admin';
import Login from './pages/Login';
import Signup from './pages/register/Signup';
import Signupuser from './pages/register/Signupuser';
import Signuppremiumuser from './pages/register/Signuppremiumuser';
import Signuprestaurant from './pages/register/Signuprestaurant';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
      
    <Box sx={{margin:"0"}}>
       
        <Routes>
          <Route path="/login" element = {<Login/>} />
          <Route path="/register/Signup" element={<Signup />} />
          <Route path="/register/Signupuser" element={<Signupuser />} />
          <Route path="/register/Signuppremiumuser" element={<Signuppremiumuser />} />
          <Route path="/register/Signuprestaurant" element={<Signuprestaurant />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Box>
  )
}

export default App;