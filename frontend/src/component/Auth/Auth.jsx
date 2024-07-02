import { Modal } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const Auth = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const handleOnClose=()=>{
      navigate("/")
    }
  return (
    <>
    <Modal open= {
        location.pathName === "/account/register"
        || location.pathname === "/acccount/login"

    }>
  
    </Modal>
    
    
    
    </>
  )
}

 
