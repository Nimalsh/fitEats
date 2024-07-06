import { Dashboard, ShoppingBag } from '@mui/icons-material'
import React from 'react'
import ShopTwoIcon from '@mui/icons-material/ShopTwo';
import CategoryIcon from '@mui/icons-material/Category';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import EventIcon from '@mui/icons-material/Event';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Drawer, useMediaQuery } from '@mui/material';

const menu = [
    {title:"Dashboard", icon:<Dashboard/>, path:"/"},
    {title:"Oders", icon:<ShoppingBag />, path:"/orders"},
    {title:"Menu", icon:<ShopTwoIcon/>, path:"/menu"},
    {title:"FoodCategory", icon:<CategoryIcon/>, path:"/category"},
    {title:"Ingredients", icon:<FastfoodIcon/>, path:"/ingredients"},
    {title:"Events", icon:<EventIcon/>, path:"/event"},
    {title:"Details", icon:<AdminPanelSettingsIcon/>, path:"/details"},
    {title:"Logout", icon:<LogoutIcon/>, path:"/"},
]

export const AdminSideBar = ({handleClose}) => {
  const isSmallScreen=useMediaQuery("(max-width:1080px)")
  return (
    <div>
      <>
      <Drawer 
      variant={isSmallScreen?"temporary":"permanent"}
      onClose={handleClose} 
      open={true} 
      anchor='left'
      sx={{zIndex:1}}>
        
      </Drawer>
      </>
    </div>
  )
}
