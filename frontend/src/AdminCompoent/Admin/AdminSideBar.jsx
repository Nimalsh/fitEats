import React, { useState } from 'react';
import {
  DashboardOutlined,
  UserOutlined,
  ShopOutlined,
  SafetyOutlined,
  CarOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  HistoryOutlined,
  LogoutOutlined,
  AppstoreAddOutlined,
} from '@ant-design/icons';
import { Menu, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../component/State/Authentication/Action';

const { Sider } = Layout;

const menuItems = [
  { key: '/', label: 'System', icon: <DashboardOutlined /> },
  { key: '/Users', label: 'Users', icon: <UserOutlined /> },
  { key: '/Resturants', label: 'Restaurants', icon: <ShopOutlined /> },
  { key: '/Nutritionist', label: 'Nutritionist', icon: <SafetyOutlined /> },
  { key: '/DeliveryDriver', label: 'Delivery Driver', icon: <CarOutlined /> },
  { key: '/Transactions', label: 'Transactions', icon: <DollarOutlined /> },
  { key: '/complains', label: 'Complains', icon: <ShoppingCartOutlined /> },
  { key: '/UserApprovals', label: 'User Approvals', icon: <AppstoreAddOutlined /> },
  { key: '/OrderHistory', label: 'Order History', icon: <HistoryOutlined /> },
  { key: '/NutritionistChanneling', label: 'Nutritionist Channeling', icon: <ShoppingCartOutlined /> },
  { key: 'logout', label: 'Logout', icon: <LogoutOutlined /> },
];

export const AdminSideBar = ({ handleClose }) => {
  const [activeKey, setActiveKey] = useState('/');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      dispatch(logout());
      navigate('/');
      handleClose && handleClose();
    } else {
      setActiveKey(key);
      navigate(`/admin/admin${key}`);
      handleClose && handleClose();
    }
  };

  return (
    <Sider
      width={350} // Increased width for a bigger sidebar
      collapsible
      breakpoint="lg"
      collapsedWidth={120} // Increased collapsed width for larger icon area
      style={{
        height: '100vh',
        backgroundColor: 'black',
        color: 'white',
        boxShadow: '2px 4px 10px rgba(0, 0, 0, 0.3)',
      }}
    >
      <div
        style={{
          height: '80px', // Bigger area for the logo/branding section
          margin: '16px',
          background: 'rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          fontWeight: 'bold',
          color: 'white',
        }}
      >
        Admin Panel
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[activeKey]}
        onClick={handleMenuClick}
        style={{
          backgroundColor: 'black',
          color: 'white',
          fontSize: '20px', // Larger font size for menu items
        }}
        items={menuItems.map((item) => ({
          key: item.key,
          icon: React.cloneElement(item.icon, { style: { fontSize: '28px' } }), // Bigger icons
          label: item.label,
          style: {
            backgroundColor: activeKey === item.key ? '#696969' : 'black',
            color: 'white',
            padding: '20px 30px', // Increased padding for larger clickable areas
            margin: '10px 0', // Added margin between items
            borderRadius: '10px', // Rounded corners
            transition: 'background-color 0.3s',
          },
        }))}
      />
    </Sider>
  );
};
