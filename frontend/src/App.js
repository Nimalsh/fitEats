import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from './component/Navbar/Navbar';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from './Theme/DarkTheme';
import Home from './component/Home/Home';
import Profile from './component/Profile/Profile';

import Nutricontent from './component/Profile/Nutricontent';


import RestaurantDetails from './component/Restaurant/RestaurantDetails';
import Cart from './component/Cart/Cart';
import CustomRoutes from './Routers/CustomRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './component/State/Authentication/Action';
import CustomRoutes from './Routers/CustomRoutes'; 
import Routers from './Routers/Routers';




function App() {
  const dispatch=useDispatch()
  const jwt=localStorage.getItem("jwt"  )
  const {auth}=useSelector(store=>store) 

  useEffect(()=>{
    dispatch(getUser(auth.jwt||jwt));
  }, [auth.jwt])
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <Navbar/>
      {/* <Home/> */}
      {/*<RestaurantDetails/>*/}
      {/*<Cart/>*/}
    </ThemeProvider>
  
      
  
  );
}

export default App;
