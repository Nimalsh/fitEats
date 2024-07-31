import React from 'react';
import { Drawer, Divider } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { logout } from '../State/Authentication/Action';
import ViewListIcon from '@mui/icons-material/ViewList';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ArticleIcon from '@mui/icons-material/Article';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
const menu = [
  { title: "Dashboard", icon: <DashboardIcon /> },
  { title: "Requests", icon: <SummarizeIcon /> },
  { title: "Menus", icon: <ViewListIcon/> },
  { title: "Articles", icon: <ArticleIcon /> },
  { title: "Queries", icon: <PsychologyAltIcon  /> },
  { title: "Notification", icon: <NotificationsIcon /> },
 
  { title: "Logout", icon: <LogoutIcon /> }
];

export const ProfileNavigation = ({ open, handleClose }) => {
  const isSmallScreen = useMediaQuery("(max-width:1080px)");
  const navigate = useNavigate();
  const dispatch =useDispatch();

  const handleNavigate = (item) => {
    if(item.title==="Logout"){
        dispatch(logout());
        navigate("/")
    }
    else
    navigate(`/Nutri/${item.title.toLowerCase()}`);
  };

  return (
    <Drawer
      variant={isSmallScreen ? "temporary" : "permanent"}
      onClose={handleClose}
      open={open}
      anchor="left"
      sx={{ zIndex: -1, position: "sticky" }}
    >
      <div style={{ width: isSmallScreen ? '50vw' : '20vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: '1.25rem', gap: '2rem', padding: '1rem' }}>
        {menu.map((item, i) => (
          <React.Fragment key={i}>
            <div 
              onClick={() => handleNavigate(item)} 
              style={{ 
                padding: i === 0 ? '2rem 1.25rem 0 1.25rem' : '0 1.25rem', // Increase top padding for the first item
                display: 'flex', 
                alignItems: 'center', 
                gap: '1.25rem', 
                cursor: 'pointer' 
              }}
            >
              {item.icon}
              <span>{item.title}</span>
            </div>
            {i !== menu.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </div>
    </Drawer>
  );
}

export default ProfileNavigation;
