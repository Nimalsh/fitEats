import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CreateRestaurantForm from '../RestaurantComponent/CreateRestaurantForm/CreateRestaurantForm'
import { Admin } from '../RestaurantComponent/Admin/Admin'
import { AddFoodCategory } from '../RestaurantComponent/FoodCategory/AddFoodCategory'
import { FoodItemsByCategory } from '../RestaurantComponent/FoodCategory/FoodItemsByCategory';

export const RestaurantRoute = () => {
  return (
    <div>
        <Routes>
            <Route path='/*' element={false?<CreateRestaurantForm/>:<Admin/>}></Route>
            <Route path="/category/add" element={<AddFoodCategory />} />
            <Route path="/food-category/:categoryId" element={<FoodItemsByCategory />} />
        </Routes>
    </div>
  )
}


