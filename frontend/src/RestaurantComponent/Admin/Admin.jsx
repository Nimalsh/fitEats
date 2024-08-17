import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { getMenuItemsByRestaurantId } from '../../component/State/Menu/Action';
import { fetchRestaurantsOrder } from '../../component/State/Restaurant Order/Action';
import { getRestaurantById, getRestaurantsCategory } from '../../component/State/Restaurant/Action';
import ComplaintPage from '../Complains/ComplaintForm';
import { Dashboard } from '../Dashboard/Dashboard';
import { Events } from '../Events/Events';
import { FoodCategory } from '../FoodCategory/FoodCategory';
import { Ingredients } from '../Ingredients/Ingredients';
import { CreateMenuForm } from '../Menu/CreateMenuForm';
import { Menu } from '../Menu/Menu';
import { Orders } from '../Orders/Orders';
import { AdminSideBar } from './AdminSideBar';
import { Navbar } from './Navbar/Navbar';
import { RestuarantDetails } from './RestuarantDetails';

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
          </Routes>
        </div>
      </div>
    </div>
  );
};
