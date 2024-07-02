import React from 'react';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import EventIcon from '@mui/icons-material/Event';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';

const menu = [
  { title: "orders", icon: <ShoppingBagIcon /> },
  { title: "favorites", icon: <FavoriteIcon /> },
  { title: "address", icon: <AddReactionIcon /> },
  { title: "payments", icon: <AccountBalanceWalletIcon /> },
  { title: "notification", icon: <NotificationsIcon /> },
  { title: "events", icon: <EventIcon /> },
  { title: "logout", icon: <LogoutIcon /> }
];

const ProfileNavigation = ({ open, handleClose }) => {
  const isSmallScreen = useMediaQuery("(max-width:1080px)");
  const navigate = useNavigate();

  const handleNavigate = (item) => {
    navigate(`/my-profile/${item.title.toLowerCase()}`);
  };

  return (
    <Drawer
      variant={isSmallScreen ? "temporary" : "permanent"}
      onClose={handleClose}
      open={open}
      anchor="left"
      sx={{ zIndex: -1, position: "sticky" }}
    >
      <div className="w-[50vw] lg:w-[20vw] h-[100vh] flex flex-col justify-center text-xl gap-8 p-4">
        {menu.map((item, i) => (
          <React.Fragment key={i}>
            <div onClick={() => handleNavigate(item)} className="px-5 flex items-center space-x-5 cursor-pointer">
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
