// src/components/Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
`;

const Logo = styled.h1`
  font-size: 24px;
`;

const LogoutButton = styled.button`
  padding: 10px;
  background-color: #fff;
  color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
    color: #fff;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <NavbarContainer>
      <Logo>Admin Dashboard</Logo>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </NavbarContainer>
  );
};

export default Navbar;
