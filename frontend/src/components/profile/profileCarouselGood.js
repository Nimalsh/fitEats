import React, { useEffect } from 'react';

import { Box } from '@mui/material';
import PageTitle from '../../components/User/PageTitle';
import CardBar from './profile_card_bar';
import dash from '../../assets/images/profile_dash.png';


const MainHeader = "Healthy Foods";
const MainHeader2 = "Unhealthy Foods";
// const MainHeader3 = "My Details";



function Goodc() {



    const data1 = [

        [  "Pizza",  "Sugar 16g" , dash ],
        [  "Pizza",  "Sugar 16g" , dash ],
        [  "Pizza",  "Sugar 16g" , dash ],
        [  "Pizza",  "Sugar 16g" , dash ],
        [  "Pizza",  "Sugar 16g" , dash ],
      
      ];


      const data2 = [
        [  "Pizza",  "Sugar 16g" , dash ],
        [  "Pizza",  "Sugar 16g" , dash ],
        [  "Pizza",  "Sugar 16g" , dash ],
        [  "Pizza",  "Sugar 16g" , dash ],
        [  "Pizza",  "Sugar 16g" , dash ],
      

       

      
      ];

      
    
    useEffect(() => {
        document.title = "";
    })

  return (
    <Box>

         <PageTitle MainHeader = {MainHeader}/>
         
         <Box sx={{mt:"3%", mb:"2%"}}>
          <CardBar details = {data1} />
         </Box>

         <PageTitle MainHeader = {MainHeader2}/>
          <Box  marginTop="3%" >
          <CardBar details = {data2} />
         </Box> 

         {/* <PageTitle MainHeader = {MainHeader3}/>
         <Box  marginTop="3%" >
          <p>nfsdfsdfjdbdfkv fdkvbf</p>
         </Box>  */}

        

    </Box>
  )
}

export default Goodc