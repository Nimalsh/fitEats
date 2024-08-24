import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Admin } from '../RestaurantComponent/Admin/Admin';
import { CreateRestaurantForm } from '../RestaurantComponent/CreateRestaurantForm/CreateRestaurantForm';
import { AddEvent } from '../RestaurantComponent/Events/AddEvent';
import { EventDetails } from '../RestaurantComponent/Events/EventDetails';
import { UpdateEvent } from '../RestaurantComponent/Events/UpdateEvent';
import { AddFoodItem } from '../RestaurantComponent/FoodCategory/AddFoodItem';
import { FoodItemsByCategory } from '../RestaurantComponent/FoodCategory/FoodItemsByCategory';
import { UpdateFoodItem } from '../RestaurantComponent/FoodCategory/UpdateFoodItem';
import { Drivers } from '../RestaurantComponent/IncomingOrders/Drivers';
import { InOrderDetails } from '../RestaurantComponent/IncomingOrders/InOrderDetails';
import { CreateIngredientCategoryForm } from '../RestaurantComponent/Ingredients/CreateIngredientCategoryForm';
import { FoodDetails } from '../RestaurantComponent/Menu/FoodDetails';
import { OrderDetails } from '../RestaurantComponent/Orders/OrderDetails';
 
export const RestaurantRoute = () => {
  const { restaurant } = useSelector(store => store);
  return (
    <div>
      <Routes>
        <Route path='/*' element={!restaurant.usersRestaurant? <CreateRestaurantForm /> : <Admin />}></Route>
        <Route path="/food-category/:categoryId" element={<FoodItemsByCategory />} />
        <Route path="/food-item/add/:categoryId" element={<AddFoodItem />} /> 
        <Route path="/food-item/update/:foodItemId" element={<UpdateFoodItem />} />
        <Route path="/order/:orderId" element={<OrderDetails />} />
        <Route path="/event/update/:eventId" element={<UpdateEvent />} />
        <Route path="/event/add" element={<AddEvent />} />
        <Route path="/event/:eventId" element={<EventDetails />} />
        <Route path="/incoming-order/:orderId" element={<InOrderDetails />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/ingredientcategory/add" element={<CreateIngredientCategoryForm />} /> 
        {/* <Route path="/admin/restaurant/menu/food-details/:id" element={<FoodDetails />} /> */}
      </Routes>
    </div>
  );
};
