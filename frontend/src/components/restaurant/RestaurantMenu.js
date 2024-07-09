import React, { useEffect } from "react";
import { Box } from '@mui/material';
import Carousel from '../carousel/carousel';

import axois from "axios";
import AuthService from '../../services/auth-service';

// -------to import forms------------
import MenuForm from './profile/MenuForm';
import authHeader from "../../services/auth-header";


// ----------------------for the caousel----------------------


const itemcount = 4;
const bgcolor1 = "theme.Colours.secondary";

var ROLE = null;

// ------------------------------------------------------------------------------


var Title = "Resturant Menu";
var resId = null;
var menuId = null;


const RestaurantMenu = (props) => {

  resId = props.rId;
  console.log(resId);

  const RestId = props.RestId;

  // ----------store restaurant values--------
  const [details, setDetails] = React.useState({});

  // ----------Get Category --------
  const [getCat, setgetCat] = React.useState(false);


  ///-- Get Token UserName--///
  const currentUser = AuthService.getCurrentUser();


  useEffect((event) => {

    if (JSON.parse(localStorage.getItem('ROLE'))) {
      ROLE = JSON.parse(localStorage.getItem('ROLE'))[0].authority;
      //console.log(ROLE)
    }
    else{
      ROLE = null;
    }
  
    if (ROLE === "restaurant") {

      axois.get("http://localhost:8072/FoodiFy/Restaurant/getFoodMenu", { headers: authHeader() })
        .then(data => {
          // this part if sucess
          //console.log(data.data[0].foodMenuName);
          //console.log(item1.foodMenuName);
          Title = data.data[0].foodMenuName;
          menuId = data.data[0].id;
          setgetCat(true);
        })
        .catch(error => {

          console.log(error);

        });
        

    }
    else {

      axois.get("http://localhost:8072/FoodiFy/AllUser/getFoodMenu/" + resId)
        .then(data => {
          // this part if sucess
          //console.log(data.data[0].foodMenuName);
          //console.log(item1.foodMenuName);
          Title = data.data[0].foodMenuName;
          menuId = data.data[0].id;
          setgetCat(true);
        })
        .catch(error => {

          console.log(error);

        });

    }



  }, []);


 if(getCat){

    axois.get("http://localhost:8072/FoodiFy/AllUser/getFoodCategory/" + menuId)
      .then(data => {
        //  console.log("work");
        const details = data.data;
        //   console.log(data);
        setDetails({ ...details });
      })
      .catch(error => {
        console.log(error);
      });

      setgetCat(false);

  }



  return (
    <Box sx={{
      position: 'relative',
      width: '100%',
      p: '0px',
    }}>

      {/*------------------------------START SET USERTOLE-------------------------------------------------*/}
      {(() => {
        if (JSON.parse(localStorage.getItem('ROLE'))) {
          ROLE = JSON.parse(localStorage.getItem('ROLE'))[0].authority;
          //console.log(ROLE)
        }
        else{
          ROLE = null;
        }
      }
      )()}
      {/*------------------------------END SET USERTOLE-------------------------------------------------*/}

      {(() => {
        if (ROLE === "restaurant") {
          return (
            <MenuForm />
          );
        }
      }
      )()}


      <Carousel item={details} title={Title} count={itemcount} bgcolour={bgcolor1} RestId = {RestId} />


    </Box>
  )
}

export default RestaurantMenu
