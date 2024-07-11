import { Box, Card, CardContent, CardHeader, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import backgroundImage from '../../assets/images/Background_image.png';   
import RestaurantImage from '../../assets/images/Restaurant.jpeg'; 
import Rectangle from '../../assets/images/rect.png';  
import Map from '../../assets/images/map.png'; 

export const RestuarantDetails = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleRestaurantStatus = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <div 
      className='lg:px-20 px-5 pb-10'
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <div 
        className='lg:px-20 px-5'
        style={{
          backgroundImage: `url(${RestaurantImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: 'auto',
          minHeight: '60vh',
        }}
      ></div>
      <div>
      </div> 
      <div className="mi-0 py-5 flex justify-left items-center gap-3"> 
        <h1 className='text-xl lg:text-5xl text-center font-bold p-5 '>Hungry Restaurant</h1>

        <div>
          <Button color={isOpen ? "primary" : "error"} className='py-[1rem] px-[2rem]' variant='contained' onClick={handleRestaurantStatus} size='large'>
            {isOpen ? "Close" : "Open"}
          </Button>
        </div>
      </div>

      <Grid container spacing={1}>
        <Grid item xs={12}>
      <Box
      sx={{
        width: '100%',  
        height: 250,  
        borderRadius: 10,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        backgroundColor: 'rgba(64, 64, 64, 0.8)',  
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 2,
        alignContent:'center'
      }}
    >
            <CardHeader title={<span className='text-grey-300'>Restaurant</span>} />
            <CardContent>
              <div className='space-y-1 text-grey-200'>
                <div className='flex'>
                  <p className='w-48'>Owner</p>
                  <p className='text-grey-400'><span className='pr-5'>-</span>Mr.Shiwantha Dias</p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Restaurant Name</p>
                  <p className='text-grey-400'><span className='pr-5'>-</span>Hungry Restaurant</p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Cuisine Type</p>
                  <p className='text-grey-400'><span className='pr-5'>-</span>Sri Lankan</p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Opening Hours</p>
                  <p className='text-grey-400'><span className='pr-5'>-</span>6.00am-10.00pm</p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Status</p>
                  <p className='text-grey-400'>
                    <span className='pr-5'>-</span>
                    {isOpen ? <span className='px-5 py-2 rounded-full bg-[darkGreen] text-[#FFFFFF]'>Open</span> : <span className='px-5 py-2 rounded-full bg-gray-400 text-grey-950'>Closed</span>}
                  </p>
                </div>
              </div>
            </CardContent>
          </Box>
        </Grid>
      <Grid item xs={12}>
      <Box
      sx={{
        width: '100%',
        height: 250,
        borderRadius: 10,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        backgroundColor: 'rgba(64, 64, 64, 0.8)',
        display: 'flex',
        flexDirection: 'column', 
        textAlign: 'center',
        padding: 2,
        alignContent: 'left',
        backgroundImage: `url(${Rectangle})`,
        backgroundSize: '30% auto',  
        backgroundPosition: 'left', 
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div style={{ flex: '1', paddingLeft: '400px', alignContent:'left' }}>
           <h1 className='text-xl lg:text-3xl text-center font-bold p-5 '>About Us</h1>
          <p style={{ color: '#FFFFFF' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at
            mattis libero, vel gravida orci. Nulla facilisi.At Hungry Restaurant, we pride ourselves on delivering an
             unforgettable dining experience that tantalizes your taste buds and satisfies your cravings. Nestled in 
             the heart of
             our restaurant offers a cozy ambiance and a menu bursting with flavors from around the world.
          </p>
        </div>

    </Box>
        </Grid>
        <Grid item xs={12}  >
          <Box
      sx={{
        width: '100%',  
        height: 250,  
        borderRadius: 10,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        backgroundColor: 'rgba(64, 64, 64, 0.8)',  
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 2,
        alignContent:'center'
      }}>
            <CardHeader title={<span className='text-grey-300'>Address</span>} />
            <CardContent>
              <div className='space-y-1 text-grey-200'>
                <div className='flex'>
                  <p className='w-48'>Restaurant Name</p>
                  <p className='text-grey-400'><span className='pr-5'>-</span>Indian Fast Foods</p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Address</p>
                  <p className='text-grey-400'><span className='pr-5'>-</span>23/A, Yakkalamulla, Galle</p>
                </div>
                <div className='flex'>
                  <p className='w-48'>City</p>
                  <p className='text-grey-400'><span className='pr-5'>-</span>Yakkalamulla</p>
                </div>
                <div className='flex'>
                  <p className='w-48'>District</p>
                  <p className='text-grey-400'><span className='pr-5'>-</span>Galle</p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Postal Code</p>
                  <p className='text-grey-400'><span className='pr-5'>-</span>4053</p>
                </div>
              </div>
            </CardContent>
          </Box>
        </Grid>
        <Grid item xs={12}>
      <Box sx={{
        width: '100%',
        height: 250,
        borderRadius: 10,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        backgroundColor: 'rgba(64, 64, 64, 0.8)',
        display: 'flex',
        flexDirection: 'column', 
        textAlign: 'center',
        padding: 2,
        alignContent: 'left',
        backgroundImage: `url(${Map})`,
        backgroundSize: '45% 70%',  
        backgroundPosition: 'left', 
        backgroundRepeat: 'no-repeat',
      }}>
        <div style={{ flex: '1', paddingLeft: '500px', alignContent:'left' }}>
            <CardHeader title={<span className='text-grey-300'>Contact</span>} />
            <CardContent>
              <div className='space-y-1 text-grey-200'>
                <div className='flex'>
                  <p className='w-48'>Email</p>
                  <p className='text-grey-400'><span className='pr-5'>-</span>hungryrestaurant2001@gmail.com</p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Telephone-Fix</p>
                  <p className='text-grey-400'><span className='pr-5'>-</span>091-2920679</p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Telephone-Mobile</p>
                  <p className='text-grey-400'><span className='pr-5'>-</span>071-3124567</p>
                </div>
                <div className='flex items-center'> 
                  <div className='flex text-gray-400 items-center pb-3'>
                    <span className='pr-5'></span>
                    <a href='/'><InstagramIcon sx={{fontSize:"3rem"}} /></a>
                    <a href='/'><TwitterIcon sx={{fontSize:"3rem"}} /></a>
                    <a href='/'><FacebookIcon sx={{fontSize:"3rem"}} /></a>
                    <a href='/'><LinkedInIcon sx={{fontSize:"3rem"}} /></a> 
                  </div>
                </div>
              </div>
            </CardContent>
            </div>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};
