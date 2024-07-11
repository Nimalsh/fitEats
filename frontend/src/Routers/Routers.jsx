import React from 'react' 
import { Route, Routes } from 'react-router-dom' 
import { RestaurantRoute } from './RestaurantRoute'
import  CustomRoutes from './CustomRoutes'

const Routers = () => {
  return (
    <div>
         <Routes>
            <Route path='/restauranat/restaurants/*' element={<RestaurantRoute/>}></Route> 
            <Route path='/*' element={<CustomRoutes/>}></Route> 
         </Routes>
    </div>
  )
}

export default Routers
 