import { Card, CardContent, CardHeader, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import React,{useState} from 'react';
import InstegramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import FacebookIcon from '@mui/icons-material/Facebook'

export const RestuarantDetails = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleRestaurantStatus = () => {
    setIsOpen(prevState => !prevState);

  }

  return (
    <div className='lg:px-20 px-5 pb-10'>
      <div className="py-5 flex justify-center items-center gap-3">

        <h4 className='text-2xl lg:text-7xl text-center font-bold p-5'>Indian Fast Food</h4>

        <div>
          <Button color={true?"primary":"error"} className='py-[1rem] px-[2rem]' variant='contained' onClick={handleRestaurantStatus} size='large'>
            {isOpen?"close":"Open"}
          </Button>
        </div>
      </div>

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={<span className='text-grey-300'>Restaurant</span> }/>

            <CardContent>
              <div className='space-y-1 text-grey-200'>
                <div className='flex'>
                  <p className='w-48'>Owner</p>
                  <p className='text-grey-400'> 
                    <span className='pr-5'>-</span>
                     Shiwantha Dias 
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Restaurant Name</p>
                  <p className='text-grey-400'> 
                    <span className='pr-5'>-</span>
                     Shiwantha Dias 
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Cuisine Type</p>
                  <p className='text-grey-400'> 
                    <span className='pr-5'>-</span>
                     Shiwantha Dias 
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Opening Hours</p>
                  <p className='text-grey-400'> 
                    <span className='pr-5'>-</span>
                     Shiwantha Dias 
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Status</p>
                  <p className='text-grey-400'> 
                    <span className='pr-5'>-</span>
                    {isOpen?<span className='px-5  py-2 rounded-full bg-green-400 text-grey-950'>Open</span> : <span className='px-5  py-2 rounded-full bg-#808080-400 text-grey-950'>Closed</span>}
                  </p>
                   
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title={<span className='text-grey-300'>Address</span> }/>

            <CardContent>
              <div className='space-y-1 text-grey-200'>
                <div className='flex'>
                  <p className='w-48'>Restauran Name</p>
                  <p className='text-grey-400'> 
                    <span className='pr-5'>-</span>
                     Indian Fast Foods
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Address</p>
                  <p className='text-grey-400'> 
                    <span className='pr-5'>-</span>
                     23/A,Yakkalamulla,Galle 
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>City</p>
                  <p className='text-grey-400'> 
                    <span className='pr-5'>-</span>
                     Yakkalamulla 
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Distric</p>
                  <p className='text-grey-400'> 
                    <span className='pr-5'>-</span>
                     Galle 
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Postal Code</p>
                  <p className='text-grey-400'> 
                    <span className='pr-5'>-</span>
                     4053 
                  </p>       
              </div>
            </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title={<span className='text-grey-300'>Contact</span> }/>

            <CardContent>
              <div className='space-y-1 text-grey-200'>
                <div className='flex'>
                  <p className='w-48'>Email</p>
                  <p className='text-grey-400'> 
                    <span className='pr-5'>-</span>
                     Shiwantha Dias 
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Telephone-Fix</p>
                  <p className='text-grey-400'> 
                    <span className='pr-5'>-</span>
                     Shiwantha Dias 
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Telephone-Mobile</p>
                  <p className='text-grey-400'> 
                    <span className='pr-5'>-</span>
                     Shiwantha Dias 
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Social</p>
                  <div>
                    <span className='pr-5'></span>
                    <a href='/'>
                    <InstegramIcon sx={{fontSize:"3rem"}} />
                    </a>
                  </div>
                </div> 
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
    
  )

}