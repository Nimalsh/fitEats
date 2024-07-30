import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Dashboard } from '../Dashboard/Dashboard';
import { Events } from '../Events/Events';
import { FoodCategory } from '../FoodCategory/FoodCategory';
import { IncomingOrders } from '../IncomingOrders/IncomingOrders';
import { Ingredients } from '../Ingredients/Ingredients';
import { Menu } from '../Menu/Menu';
import { Orders } from '../Orders/Orders';
import { AdminSideBar } from './AdminSideBar';
import { Navbar } from './Navbar/Navbar';
import { RestuarantDetails } from './RestuarantDetails';

export const Admin = () => {
  const handleClose = () => {};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <AdminSideBar handleClose={handleClose} />
        <div style={{ flexGrow: 1, padding: '20px', marginLeft: '20vw', marginTop: '0' }}>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/incomingorders' element={<IncomingOrders />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/category' element={<FoodCategory />} />
            <Route path='/ingredients' element={<Ingredients />} />
            <Route path='/events' element={<Events />} />
            <Route path='/details' element={<RestuarantDetails />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

