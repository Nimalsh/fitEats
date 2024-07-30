// src/components/Dashboard.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import styled from 'styled-components';
import { Resturants } from './tabs/Resturants';
import {Users} from './tabs/Users';
import Nutritionists from './tabs/Nutritionists';
import DeliveryDrivers from './tabs/DeliveryDrivers';
import Transactions from './tabs/Transactions';
import Complaints from './tabs/Complaints';

const DashboardContainer = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <DashboardContainer>
        <Sidebar />
        <Content>
          <Routes>
            <Route path="restaurants" element={<Resturants />} />
            <Route path="users" element={<Users />} />
            <Route path="nutritionists" element={<Nutritionists />} />
            <Route path="delivery-drivers" element={<DeliveryDrivers />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="complaints" element={<Complaints />} />
          </Routes>
        </Content>
      </DashboardContainer>
    </>
  );
};

export default Dashboard;
