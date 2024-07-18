import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {Navbar} from '../component/Navbar/Navbar';
import Home from '../component/Home/Home';
import Profile from '../component/Profile/Profile';
import RestaurantDetails from '../component/Restaurant/RestaurantDetails';
import Cart from '../component/Cart/Cart';
import { Auth } from '../component/Auth/Auth';
import Nutrigoals from '../component/Profile/Nutrigoals';
import BMI from '../component/Profile/BMI';
import NutritionInfo from '../component/Profile/Nutricontent';

import Nutritionistbase from '../component/Nutritionist/Nutritionistbase';

export default function CustomRoutes() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/account/:register' element={<Home />} />
        <Route path='/restaurant/:city/:title/:Id' element={<RestaurantDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/my-profile/*' element={<Profile />} />

        <Route path="/restaurant-details" element={<RestaurantDetails />} />
        <Route path="/nutrition-content" element={<NutritionInfo />} />

        <Route path='/nutri/*' element={<Nutritionistbase />} />
        


      </Routes>
      <Auth/>
    </div>
  );
}


