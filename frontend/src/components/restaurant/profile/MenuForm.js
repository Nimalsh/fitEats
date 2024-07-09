import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Button, TextField } from '@mui/material';
import theme, { Colours } from '../../../assets/theme/theme';
import Slide from '@mui/material/Slide';
import styled from '@emotion/styled';

import axios from "axios";
import authHeader from "../../../services/auth-header";
import { Link } from 'react-router-dom';



// ----------for the transition of the form------------
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


// -----------Single Line Textfield------------------------------
export const CustomTextField = styled(TextField)(({ theme }) => ({
    margin: "auto",
    marginTop: "0.6rem",
    width: "95%",
    '& 	.MuiInputLabel-root': {
        color: Colours.primary,
    },
    '& label.Mui-focused': {
        color: '#95CD41',
        fontcolor: Colours.green,
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#95CD41',
    },
    '& .MuiLabel': {
        color: Colours.grayWhite,
    },

    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: Colours.primary, //white for borders when not focused
            color: Colours.grayWhite,
        },
        '&:hover fieldset': {
            borderColor: '#FAC213', //yellow border when hovering
            color: Colours.yellow,
        },
        '&.Mui-focused fieldset': {
            borderColor: '#95CD41', //green border when foucs
        },
    },
}));


function MenuForm() {

    const [open, setOpen] = React.useState(false);

    // -------------initial states for fields---------------------------
    const initialValues = { foodMenuName: "", foodMenuDes: "" };

    // ----------create state name form values--------
    const [formValues, setFormValues] = React.useState(initialValues);

    // ----------create state name form errors--------
    const [formErrors, setFormErrors] = React.useState({});

    // -------------usestate for submit form-----------
//    const [isSubmit, setIsSubmit] = React.useState(false);



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = {};

        // creating menu object
        const restaurantmenu = {
            foodMenuName: formValues.foodMenuName,
            foodMenuDes: formValues.foodMenuDes
        }

        axios.post("http://localhost:8072/FoodiFy/Restaurant/addFoodMenu", restaurantmenu, { headers: authHeader() })
        .then(data => {
            setFormValues(initialValues);
            setOpen(false);
        })
        .catch(error => {
             errors.exists = error.response.data;
             setFormErrors(errors);

        })

    }

    // -------function to handle changes in the input fields and set it to formvalues----------
    const handleChange = (e) => {

        // destructuring inputfield
        const { name, value } = e.target;
        // get the relavant name as key and assign value to it
        setFormValues({ ...formValues, [name]: value });


    }

    return (

        <Box sx={{
            width: "90%",
            marginTop: 4,
            [theme.breakpoints.down('sm')]: {
                marginTop: 0.4,
            },
        }} >

            <Button onClick={handleClickOpen} sx={{
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
            }}>Add Food Menu
            </Button>


            <Button component={Link} to={'/AddFoodMenu'} sx={{
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
            }}>Add Food Category
            </Button>


            {/* ---------------------------form------------------------- */}
            <Dialog
                open={open}
                keepMounted
                TransitionComponent={Transition}

            >
                <DialogTitle>{"Add Food Menu"}</DialogTitle>
                <DialogContent>
                    <Box component="form"
                        noValidate
                        autoComplete="off">

                        <CustomTextField id="foodMenuName" label="Food Menu Name" name="foodMenuName" variant="outlined"

                            value={formValues.foodMenuName}
                            onChange={handleChange}
                            {...(formErrors.exists && { error: true, helperText: formErrors.exists})}

                        />


                        <CustomTextField
                            id="foodMenuName"
                            label="About Food Menu"
                            name="foodMenuDes"
                            variant="outlined"
                            multiline rows={8}

                            value={formValues.foodMenuDes}
                            onChange={handleChange}
                            {...(formErrors.exists && { error: true, helperText: formErrors.exists})}

                        />

                        <Box>
                            <Button onClick={handleSubmit} sx={{
                                margin: '0.5rem',
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
                                },
                            }}>Add</Button>

                            <Button onClick={handleClose} sx={{
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
                                    padding: '2px',
                                },
                            }}>Cancel</Button>
                        </Box>

                    </Box>
                </DialogContent>
            </Dialog>

        </Box>

    )
}

export default MenuForm