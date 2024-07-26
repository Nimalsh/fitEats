import React from 'react'
import RestaurantCard from '../Restaurant/RestaurantCard'
import { useSelector } from 'react-redux'

export default function Favorites() {
  const {auth}=useSelector(store=>store)
  return (
    <div>
       <h1 style={{ padding: '2rem 0', fontSize: '1.25rem', fontWeight: '600', textAlign: 'center' }}>
      My favourites
    </h1>
      <div className="flex flex-wrap gap-3 justify-center">

      {auth.favorites.map((item)=><RestaurantCard item={item}/>)}


       </div>


    </div>
  )
}

