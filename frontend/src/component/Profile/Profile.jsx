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
import Meallog from './Meallog';
import BuildMuscle from './BuildMuscle';
import Mealprogress from './Mealprogress';
import NutriQueries from './NutriQueries';

import MenuSuggest from './MenuSuggest';
import AutoSuggestRes from './AutoSuggestRes';
import MealPlansPage from './MealPlansPage';
import Payments from './Payment';

import Goalselect from './Goalselect';
import Nutritionistselection from './Nutritionistselection';
import Paidweightlossform from './Paidweightlossform';
import Paidweightgainform from './Paidweightgainform';
import Calorytrack from './Calorytrack';
import Paidothergoalform from './Paidothergoalform'
import Goalselectfree from './Goalselectfree';
import Freeweightgainform from './Freeweightgainform';
import Freeweightlossform from './Freeweightlossform';
import Dashboard from './Dashboard';
import Complain from './ComplaintForm';
import ComplaintForm from './ComplaintForm';



const Profile = () => {
  const [openSideBar, setOpenSideBar] = useState(false);

  return (
    <div className='lg:flex justify-between'>
      <div className='sticky h-[80vh] lg:w-[20%] p-4'>
        <ProfileNavigation open={openSideBar} />
      </div>
      <div className='lg:w-[80%]'>
        <Routes>
          <Route path="/" element={<UserProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/restaurant" element={<Food />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/nutrigoals" element={<Nutrigoals />} /> 
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/events" element={<Events />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/BMI" element={<BMI />} />
          <Route path="/lose-weight" element={<Goalselectfree/>} />
          <Route path="/build-muscle" element={<BuildMuscle />} />
          <Route path="/meal-log" element={<Meallog />} />
          <Route path="/personalized-plan" element={<Goalselect/>} />
          <Route path="/nutri-queries" element={<NutriQueries/>} />
          <Route path="/complain" element={<ComplaintForm/>} />

          <Route path="/meal-plan" element={<MealPlansPage />} />
          <Route path="/menu-suggest" element={<MenuSuggest/>} />
          <Route path="/auto-suggest-restaurant" element={<AutoSuggestRes/>} />
          

          <Route path="/personalized-plan/weightloss/nutritionist" element={<Nutritionistselection/>} />
          <Route path="/personalized-plan/weightloss" element={<Paidweightlossform/>} />
          <Route path="/personalized-plan/view" element={<Mealprogress/>} />
          <Route path="/personalized-plan/weightgain" element={<Paidweightgainform/>} />
          <Route path="/BMI/plan" element={<Calorytrack/>} />
          <Route path="/personalized-plan/other" element={<Paidothergoalform/>} />
          <Route path="/lose-weight/weightgain" element={<Freeweightgainform/>} />
          <Route path="/lose-weight/weightloss" element={<Freeweightlossform/>} />

        </Routes>
      </div>
    </div>
  );
}

export default Profile;
