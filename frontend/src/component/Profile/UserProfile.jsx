import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Button} from '@mui/material'; 

const UserProfile =() => {
  const handleLogout=()=>
    {

    }
  return (
    <div className='min-h-[80vh] flex flex-col justify-center items-center text-center'>UserProfile
    <div className='flex flex-col justify-center items-center'><AccountCircleIcon sx={{fontSize:"9rem"}}/>
    <h1 className='py-5 text-2xl font-semibold'>sithumi</h1>
    <p>Email :sithumi@gmail.com</p>
    <Button variant="contained" onClick={handleLogout} sx={{margin:"2rem 0rem"}}>Log Out</Button>
    
    </div>

    
    </div>
  )
}

export default UserProfile