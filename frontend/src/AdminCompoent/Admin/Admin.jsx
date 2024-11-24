import React from 'react';
import { Route, Routes } from 'react-router-dom'; 
import { Orders } from '../Orders/Orders';
import { AdminSideBar } from './AdminSideBar';
import { Navbar } from './Navbar/Navbar';  
import { Complains } from '../Complains/Complains';
import { Dashboard } from '../Dashbpard/Dashboard';
import { Users } from '../Users/Users';
import { Restaurant } from '../Resturant/Resturant';
import { Nutritionist } from '../Nutritionist/Nutritionist';
import { DeliveryDriver } from '../Delivery Driver/DeliveryDriver';
import { UserApprovals } from '../UserApprovals/UserApprovals';
import { OrderHistory } from '../OrderHistory/OrderHistory';
import { NutritionistChanneling } from '../NutritionistChanneling/NutritionistChanneling';
import { Complaints } from '../Complaints/Complaints';

export const Admin = () => {
  const handleClose = () => {};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <AdminSideBar handleClose={handleClose} />
        <div style={{ flexGrow: 1, padding: '20px', marginLeft: '20vw', marginTop: '0' }}>
          <Routes>
            <Route path='/' element={<Dashboard/>} />
            // create route for all admin components
            <Route path='/Users' element={<Users/>} />
            <Route path='/Resturants' element={<Restaurant/>} />
            <Route path='/Nutritionist' element={<Nutritionist/>} />
            <Route path='/DeliveryDriver' element={<DeliveryDriver/>} />
            <Route path='/Transactions' element={<Users/>} />
            <Route path='/complains' element={<Complaints/>} />
            <Route path='/UserApprovals' element={<UserApprovals/>} />
            <Route path='/OrderHistory' element={<OrderHistory/>} />
            <Route path='/NutritionistChanneling' element={<NutritionistChanneling/>} />

          </Routes>
        </div>
      </div>
    </div>
  );
};

