import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from '../component/Navbar/Navbar';
import Home from '../component/Home/Home';
import Profile from '../component/Profile/Profile';
import RestaurantDetails from '../component/Restaurant/RestaurantDetails';
import Cart from '../component/Cart/Cart';
import { Auth } from '../component/Auth/Auth';
import Nutrigoals from '../component/Profile/Nutrigoals';
import BMI from '../component/Profile/BMI';
import NutritionInfo from '../component/Profile/Nutricontent';

import Nutritionistbase from '../component/Nutritionist/Nutritionistbase';
import { Dashboard } from '../AdminCompoent/Dashbpard/Dashboard';
import { AdminSideBar } from '../AdminCompoent/Admin/AdminSideBar';
import {Admin} from "../AdminCompoent/Admin/Admin";
import Nutricontent from '../component/Profile/Nutricontent';
import Nutritionistregisterform from '../component/Home/Nutritionistregisterform'

export default function CustomRoutes() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/account/:register' element={<Home />} />
        <Route path='/restaurant/:city/:title/:id' element={<RestaurantDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/my-profile/*' element={<Profile />} />
        <Route path="/nutrition-content" element={<NutritionInfo />} />
        <Route path="/admin/admin/*" element={<Admin />} />
        <Route path="/nutrition-content/:foodName" element={<Nutricontent />} />

        <Route path='/nutri/*' element={<Nutritionistbase />} />
        <Route path='/account/nutritionist/form' element={<Nutritionistregisterform />} />
        


      </Routes>
      <Auth />
    </div>
  );
}


