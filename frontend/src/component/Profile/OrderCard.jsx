import React from 'react'
import {Card} from "@mui/material";
import {Button} from "@mui/material";


export const OrderCard =() =>{
  return (
    <Card style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
      <img
        style={{ height: '4rem', width: '4rem' }}
        src="https://img.onmanorama.com/content/dam/mm/en/food/in-season/Ramzan/Images/hyderabadi-dum-biryani.jpg.transform/576x300/image.jpg"
        alt=""
      />
      <div>
        <p>Biriyani</p>
        <p>$49</p>
      </div>
    </div>
    <Button style={{ cursor: 'not-allowed' }}>Completed</Button>
  </Card>
  )
}

export default OrderCard