import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { RestuarantForm1 } from '../RestaurantComponent/RestaurantForm/RestuarantForm1'
import {Restaurant} from '../RestaurantComponent/Restaurant/Restaurant'

const RestaurantRoute = () => {
  return (
    <div>
        <Routes>
            <Route path='/*'element={false?<RestuarantForm1/>:<Restaurant/>}>

            </Route>

        </Routes>
    </div>
  )
}

export default RestaurantRoute
