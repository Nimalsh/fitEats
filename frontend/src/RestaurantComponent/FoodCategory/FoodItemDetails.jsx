import React from 'react';
import { useParams } from 'react-router-dom';
import { CardHeader, Typography, Box } from '@mui/material';
import { foodItems } from './FoodItemsByCategory';
import BackgroundImage from '../../assets/images/item.png';
import PieChart from '../../assets/images/piechart.jpg';
import StorefrontIcon from '@mui/icons-material/Storefront';

export const FoodItemDetails = () => {
  const { foodItemId } = useParams();
  const item = Object.values(foodItems).flat().find(item => item.id === parseInt(foodItemId));

  if (!item) {
    return <Typography variant="h4">Food Item Not Found</Typography>;
  }

  return (
    <div
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '16px',
        display: 'flex',
        flexDirection: 'row', 
        justifyContent: 'center',
        width:'100%'
      }}
    >

      <div>
      <CardHeader className=' mt-2'
        title={
          <Box>
            <Typography variant="h4" component="div" sx={{ fontSize: '2rem', display: 'flex', alignItems: 'center' }}>
              <StorefrontIcon className='mr-2' sx={{ fontSize: '2rem' }} />Food Details
            </Typography>
            <Box sx={{ borderBottom: '2px solid white', width: '90px' }} />
          </Box>
        }
        sx={{ pt: 2, alignItems: "center" }}
      />
      </div>

    <div style={{flexDirection:'column', width:'30%'}}  >  
      <div
        style={{
          backgroundColor: 'rgba(64, 64, 64, 0.8)',
          borderRadius: '10px',
          padding: '16px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', 
          textAlign: 'center',
          margin : '20px',
          height: '60%'
        }}
      >
      <CardHeader
          title={<span style={{ fontSize: '30px', fontWeight:'bold', alignContent:'end' }}>{item.name}</span>}
          sx={{ pt: 2, alignItems: 'center', color: 'white'}}
      />

        <img
          src={item.image}
          alt="Food Item"
          style={{ width: 200, height: 150, borderRadius: '50px', boxShadow: '0 12px 24px rgba(255, 255, 255, 0.5)' }}
        />
        
        <button
          type="button"
          className="button details-button" 
          sx={{width:'50%', marginTop:'30px'}}
        >
          {item.price}
        </button> 
        <Typography variant="h5" style={{ color: 'white', marginTop: '16px' }}>Size : {item.size}</Typography>
      </div>

      <div
        style={{
          backgroundColor: 'rgba(64, 64, 64, 0.8)',
          borderRadius: '10px',
          padding: '16px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', 
          textAlign: 'center',
          margin : '20px',
          height: '20%'
        }}
      >
        <Typography variant="body1" style={{ color: 'white', marginTop: '8px' }}>{item.description} Spicy chicken with cheese and chili toppings, offering a delightful burst of flavors. Perfectly seasoned this dish is a must-try for spicy food lovers.</Typography>
      </div>

    </div>  

  <div
  style={{
    backgroundColor: 'rgba(64, 64, 64, 0.8)',
    borderRadius: '10px',
    padding: '16px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '40%',
    textAlign: 'center',
    margin: '20px',
  }}
>

      <CardHeader
          title={<span style={{ fontSize: '30px', fontWeight:'bold', alignContent:'end' }}>Nutritions</span>}
          sx={{ pt: 2, alignItems: 'center', color: 'white', marginTop:'7%', alignSelf:'left'}}
      />

  <div style={{ width: '100%', height: '50%', display: 'flex', flexDirection: 'column', gap: '10px',marginTop:'2%' }}>
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div className="nutritions-button" >100g Calories</div>
      <div className="nutritions-button">200g Carboh</div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div className="nutritions-button">5g Protein</div>
      <div className="nutritions-button">10g Sugar</div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div className="nutritions-button">20g Fat</div>
      <div className="nutritions-button">50g Vitamins</div>
    </div>
  </div>
  <div style={{ height: '50%', justifyItems:'center', display:'flex'  }}>
        <img
          src={PieChart}
          alt="Food Item"
          style={{ width: 150, height: 150, borderRadius: '50%'  }}
        />
  </div>
</div>


    </div>
  );
};
