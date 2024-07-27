// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #007bff;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const SidebarItem = styled(NavLink)`
  padding: 15px 20px;
  margin-bottom: 10px;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  &:hover {
    background-color: #0056b3;
  }
  &.active {
    background-color: #0056b3;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarItem to="/dashboard/restaurants">Restaurants</SidebarItem>
      <SidebarItem to="/dashboard/users">Users</SidebarItem>
      <SidebarItem to="/dashboard/nutritionists">Nutritionists</SidebarItem>
      <SidebarItem to="/dashboard/delivery-drivers">Delivery Drivers</SidebarItem>
      <SidebarItem to="/dashboard/transactions">Transactions</SidebarItem>
      <SidebarItem to="/dashboard/complaints">Complaints</SidebarItem>
    </SidebarContainer>
  );
};

export default Sidebar;
