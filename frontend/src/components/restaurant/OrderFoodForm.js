import { Button, IconButton, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import theme, { Colours } from '../../assets/theme/theme';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import styled from '@emotion/styled';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import authHeader from "../../services/auth-header";
import axios from 'axios';

// ------------------for the side drawer----------
import Drawer from '@mui/material/Drawer';
import OrderSideDrawer from './OrderSideDrawer';

// ----------------for teh add to cart message-----------------
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';


// ---------------------------------text fied css style-----------------------
const AmountArea = styled(TextField)({
    background: Colours.secondary,
    margin: "auto",
    '& label': { color: Colours.green },
    '& label.Mui-focused': {
        color: Colours.green, //grren,

    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
        background: Colours.secondary,
        '& label': {
            color: Colours.green,
        },

    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: Colours.green, //green for border when not focus
        },
        '&:hover fieldset': {
            borderColor: 'yellow', //yellow for border when hover
            background: Colours.avatarWhite,
        },
        '&.Mui-focused fieldset': {
            borderColor: 'green',
        },
    },
});
// ---------------------------------------------------------------------


// -----------------cutomise drawer-------------------------------------
const SideDrawer = styled(Drawer)({
    '.MuiDrawer-paper': {
        background: Colours.gray3,
        borderRadius: "360px 0px 0px 360px",

    }
});
// -------------------------------------------------------------------------

const iconbutton = {
    color: Colours.green, '&:hover': {
        background: Colours.yellow,
    },
}

