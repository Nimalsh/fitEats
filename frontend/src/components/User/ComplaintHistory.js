import * as React from 'react';
import { Box, List } from '@mui/material';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import authHeader from '../../services/auth-header';
import axois from "axios";
import { Colours } from '../../assets/theme/theme';



function ComplaintHistory() {
  const [complainhis, setData2] = useState([]);
 // console.log(complainhis);
  const x = complainhis;

  useEffect((event) => {

    axois.get(`http://localhost:8072/FoodiFy/User/getCount/complainhistory`, { headers: authHeader() })
      .then(data => {
        // this part if sucess
        const details = data.data;
        setData2({ ...details });
        //console.log(details);
        // details.array.forEach(element => {
        //   Object.entries(element).forEach(([key , value]) => 

        // });




      })
      .catch(error => {
        console.log("There is an error");
      });

  }, []);
  // console.log("This is the compo");
  //  console.log(complainhis);
  // var complaint = complainhis[0];
  // console.log(complaint); // this is an object
  // console.log(Object.keys(complaint));
  // console.log(complaint[id]);



  // function renderRow(props) {
  //   const { index, style } = props;

  //   return (

  //   );
  // }

  return (

    <Box color="#fff" bgcolor="#171717" opacity="50" sx={{ mt: "2%", mb: "2%", ml: "5%", borderRadius: '20px', p: "2%", width: { lg: "45vw", xs: "55vw" } }} >

      <Typography variant="h4" mt="2%" gutterBottom sx={{ fontSize: { lg: "230%", xs: "180%" } }} >
        History of Complaints
      </Typography>

     
          <List dense={true} >
            {Object.keys(complainhis).map((keyName) => (
             
              <ListItem key={complainhis[keyName].id}>
                <ListItemText sx={{ color: Colours.green,height:"5%" }}
                  primary={complainhis[keyName].complainTitle + " "+"-"+ " " + complainhis[keyName].restaurantId}
                />
                {/* <ListItemText sx={{ color: Colours.formWhite,height:"5%" }}
                  primary={complainhis[keyName].restaurantId} 
                /> */}
              </ListItem>
            ))}
          </List>


      


    </Box>


  )
}

export default ComplaintHistory