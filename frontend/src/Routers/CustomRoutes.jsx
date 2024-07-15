import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {Navbar} from '../component/Navbar/Navbar';
import Home from '../component/Home/Home';
import Profile from '../component/Profile/Profile';
import RestaurantDetails from '../component/Restaurant/RestaurantDetails';
import Cart from '../component/Cart/Cart';
import { Auth } from '../component/Auth/Auth';
import Nutrigoals from '../component/Profile/Nutrigoals';
import NutritionInfo from '../component/Profile/Nutricontent';

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
      </Routes>
      <Auth/>
    </div>
  );
}


