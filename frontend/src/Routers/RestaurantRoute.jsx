import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CreateRestaurantForm from '../RestaurantComponent/CreateRestaurantForm/CreateRestaurantForm'
import { Admin } from '../RestaurantComponent/Admin/Admin'
import { AddFoodCategory } from '../RestaurantComponent/FoodCategory/AddFoodCategory'

export const RestaurantRoute = () => {
  return (
    <div>
        <Routes>
            <Route path='/*' element={false?<CreateRestaurantForm/>:<Admin/>}></Route>
            <Route path="/category/add" element={<AddFoodCategory />} />
        </Routes>
    </div>
  )
}


