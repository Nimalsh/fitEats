import React from 'react'
import { Box, Typography } from '@mui/material';
import RegisterBannerPremiumUser from '../../components/Register/RegisterBannerPremiumUser';
import '../../assets/css/Registeruser.css';
import theme, { Colours } from '../../assets/theme/theme';
import Skeleton from '@mui/material/Skeleton';
import Zoom from '@mui/material/Zoom'; //Zoom text
import Slide from 'react-reveal/Slide';
import { ThemeProvider } from '@mui/material/styles';

import Navbar from './../../components/Navbar';
import Fade from 'react-reveal/Fade';

const Signupuser = () => {
  return (
    <Box className='Registeruser-body-Style' >

        <Fade top>
          <Navbar />
        </Fade>

        <ThemeProvider theme={theme}>
        <Box maxWidth='100%' sx={{
        padding: '0',
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
      }}>
        {/* ------------------Register Part------------------------------- */}

        {/* Box 1 for Register */}
        <RegisterBannerPremiumUser />
        {/* Box 1 */}




        {/* Box 2 */}
        <Box sx={{
         
         height: 'auto',
         width:'100%',
         justifyContent: 'left',

         [theme.breakpoints.down('sm')]: {
           fontSize: '8px',
           padding: '2px',
           width: '100%',
         }
       }}>
        
          
             <Zoom in={true}>
                 
                 <Typography color="#95CD41" fontWeight="400" variant="h2" fontSize="500%"
                   sx= {{
                     marginTop: '20%',
                     marginLeft:'14%',
                    
                     [theme.breakpoints.down('md')]: {
                     fontSize: '200%',
                     
                   },
                   [theme.breakpoints.down('sm')]: {
                     fontSize: '230%'
                   }
                 }}
                 >
                   <Slide right>
                   Premium User
                   </Slide>
                   
                   <Slide left color="#FFF">
                  
                   Registration
                 
                   </Slide>
                  </Typography>
                 
           </Zoom>
           <Typography>
                  <Skeleton 
                     sx={{ backgroundColor:Colours.transparenceGrey, marginLeft:'55%'}}
                     variant="circular" width={140} height={140}/>
                 </Typography>
         
       
       </Box>
       {/* Box 2 */}

     </Box>    
       
     </ThemeProvider>
   </Box>
  )
}

export default Signupuser