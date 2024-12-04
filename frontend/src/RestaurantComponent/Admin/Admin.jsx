import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { fetchRestaurantsOrder } from '../../component/State/Restaurant Order/Action';
import { getRestaurantsCategory } from '../../component/State/Restaurant/Action';
import {ComplaintPage} from '../Complains/ComplaintPage';
import {ComplaintHistory} from '../Complains/ComplaintHistory'
import { Dashboard } from '../Dashboard/Dashboard';
// import { IngredientReport } from '../Dashboard/IngredientReport';
import { Events } from '../Events/Events';
import { FoodCategory } from '../FoodCategory/FoodCategory';
import { Ingredients } from '../Ingredients/Ingredients';
import { CreateMenuForm } from '../Menu/CreateMenuForm';
import { FoodDetails } from '../Menu/FoodDetails';
import { Menu } from '../Menu/Menu';
import { Orders } from '../Orders/Orders';
import { OrderDetails} from '../Orders/OrderDetails';
import { AdminSideBar } from './AdminSideBar';
import { Navbar } from './Navbar/Navbar';
import { RestuarantDetails } from './RestuarantDetails'; 
import ComplaintForm from '../Complains/ComplaintForm';

export const Admin = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant } = useSelector(store => store);

  useEffect(() => {
    if (restaurant.usersRestaurant) {
      dispatch(getRestaurantsCategory({
        jwt,
        restaurantId: restaurant.usersRestaurant.id,
      }));
      dispatch(fetchRestaurantsOrder({
        jwt,
        restaurantId: restaurant.usersRestaurant.id,
      }));
 
    }
  }, [dispatch, jwt, restaurant.usersRestaurant]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <AdminSideBar handleClose={() => {}} />
        <div style={{ flexGrow: 1, padding: '20px', marginLeft: '20vw', marginTop: '0' }}>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/category' element={<FoodCategory />} />
            <Route path='/ingredients' element={<Ingredients />} />
            <Route path='/events' element={<Events />} />
            <Route path='/details' element={<RestuarantDetails />} />
            <Route path='/complains' element={<ComplaintPage />} /> 
            <Route path='/add-menu' element={<CreateMenuForm />} />
            <Route path="/menu/food-details/:id" element={<FoodDetails />} />  
            <Route path="/orders/order-details/:orderId" element={<OrderDetails />} />
            <Route path="/complains/complain-history" element={<ComplaintHistory />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
