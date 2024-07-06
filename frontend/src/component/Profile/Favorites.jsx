import React from 'react'
import RestaurantCard from '../Restaurant/RestaurantCard'

export default function Favorites() {
  return (
    <div>
       <h1 style={{ padding: '2rem 0', fontSize: '1.25rem', fontWeight: '600', textAlign: 'center' }}>
      My favourites
    </h1>
      <div className="flex flex-wrap gap-3 justify-center">

      {[1,1,1,1].map((item)=><RestaurantCard/>)}


       </div>


    </div>
  )
}

