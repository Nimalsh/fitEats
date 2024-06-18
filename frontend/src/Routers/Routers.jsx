import React from 'react' 
import { Route, Routes } from 'react-router-dom'
import RestaurantRoute from './RestaurantRoute'

const Routers = () => {
  return (
    <div>
         <Routes>
            <Route path='"/restaurant/restaurant/*' element={<RestaurantRoute/>}></Route> 
         </Routes>
    </div>
  )
}

export default Routers
 