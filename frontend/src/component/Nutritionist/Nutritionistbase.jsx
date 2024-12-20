import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import ProfileNavigation from './ProfileNavigation';
import Articles from './Articles';
import Query from './Query';
import Menus from './Menus';
import Requests from './Requests';
import Queryanswer from './Queryanswer';
import WeightGain from './Weightgain';
import Weightloss from './Weightloss';
import Othergoal from './Othergoal';
import Plangeneration from './Plangeneration';
import Dashboard from './Dashboard';
import Completedplans from './Completedplans';
import Queryreplied from './Queryreplied';
import Mealprogress from './Mealprogress';





const Nutritionistbase = () => {
    const [openSideBar, setOpenSideBar] = useState(false);
  
    return (
      <div className='lg:flex justify-between'>
        <div className='sticky h-[80vh] lg:w-[20%] p-4'>
          <ProfileNavigation open={openSideBar} />
        </div>
        <div className='lg:w-[80%]'>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/menus" element={<Menus />} />
            <Route path="/queries" element={<Query />} /> 
            <Route path="/articles" element={<Articles />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/queries/reply" element={<Queryanswer />} />
            <Route path="/weightgain/view/:requestId" element={<WeightGain />} />
            <Route path="/weightloss/view/:requestId" element={<Weightloss />} />
            <Route path="/other/view/:requestId" element={<Othergoal />} />
            <Route path="/other/view/proceed" element={<Plangeneration />} />
            <Route path="/weightloss/view/proceed/:planId/:duration/:status" element={<Plangeneration />} />

            <Route path="/weightgain/view/proceed" element={<Plangeneration />} />
            <Route path="requests/view/completed" element={<Completedplans/>} />
            <Route path="/queries/replied" element={<Queryreplied />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/weightloss/view/proceed/:planId/:duration" element={<Mealprogress />} />
             
          </Routes>
        </div>
      </div>
    );
  }
  
  export default Nutritionistbase;