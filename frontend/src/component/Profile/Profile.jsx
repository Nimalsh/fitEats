import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import UserProfile from './UserProfile';
import ProfileNavigation from './ProfileNavigation';
import Address from './Address';
import {Events} from './Events';
import Favorites from './Favorites';
import Orders from './Orders';
import Food from './Food';
import Nutrigoals from './Nutrigoals';
import RestaurantDetails from '../Restaurant/RestaurantDetails';
import BMI from './BMI';
import Setgoal from './Setgoal';
import Meallog from './Meallog';
import BuildMuscle from './BuildMuscle';
import Mealprogress from './Mealprogress';
import NutriQueries from './NutriQueries';
import Goalselect from './Goalselect';
import Nutritionistselection from './Nutritionistselection';
import Paidweightlossform from './Paidweightlossform';


const Profile = () => {
  const [openSideBar, setOpenSideBar] = useState(false);

  return (
    <div className='lg:flex justify-between'>
      <div className='sticky h-[80vh] lg:w-[20%] p-4'>
        <ProfileNavigation open={openSideBar} />
      </div>
      <div className='lg:w-[80%]'>
        <Routes>
          <Route path="/" element={<Food />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/nutrigoals" element={<Nutrigoals />} /> 
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/events" element={<Events />} />
          <Route path="/BMI" element={<BMI />} />
          <Route path="/lose-weight" element={<Setgoal/>} />
          <Route path="/build-muscle" element={<BuildMuscle />} />
          <Route path="/meal-log" element={<Meallog />} />
          <Route path="/personalized-plan" element={<Goalselect/>} />
          <Route path="/nutri-queries" element={<NutriQueries/>} />
          <Route path="/personalized-plan/weightloss/nutritionist" element={<Nutritionistselection/>} />
          <Route path="/personalized-plan/weightloss" element={<Paidweightlossform/>} />
        </Routes>
      </div>
    </div>
  );
}

export default Profile;
