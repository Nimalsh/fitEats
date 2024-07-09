
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import EditAboutUs from './EditAboutUs';
import RestaurantOffers from '../RestaurantOffers';
import RestaurantMenu from '../RestaurantMenu';
import RestaurantEditContact from './RestaurantEditContact';
import RestaurantComment from '../RestaurantComments';
import { useLocation } from 'react-router-dom';

import axios from 'axios';
import authHeader from "../../../services/auth-header";

import AboutImage from '../../../assets/images/golden-cutlery.jpg';//exporting the image for about section
import Map from '../../../assets/images/GoogleMapTA.webp';
import axois from "axios";

// for scroll reveals
import Fade from 'react-reveal/Fade';

// to collect the description imformation
// const details = {
//   "detail1" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quosblanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eumquasi quidem quibusdam.",
//   "detail2" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quosblanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eumquasi quidem quibusdam.",
//   "detail3" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quosblanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eumquasi quidem quibusdam.",
// }

// to collect the description imformation
const details = {
  "detail1": "One of Sri Lankan's most beloved restaurants,",
  "detail2": "Bojun Hut has welcomed guests to enjoy its contemporary Sri Lankan cuisine, warm hospitality, and unparalleled service in Colombo City for over two decades.",
  "detail3": " Chef Michael Anthony's ever-evolving seasonal menu showcases the restaurant's relationships with local farms and purveyors.",
}

const contactdetails = {
  "Location": "Location",
  "Address": "Address",
  "TpNumber": "Tp Number",
}

// const comments = {
//   "name": "username",
//   "detail1": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quosblanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eumquasi quidem quibusdam.",
// }

const comments1 = [
  {
    "name": "Navod",
    "detail1": "This is a good restaurant",
  },
  {
    "name": "Sankalpa98",
    "detail1": "This place has good hospitality",
  },
  {
    "name": "Nisheda",
    "detail1": "This place provides good service",
  },
  {
    "name": "Shehan21",
    "detail1": "This offers food with exelent quality",
  },
  {
    "name": "Jane",
    "detail1": "This is a good restaurant",
  }
]

const RestaurantHome = () => {
  const location = useLocation();
  var id = null;
  // var Rid= location.state.id;
  if (location.state != null) {
    id = location.state.id;
  } else {
    id = JSON.parse(localStorage.getItem('RestId'));
  }
  const [AboutUs, setAboutUs] = useState(null);

  const [RestId, setRestId] = useState(null);

  const [ContactDetails, setContactDetails] = useState(null);
  const [Data2, setData2] = useState([]);
  // ---------------for get restaurant data------------------------
  useEffect(() => {

    axios.get("http://localhost:8072/FoodiFy/Restaurant/GetRestaurantInfo", { headers: authHeader() })
      .then(data => {
        // console.log(data)

        setRestId(data.data.id)

        if(data.data.about !== null){

          const details1 = {
            "detail1": data.data.about,
            "detail2": "",
            "detail3": "",
          }

          setAboutUs(details1)
        }
        

        
        if(data.data.location !== null && data.data.address !== null && data.data.telephone !== null){

          const contactdetails1 = {
            "Location": data.data.location,
            "Address": data.data.address,
            "TpNumber": data.data.telephone,
          }
  
          setContactDetails(contactdetails1)
          
        }
        
  
      }).catch(err => console.log(err));
  }, []);

  useEffect((event) => {
    axois.get(`http://localhost:8072/FoodiFy/AllUser/getRestaurantComment/${id}`)
      .then(data => {
        // this part if sucess
        // console.log(data.data);
        // setRestId(data.data.id)
        setData2(data.data)
      })
      .catch(error => {

      });

  }, []);

  localStorage.setItem("RestId", JSON.stringify(RestId));

  const comments1 = {
    "name": Data2.userName,
    "detail1": Data2.commentDescription
    ,
  }
  return (
    <Box>

      <Fade left>
        <EditAboutUs AboutImage={AboutImage} details={AboutUs !== null ? AboutUs : details} />
      </Fade>

      <Fade right>
        <RestaurantOffers />
      </Fade>

      <Fade bottom>
        <RestaurantMenu RestId = {RestId}/>
      </Fade>

      <Fade big>
        <RestaurantComment comments={Data2} />
      </Fade>

      <Fade left>
        <RestaurantEditContact Map={Map} details={ContactDetails !== null ? ContactDetails : contactdetails} />
      </Fade>

    </Box>
  )
}

export default RestaurantHome
