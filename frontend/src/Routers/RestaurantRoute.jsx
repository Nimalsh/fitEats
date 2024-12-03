import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Admin } from '../RestaurantComponent/Admin/Admin';
import { CreateRestaurantForm } from '../RestaurantComponent/CreateRestaurantForm/CreateRestaurantForm';
import { IngredientReport } from '../RestaurantComponent/Dashboard/IngredientReport';
import { AddEvent } from '../RestaurantComponent/Events/AddEvent';
import { EventDetails } from '../RestaurantComponent/Events/EventDetails';
import { UpdateEvent } from '../RestaurantComponent/Events/UpdateEvent';
import { UpdateFoodItem } from '../RestaurantComponent/FoodCategory/UpdateFoodItem';
import { Drivers } from '../RestaurantComponent/IncomingOrders/Drivers'; 
import { CreateIngredientCategoryForm } from '../RestaurantComponent/Ingredients/CreateIngredientCategoryForm'; 
import { IncomeReport } from '../RestaurantComponent/Dashboard/IncomeReport';  
export const RestaurantRoute = () => {
  const { restaurant } = useSelector(store => store);

  return (
    <div>
      <Routes>
        <Route path='/*' element={!restaurant.usersRestaurant? <CreateRestaurantForm /> : <Admin />}></Route> 
        <Route path="/food-item/update/:foodItemId" element={<UpdateFoodItem />} />
        <Route path="/event/update/:eventId" element={<UpdateEvent />} />
        <Route path="/event/add" element={<AddEvent />} />
        <Route path="/event/:eventId" element={<EventDetails />} />  
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/ingredientcategory/add" element={<CreateIngredientCategoryForm />} /> 
        {/* <Route path="/admin/restaurant/menu/food-details/:id" element={<FoodDetails />} /> */}
        <Route path="/ingredient-report" element={<IngredientReport/>}/>
        <Route path="/income-report" element={<IncomeReport/>}/>  
      </Routes>
    </div>
  );
};
