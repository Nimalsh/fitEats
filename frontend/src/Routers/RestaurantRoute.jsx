import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CreateRestaurantForm from '../RestaurantComponent/CreateRestaurantForm/CreateRestaurantForm'
import { Admin } from '../RestaurantComponent/Admin/Admin'
import { AddFoodCategory } from '../RestaurantComponent/FoodCategory/AddFoodCategory'
import { FoodItemsByCategory } from '../RestaurantComponent/FoodCategory/FoodItemsByCategory';
import { AddFoodItem } from '../RestaurantComponent/FoodCategory/AddFoodItem';
import { FoodItemDetails } from '../RestaurantComponent/FoodCategory/FoodItemDetails'
import { UpdateFoodItem } from '../RestaurantComponent/FoodCategory/UpdateFoodItem'
import { OrderDetails } from '../RestaurantComponent/Orders/OrderDetails' 
import { UpdateEvent } from '../RestaurantComponent/Events/UpdateEvent'
import { AddEvent } from '../RestaurantComponent/Events/AddEvent'
import { EventDetails } from '../RestaurantComponent/Events/EventDetails'
import { InOrderDetails } from '../RestaurantComponent/IncomingOrders/InOrderDetails'
import { Drivers } from '../RestaurantComponent/IncomingOrders/Drivers'


export const RestaurantRoute = () => {
  return (
    <div>
        <Routes>
            <Route path='/*' element={false?<CreateRestaurantForm/>:<Admin/>}></Route>
            <Route path="/category/add" element={<AddFoodCategory />} />
            <Route path="/food-category/:categoryId" element={<FoodItemsByCategory />} /> 
            <Route path="/food-item/add/:categoryId" element={<AddFoodItem/>} />
            <Route path="/food-item/:foodItemId" element={<FoodItemDetails />} />
            <Route path="/food-item/update/:foodItemId" element={<UpdateFoodItem />} />
            <Route path="/order/:orderId" element={<OrderDetails />} />  
            <Route path="/event/update/:eventId" element={<UpdateEvent />} />
            <Route path="/event/add" element={<AddEvent />} /> 
            <Route path="/event/:eventId" element={<EventDetails />} />  
            <Route path="/incoming-order/:orderId" element={<InOrderDetails />} /> 
            <Route path="/drivers" element={<Drivers />} /> 

        </Routes>
    </div>
  )
}


