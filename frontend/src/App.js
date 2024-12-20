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
import Setgoal from './component/Profile/Setgoal';

import Weightloss from './component/Nutritionist/Weightloss';
import Weightgain from './component/Nutritionist/Weightgain';

import CustomRoutes from './Routers/CustomRoutes';

import Othergoal from './component/Nutritionist/Othergoal';
import Plangeneration from './component/Nutritionist/Plangeneration';
import Mealplanmakebysearch from './component/Nutritionist/Mealplansmakebysearch'; 
import { getRestaurantByUserId } from './component/State/Restaurant/Action';
import Calorytrack from './component/Profile/Calorytrack'; 
import { findCart } from './component/State/Cart/Action';


function App() {
  const dispatch=useDispatch()
  const jwt=localStorage.getItem("jwt"  )
  const {auth}=useSelector(store=>store) 

  useEffect(()=>{
    dispatch(getUser(auth.jwt||jwt));
    
    dispatch(findCart(jwt));
  }, [auth.jwt]);
  
  useEffect(()=>{
    dispatch(getRestaurantByUserId(auth.jwt || jwt));
  },[auth.user])


  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
     
      {/* <Home/> */}

      {/* <RestaurantDetails/> */}
      {/* <Cart/> */}


      {/* <CustomRoutes/>  */}



   <Routers/>

     </ThemeProvider>
  
      
  
  );
}

export default App;
