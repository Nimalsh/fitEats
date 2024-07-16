import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import ProfileNavigation from './ProfileNavigation';
import Articles from './Articles';
import Query from './Query';
import Menus from './Menus';
import Requests from './Requests';





const Nutritionistbase = () => {
    const [openSideBar, setOpenSideBar] = useState(false);
  
    return (
      <div className='lg:flex justify-between'>
        <div className='sticky h-[80vh] lg:w-[20%] p-4'>
          <ProfileNavigation open={openSideBar} />
        </div>
        <div className='lg:w-[80%]'>
          <Routes>
            <Route path="/" element={<Requests />} />
            <Route path="/menus" element={<Menus />} />
            <Route path="/queries" element={<Query />} /> 
            <Route path="/articles" element={<Articles />} />
           
            
          </Routes>
        </div>
      </div>
    );
  }
  
  export default Nutritionistbase;