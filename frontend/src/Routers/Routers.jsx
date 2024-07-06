import React from 'react' 
import { Route, Routes } from 'react-router-dom' 
import { AdminRoute } from './AdminRoute'
import  CustomRoutes from './CustomRoutes'

const Routers = () => {
  return (
    <div>
         <Routes>
            <Route path='/admin/restaurants/*' element={<AdminRoute/>}></Route> 
            <Route path='/*' element={<CustomRoutes/>}></Route> 
         </Routes>
    </div>
  )
}

export default Routers
 