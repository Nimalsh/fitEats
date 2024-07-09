import React, { useState, useEffect } from 'react';
import theme, { Colours } from '../../assets/theme/theme'; //to use theme provider,need to import this
import { Box, Button, ThemeProvider, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import '../../assets/css/App.css';

// -----------------importing comment box-----------
import CommentBox from './CommentBox';
import List from '@mui/material/List';

import AuthService from '../../services/auth-service';
import authHeader from "../../services/auth-header";
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

var ROLE = null;

// -------using props to put random images using props------------------------
const RestaurantCemments = (props) => {

//  console.log(props.comments)

  const data = props.comments;

  const rId = props.rId;

  const restaurantName = props.name;
  // console.log(data);
  const currentUser = AuthService.getCurrentUser();

  {/*------------------------------START SET USERTOLE-------------------------------------------------*/ }
  {
    (() => {
      if (JSON.parse(localStorage.getItem('ROLE'))) {
        ROLE = JSON.parse(localStorage.getItem('ROLE'))[0].authority;
        // console.log(ROLE)
      }
    }
    )()
  }
  {/*------------------------------END SET USERTOLE-------------------------------------------------*/ }

  // ----------------------for store response data----------------------
  const [details, setDetails] = useState({});

  const [itemData, setItemData] = useState(null);

  useEffect((event) => {

    // ---------------------for the restaurant view-------------------------------
    const sendGetRequest = async () => {
      try {
        const resp = await axios.get('http://localhost:8072/FoodiFy/Restaurant/getRestaurantCommentR', { headers: authHeader() });

        const details = resp.data;
        setDetails({ ...details });

        // console.log(details);
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    };

    // --------------------------check the user and get data------------------------------------------
    if (ROLE === "restaurant") {
      sendGetRequest();
    }
    else {
      const id = props.rId
      const itemData = new FormData();
      itemData.append('restaurantId', id);
      setItemData(itemData);
      // --------------------------for customer view--------------------------------------
      // const sendGetRequest2 = async () => {
      //   try {
      //     const resp = await axios.get(`http://localhost:8072/FoodiFy/Service/getRestaurantCommentC`,itemData);

      //     const details = resp.data;
      //     setDetails({ ...details });

      //     // console.log(details);
      //   } catch (err) {
      //     // Handle Error Here
      //     console.error(err);
      //   }
      // };

      // sendGetRequest2();

    }

  }, []);


  return (

    // About us main box-----------------------------------------------


    <ThemeProvider theme={theme}>

      <Box maxWidth='100%' sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        background: Colours.gray2,
        marginTop: '1rem',
        padding: '0rem',
        hieght: '5vh',
        [theme.breakpoints.down('sm')]: {
          fontSize: '10px',
          padding: '2px',
          flexDirection: 'column',
          justifyContent: 'center',
          justifyItems: 'center',
        }
      }}>
        {/* ---------------view button--------------------- */}
        {/* <Button sx={{
          margin: '0.5rem',
          marginBottom: 0,
          marginTop: 4,
          width: "15%",
          background: Colours.green, '&:hover': {
            backgroundColor: Colours.yellow,
          },
          color: Colours.dark,
          fontSize: '1rem',
          hover: Colours.green,
          borderRadius: "1rem",
          Width: "20%",
          [theme.breakpoints.down('sm')]: {
            fontSize: '8px',
            padding: '2px',
            width: "25%",
          },
        }}>View Comments</Button> */}

        {/*------------------------------START SET USERTOLE-------------------------------------------------*/}
        {(() => {
          if (JSON.parse(localStorage.getItem('ROLE'))) {
            ROLE = JSON.parse(localStorage.getItem('ROLE'))[0].authority;
            console.log(ROLE)
          }
        }
        )()}
        {/*------------------------------END SET USERTOLE-------------------------------------------------*/}

        {(() => {
          if (ROLE === "User" || ROLE ==="premiumUser") {
            return (
            <Button component={Link} to={"/Restaurant/RestaurantRating"} state={{ rid: rId , resName: restaurantName}} sx={{
              margin: '0.5rem',
              marginBottom: 0,
              marginTop: 4,
              width: "15%",
              background: Colours.yellow, '&:hover': {
                backgroundColor: Colours.green,
              },
              color: Colours.dark,
              fontSize: '1rem',
              hover: Colours.green,
              borderRadius: "1rem",
              Width: "20%",
              [theme.breakpoints.down('sm')]: {
                fontSize: '8px',
                padding: '2px',
                width: "25%",
              },
            }} endIcon={<EditIcon sx={{
              color: Colours.primary,
              [theme.breakpoints.down('sm')]: {
                '& svg': {
                  fontSize: "15px",
                }
              },
            }} />}>Add Comments
            </Button>
            );
          }
        }
        )()}

        {/* -------------------topic-------------------------------------------- */}
        <Typography variant="h4" gutterBottom component="div" sx={{
          color: Colours.green,
          justifyContent: 'center',
          textAlign: 'center',
          fontSize: '2rem',
          [theme.breakpoints.down('sm')]: {
            fontSize: '16px',
          }
        }}>
          Comments
        </Typography>
        {/* -------------------topic-------------------------------------------- */}

        {/* -----------------beginin of the comments----------------- */}
        <List
          sx={{
            width: '100%',
            maxWidth: '95%',
            margin: 'auto',
            marginBottom: '1rem',
            marginTop: '1rem',
            bgcolor: Colours.gray1,
            position: 'relative',
            overflow: 'auto',
            maxHeight: '40vh',
            borderRadius: '1rem',
            color: Colours.grayWhite,
            '& ul': { padding: 0 },
          }}>

          {data.map((items, index) => {
            return (

              <li>
                <ul>
                  <CommentBox comments={items} sx={{ margin: 'auto', padding: 0 }} />
                </ul>
              </li>


            );
          })}

          {/* <li>
            <ul> */}
          {/* <CommentBox comments={props.comments} sx={{ margin: 'auto', padding: 0 }} />
              <CommentBox comments={props.comments} sx={{ margin: 'auto', padding: 0 }} />
              <CommentBox comments={props.comments} sx={{ margin: 'auto', padding: 0 }} />
              <CommentBox comments={props.comments} sx={{ margin: 'auto', padding: 0 }} />
              <CommentBox comments={props.comments} sx={{ margin: 'auto', padding: 0 }} />
              <CommentBox comments={props.comments} sx={{ margin: 'auto', padding: 0 }} />
              <CommentBox comments={props.comments} sx={{ margin: 'auto', padding: 0 }} /> */}
          {/* </ul>
          </li> */}
        </List>
        {/* -----------------beginin of the comments----------------- */}

      </Box>

    </ThemeProvider >

  )
}

export default RestaurantCemments
