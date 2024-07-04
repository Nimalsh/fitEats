import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CreateRestaurantForm from '../AdminComponent/CreateRestaurantForm/CreateRestaurantForm'
import { Admin } from '../AdminComponent/Admin/Admin'

export const AdminRoute = () => {
  return (
    <div>
        <Routes>
            <Route path='/*' element={false?<CreateRestaurantForm/>:<Admin/>}>

            </Route>
        </Routes>
    </div>
  )
}
