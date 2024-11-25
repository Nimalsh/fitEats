import React, { useEffect } from 'react';
import { Avatar, Box, Button, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import theme, { Colours } from '../../assets/theme/theme';

import FoodItem1 from '../../assets/images/profile_dash.png';
import FoodItem2 from '../../assets/images/plate1.jpg';
import TakeoutDiningIcon from '@mui/icons-material/TakeoutDining';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Link } from 'react-router-dom';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import authHeader from "../../services/auth-header";

// ---------this is temp-------
const items = [

    {
        id: "foodId",
        name: "Name of the food 1",
        quantity: 1,
        img1: { FoodItem1 },
    },
    {
        id: "foodId",
        name: "Name of the food 2",
        quantity: 2,
        img1: { FoodItem2 },
    },
]

const OrderSideDrawer = (anchor) => {

    // ------------drawer function------------------
    const [state, setState] = React.useState({ right: false });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    // ----------------------for store food response data----------------------
    const [details1, setDetails1] = React.useState({});

    // ----------------------for store quantity response data----------------------
    const [details2, setDetails2] = React.useState({});

    // ----------------------for store price response data----------------------
    const [price, setPrice] = React.useState(0);
// 
    var price1 = 0; 

    // -------------------to call shop cart data-----------------------------

    useEffect(() => {

        // -----------------------------------to getting food item details------------------------------------------
        const getOfferDetails = async () => {
            try {
                const respOffer = await axios.get(`http://localhost:8072/FooddiFy/Service/getShoppingCart`, { headers: authHeader() });

                const details = respOffer.data;
                const foodItems = details.foodItems;
                const quantityList = details.quantityList;
                const price = details.price;
                price1 = details.price;

                // console.log(details);
                // console.log(foodItems);
                // console.log(quantityList);

                setDetails1([...foodItems]);
                setDetails2([...quantityList]);
                setPrice(price);
            } catch (err) {
                // Handle Error Here
                console.error(err);
            }
        };

        getOfferDetails();

        // --------calling items for cart---------------


    }, []);

    const deleteCartItem = (event, index) => {

        // console.log(index);
        
        // -----------------------------------to getting food item details------------------------------------------
        axios.get(`http://localhost:8072/FooddiFy/Service/deleteCartItem/${index}`,{ headers: authHeader() })
            .then(data => {

                const details = data.data;
                const foodItems = details.foodItems;
                const quantityList = details.quantityList;
                const price = details.price;
                price1 = details.price;

                // console.log(details);
                // console.log(foodItems);
                // console.log(quantityList);

                setDetails1([...foodItems]);
                setDetails2([...quantityList]);
                setPrice(price);

            })
            .catch(error => {
                console.error(error);
                // console.log(restaurantAbout)
                // console.log("There is an error")

            })


        // const getOfferDetails = async () => {
        //     try {const respOffer = await axios.get(`http://localhost:8072/FooddiFy/Service/deleteCartItem/${index}`, { headers: authHeader() });

        //         const details = respOffer.data;
        //         const foodItems = details.foodItems;
        //         const quantityList = details.quantityList;
        //         const price = details.price;
        //         price1 = details.price;

        //         console.log(details);
        //         console.log(foodItems);
        //         console.log(quantityList);

        //         setDetails1([...foodItems]);
        //         setDetails2([...quantityList]);
        //         setPrice(price);
        //     } catch (err) {
        //         // Handle Error Here
        //         console.error(err);
        //     }
        // };

        // getOfferDetails();

        
    };
    // ---------------------------------------------------------------------

    // console.log(price);

    return (

        <Box
            sx={{
                width: "40rem",
                background: Colours.gray1,
                opacity: 0.8,
                borderRadius: "0px 0px 360px 360px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "1rem",
            }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            {/* ----------topic----------- */}
            <Typography variant='h4' sx={{
                margin: "auto",
                marginTop: "2rem",
                color: Colours.primary,
            }}>
                Restaurant name
            </Typography>

            <Divider sx={{ width: "70%", color: Colours.primary, margin: "auto" }} />

            {/* -------------add more---------------- */}
            <Button variant="contained" sx={{
                background: Colours.grayWhite, '&:hover': {
                    backgroundColor: Colours.secondary,
                },
                color: Colours.dark,
                fontSize: '1rem',
                hover: Colours.green,
                borderRadius: "1rem",
                width: "30%",
                margin: "auto",
                marginTop: "1rem",
                [theme.breakpoints.down('sm')]: {
                    fontSize: '8px',
                    padding: '2px',
                },
            }} startIcon={<AddShoppingCartIcon />} >Add more</Button>
            {/* -----------end of add more------------ */}

            {/* -------food list----------- */}
            {/* need to map when real data calling */}
            <List sx={{
                width: "70%",
                margin: "auto",
            }}>
                {
                    Array.from(details1).map((item, index) => {
                        // console.log(index);
                        return (
                            <ListItem key={item.id}>

                                <ListItemIcon>
                                    <TakeoutDiningIcon />
                                </ListItemIcon>

                                <ListItemText>Quantity:{details2[index]}</ListItemText>
                                <ListItemText>{item.name}</ListItemText>

                                {/* {console.log(item.foodimage)} */}

                                <ListItemAvatar key={item}>
                                    <Avatar
                                        alt="food image"
                                        src={`data:image/jpeg;base64,${item.image.data}`}
                                        sx={{
                                            border: "2px solid #EFEAEA",
                                            [theme.breakpoints.down('sm')]: {

                                            },
                                        }} />
                                </ListItemAvatar>

                                <ListItemButton onClick={event => deleteCartItem(event,index)} sx={{ borderRadius: "100%", width: "10%" }}>
                                    <CancelIcon />
                                </ListItemButton>

                            </ListItem>
                        )

                    })
                }
            </List>
            {/* -------------------end of the list------------------- */}

            {/* ---------------checkout button-------------------- */}
            <Button variant="contained" component={Link} to={"/Restaurant/Category/Orderfood/userorder"} sx={{
                margin: 'auto',
                marginTop: "1rem",
                width: "60%",
                background: Colours.green, '&:hover': {
                    backgroundColor: Colours.yellow,
                },
                color: Colours.dark,
                fontSize: '1rem',
                hover: Colours.green,
                borderRadius: "1rem",
                [theme.breakpoints.down('sm')]: {
                    fontSize: '8px',
                    padding: '2px',
                },
            }} endIcon={<ShoppingCartCheckoutIcon />} >Chechout Rs.{price}</Button>
        </Box>
    )
}

export default OrderSideDrawer
