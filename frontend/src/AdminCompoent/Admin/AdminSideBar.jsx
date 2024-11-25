import { AttachMoney, Dashboard, DeliveryDining, FoodBank, Healing, HealthAndSafety, Money, Person, ShoppingBag, TranscribeSharp } from '@mui/icons-material';  
import LogoutIcon from '@mui/icons-material/Logout'; 
import { Divider, Drawer, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../component/State/Authentication/Action';

const menu = [
  { title: "System", icon: <Dashboard />, path: "/" },
  { title: "Users", icon: <Person />, path: "/Users" }, 
  { title: "Resturants", icon: <FoodBank />, path: "/Resturants" },
  { title: "Nutritionist", icon: <HealthAndSafety />, path: "/Nutritionist" }, 
  { title: "Delivery Driver", icon: <DeliveryDining />, path: "/DeliveryDriver" },
  { title: "Transactions", icon: <AttachMoney />, path: "/Transactions" }, 
  { title: "Complains", icon: <ShoppingBag />, path: "/complains" },
  { title: "User Approvals", icon: <ShoppingBag />, path: "/UserApprovals" }, 
  { title: "Order History", icon: <ShoppingBag />, path: "/OrderHistory" }, 
  { title: "Nutritionist Channeling", icon: <ShoppingBag />, path: "/NutritionistChanneling" }, 
  { title: "Logout", icon: <LogoutIcon />, path: "/" },
];

export const AdminSideBar = ({ handleClose }) => {
  const isSmallScreen = useMediaQuery("(max-width:1080px)");
  const navigate = useNavigate();
  const [hoverIndex, setHoverIndex] = useState(null);
  const dispatch = useDispatch();

  const handleNavigate = (item) => {
    navigate(`/admin/admin${item.path}`);
    if(item.title === "Logout") {
      navigate("/")
      dispatch(logout())
      handleClose()
    }
  };

  return (
    <div>
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        onClose={handleClose}
        open={true}
        anchor='left'
        sx={{ zIndex: 1 }}
      >
        <div style={{
          width: isSmallScreen ? '70vw' : '20vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          fontSize: '1.25rem',
          backgroundColor: 'black', // Background color changed to black
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'
        }}>
 
          {menu.map((item, i) => (
            <React.Fragment key={i}>
              <div
                onClick={() => handleNavigate(item)}
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
                style={{
                  padding: '15px 20px',
                  display: 'flex',
                  alignItems: 'flex-end',
                  cursor: 'pointer',
                  gap: '20px',
                  color: 'white',
                  borderRadius: '10px',
                  margin: '5px',
                  backgroundColor: hoverIndex === i ? '#696969' : 'black', // Hover color changed to dark grey
                  transition: 'background-color 0.3s',
                }}
                className={`sidebar-item ${i === menu.length - 1 ? 'active' : ''}`}
              >
                {item.icon}
                <span>{item.title}</span>
              </div>
              {i !== menu.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </div>
      </Drawer>
    </div>
  );
};


