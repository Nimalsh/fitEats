import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from './component/Navbar/Navbar';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from './Theme/DarkTheme';
import Home from './component/Home/Home';
import Profile from './component/Profile/Profile';
import Nutricontent from './component/Profile/Nutricontent';
import BMI from './component/Profile/BMI';
import Meallog from './component/Profile/Meallog';

import RestaurantDetails from './component/Restaurant/RestaurantDetails';
import Cart from './component/Cart/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './component/State/Authentication/Action';

import Routers from './Routers/Routers'; 
import Mealprogress from './component/Profile/Mealprogress';





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
     
      {/* <Home/> */}
<<<<<<< HEAD
      {/*<RestaurantDetails/>*/}
      {/*<Cart/>*/}
      {/* <Meallog/>*/} 
    
     {/* <Nutricontent/> */}
    {/* <BMI/>*/}
    <Mealprogress/> 
=======

      {/* <RestaurantDetails/> */}
      {/* <Cart/> */}
      {/* <CustomRoutes/>  */}
      
       <Routers/>

>>>>>>> f7382afa39d75bf2ce3b1538c2564f6048bab543
    </ThemeProvider>
  
      
  
  );
}

export default App;