// ---------------for the add to cart message-------------------
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const OrderFoodForm = (props) => {

    console.log(props)
// 
    // -------------------to show the message---------------
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // --------------to setting up food count--------------------
    let [num, setNum] = useState(1);
    // var price = parseInt(props.orderdata.price);

    // console.log(props.Rid);
    var RID = props.Rid;

    // let [amount, setAmount] = useState(1);

    // console.log(amount);
    // to increment
    let incNum = () => {
        if (num < 10) {
            setNum(Number(num) + 1);
        }
    };
    // to drecement
    let decNum = () => {
        if (num > 1) {
            setNum(num - 1);
        }
    }

    let handleChange = (e) => {
        setNum(e.target.value);
    }

    // let handleAmount = (amount) => {
    //     // console.log(amount);
    //     setAmount(amount);
    // }

    // --------------------for the side drawe----------------------------------------------
    const [state, setState] = React.useState({ right: false });

    const toggleDrawer = (anchor, open) => (event) => {

        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    //   ------------------------------------------------------------------------------------

    var todayDate = new Date(); //Today Date    
    const Edate1 = props.EndDate;
    const eDate1 = new Date(Edate1);

    // --------------------------------sending data for cart-----------------------------
    const addToCart = () => {

        // ---------------item obj----------------------
        var price;
        if(num && todayDate < eDate1){
            price = (num * props.orderdata.price) - (num * props.orderdata.price * (props.orderdata.discount / 100));
        }
        else{
            price = (num * props.orderdata.price)
        }
        
        const Rid = RID;
        const Fid = props.orderdata.Fid;


        const orderItem = {
            "foodId": Fid,
            "quantity": num,
            "restaurantId": Rid,
            "price": price
        }

        const OrderData = new FormData();
        OrderData.append('item', orderItem);
        OrderData.append('price', price);
        OrderData.append('Rid', Rid);
        // -----------------------------------to getting food item details------------------------------------------
        const setOrderItem = async () => {
            try {
                const resp = await axios.post(`http://localhost:8072/FoodiFy/Service/setShoppingCart`, orderItem, { headers: authHeader() });

                // const details = resp.data;
                handleClickOpen();

                console.log("Entry Successful");
                // setItems([...items1]);
            } catch (err) {
                // Handle Error Here
                console.error(err);
            }
        };

        setOrderItem();

    };

    

    return (
        // ------------main box------------------
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            width: "65%",
            margin: "auto",
            marginRight: "25%",
            marginTop: "2%",
            [theme.breakpoints.down('sm')]: {
                marginRight: "20%",
            },
        }}>


            {/* ---------------------form area--------------- */}
            <Box
                component="form"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    padding: "1rem",
                    background: Colours.darkform,
                    borderRadius: "1rem",

                    '& .MuiTextField-root': { m: 1, width: '96%' },
                }}
                Validate
                autoComplete="off"
            >
                {/* -------food name------------- */}
                <Typography variant='h5' sx={{
                    color: Colours.green,
                    [theme.breakpoints.down('sm')]: {
                        fontSize: '14px',
                        padding: '2px',
                    },
                }}>
                    Amount to pay: Rs.
                    {(() => {
                        if (num && todayDate < eDate1) {
                            return (
                                // num*price
                                (num * props.orderdata.price) - (num * props.orderdata.price * (props.orderdata.discount / 100))
                                // handleAmount(num*price)
                            );
                        }
                    }
                    )()}
                    {(() => {
                        if (num && todayDate > eDate1) {
                            return (
                                // num*price
                                (num * props.orderdata.price)
                                // handleAmount(num*price)
                            );
                        }
                    }
                    )()}
                </Typography>

                {/* ---------------text area----------------- */}
                {/* --------------for forminputs--------- */}
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <IconButton onClick={incNum}><ExpandLessIcon style={iconbutton} /></IconButton>
                    <Box sx={{ width: "30%" }}><AmountArea name="quantity" id="amount" defaultValue="0" value={num} onChange={handleChange} label="Quantity" variant="outlined" /></Box>
                    <IconButton onClick={decNum}><ExpandMoreIcon style={iconbutton} /></IconButton>
                </Box>
                {/* -------------------end of inputs------------ */}


                {/* -----------------------------submit and cancel area--------------------------- */}
                <Box sx={{
                    marginTop: "1rem"
                }}>

                    {/* -------------------------to toggle side drawer------------------ */}
                    <React.Fragment key='right'>

                        <Button sx={{
                            margin: '0.5rem',
                            background: Colours.green, '&:hover': {
                                backgroundColor: Colours.yellow,
                            },
                            color: Colours.dark,
                            fontSize: '1rem',
                            hover: Colours.green,
                            borderRadius: "1rem",
                            [theme.breakpoints.down('sm')]: {
                                fontSize: '8px',
                                padding: '10px',
                            },
                        }} endIcon={<ShoppingBagIcon />} onClick={addToCart}>Add to cart</Button>

                        {/* onClick={toggleDrawer('right', true)} */}

                        {/* ---------------side drawer------------ */}
                        <SideDrawer
                            anchor={'right'}
                            open={state['right']}
                            onClose={toggleDrawer('right', false)}
                        >
                            <OrderSideDrawer />
                        </SideDrawer>
                        {/* ------------end of side drawer-------- */}

                    </React.Fragment>

                    {/* ------------------------end of side drawer------------------------ */}

                    {/* -----------------add to cart message---------------- */}
                    <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle>{"Item added to the cart Successfully!"}</DialogTitle>
                    </Dialog>
                    {/* -------------end of add to cart message------------- */}

                    <Button variant="contained" component={Link} to={"/Restaurant/Category"} sx={{
                        margin: '0.5rem',
                        background: Colours.grayWhite, '&:hover': {
                            backgroundColor: Colours.secondary,
                        },
                        color: Colours.dark,
                        fontSize: '1rem',
                        hover: Colours.green,
                        borderRadius: "1rem",
                        [theme.breakpoints.down('sm')]: {
                            fontSize: '8px',
                            padding: '10px',
                        },
                    }}>Cancel</Button>
                </Box>
                {/* ---------------------------------end of submit and cancel arae---------------------- */}


            </Box>
            {/* -----------------------end of form---------------- */}

        </Box>
        // ----------end of main box--------------
    )
}

export default OrderFoodForm
