import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Box, Button, IconButton, TextField } from '@mui/material';
import theme, { Colours } from '../../../assets/theme/theme';
import EditIcon from '@mui/icons-material/Edit';
import styled from '@emotion/styled';
import axios from 'axios';
import authHeader from "../../../services/auth-header";
import { useNavigate } from 'react-router-dom';

// ---------------for map---------------------
// import LocationMapForm from '../LocationMapForm';

// ----------for the transition of the form------------
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// -----------update button-------------------------------
export const UpdateButton = styled(Button)(({ theme }) => ({
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
}));

// -----------cancel button-------------------------------
export const CancelButton = styled(Button)(({ theme }) => ({
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
}));

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


// -----------------form1 update cover image----------------------------------
export const BannerForm1 = () => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //  --------------------for preview the image------------------
   // const [imagePreview, setImagePreview] = useState(null);
    // ----------------sending image for the backend--------------
   // const [imageData, setImageData] = useState(null);

    //const [imageName, setImageName] = useState("");
    // --------keep the image name from the back end--------------------

    return (

        <Box sx={{
            width: "100%",
            marginTop: 0,
            [theme.breakpoints.down('sm')]: {
                width: "90%",
            },
        }} >
            <IconButton sx={{
                marginLeft: "98%",
                background: Colours.yellow, '&:hover': {
                    backgroundColor: Colours.green,
                },
                color: Colours.green,
                [theme.breakpoints.down('sm')]: {
                    '& svg': {
                        fontSize: "15px",
                    }
                },

            }} onClick={handleClickOpen} >
                <EditIcon sx={{
                    color: Colours.dark,
                }} />
            </IconButton>

            {/* ---------------------------form------------------------- */}
            <Dialog
                open={open}

                keepMounted
                TransitionComponent={Transition}

            >
                <DialogTitle>{"Update Cover Image"}</DialogTitle>
                <DialogContent>
                    <Box component="form"
                        noValidate
                        autoComplete="off">

                        <TextField type="file" name='image' />

                        <Box>
                            <UpdateButton type='submit'>Update</UpdateButton>
                            <CancelButton onClick={handleClose}> Cancel </CancelButton>
                        </Box>

                    </Box>
                </DialogContent>
            </Dialog>

        </Box>

    )
};
// ------------------end of form 1----------------------------------

// ----------------banner form 2----------------------------------
export const BannerForm2 = () => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    return (

        <Box sx={{
            width: "10%",
            marginTop: 4,
            [theme.breakpoints.down('sm')]: {
                marginTop: 0.4,
            },
        }} >
            <IconButton sx={{
                background: Colours.yellow, '&:hover': {
                    backgroundColor: Colours.green,
                },
                color: Colours.green,
                [theme.breakpoints.down('sm')]: {
                    '& svg': {
                        fontSize: "15px",
                    }
                },

            }} onClick={handleClickOpen} >
                <EditIcon sx={{
                    color: Colours.dark,
                }} />
            </IconButton>

            {/* ---------------------------form------------------------- */}
            <Dialog
                open={open}
                keepMounted
                TransitionComponent={Transition}

            >
                <DialogTitle>{"Update Logo and name"}</DialogTitle>
                <DialogContent>
                    <Box component="form"
                        noValidate
                        autoComplete="off">

                        <CustomTextField id="restaurant_name" label="Restaurant_name" name="restaurant_name" variant="outlined" />
                        <CustomTextField type="file" name='image' />

                        <Box>
                            <UpdateButton type='submit'>Update</UpdateButton>
                            <CancelButton onClick={handleClose}> Cancel </CancelButton>
                        </Box>

                    </Box>
                </DialogContent>
            </Dialog>

        </Box>

    )
};


// ----------------aboutus form----------------------------------
export const AboutUsForm = () => {
    const initialValues = { about: "" };
    const [formValues, setFormValues] = React.useState(initialValues);
    const [formErrors, setFormErrors] = React.useState({});

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });

        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const restaurantAbout = {
        about: formValues.about,
    }



    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const restaurantAbout = {
            about: data.get('about_description')
        }

        axios.post("http://localhost:8072/FoodiFy/Restaurant/editAboutUs", restaurantAbout, { headers: authHeader() }).then(data => {
            console.log("Entry access sucessfull")
            window.location.reload(false);
            setOpen(false);

        })
            .catch(error => {
                console.log(restaurantAbout)
                console.log("There is an error")

            })
    }



    return (

        <Box sx={{
            width: "10%",
            marginTop: 1,
            [theme.breakpoints.down('sm')]: {
                marginTop: 0.4,
            },
        }} >
            <IconButton sx={{
                background: Colours.yellow, '&:hover': {
                    backgroundColor: Colours.green,
                },
                color: Colours.green,
                [theme.breakpoints.down('sm')]: {
                    '& svg': {
                        fontSize: "15px",
                    }
                },

            }} onClick={handleClickOpen} >
                <EditIcon sx={{
                    color: Colours.dark,
                }} />
            </IconButton>

            {/* ---------------------------form------------------------- */}
            <Dialog
                open={open}
                keepMounted
                TransitionComponent={Transition}
                fullWidth='100%'

            >
                <DialogTitle>{"Update Description"}</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleSubmit}
                        noValidate
                        autoComplete="off">

                        <CustomTextField
                            id="about_description"
                            label="about_description"
                            name="about_description"
                            variant="outlined"
                            multiline rows={8} />

                        <Box>
                            <UpdateButton type='submit'>Update</UpdateButton>
                            <CancelButton onClick={handleClose}> Cancel </CancelButton>
                        </Box>

                    </Box>
                </DialogContent>
            </Dialog>

        </Box>

    )
};


// ----------------contact details form-------------------------------------------------------------------------------------
export const ContactForm = () => {

    const navigate = useNavigate();


    const [open, setOpen] = React.useState(false);

    // ----------------initial values
    let [restaurant, setRestaurant] = React.useState({
        location: "",
        address: "",
        telephone: ""
    });


    //------------------assign input values to the variables
    const handleClickOpen = (e) => {
        setRestaurant({ ...restaurant, [e.target.location]: e.target.value });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    // const { location, address, telephone} = restaurant;

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        const restaurantInfo = {
            location: data.get('location'),
            address: data.get('address'),
            telephone: data.get('tpnumber')
        }

        console.log({
            restaurantInfo
        });

        axios.post("http://localhost:8072/FoodiFy/Restaurant/editContact", restaurantInfo, { headers: authHeader() })
            .then(data => {
                console.log("Entry access sucessfull")
                window.location.reload(false);
                setOpen(false);

            })
            .catch(error => {
                console.log("There is an error")

            })
    };

    return (

        <Box sx={{
            width: "10%",
            marginTop: 1,
            marginLeft: "92%",
            [theme.breakpoints.down('sm')]: {
                marginTop: 0.4,
                marginLeft: "88%",
            },
        }} >
            <IconButton sx={{
                background: Colours.yellow, '&:hover': {
                    backgroundColor: Colours.green,
                },
                color: Colours.green,
                [theme.breakpoints.down('sm')]: {
                    '& svg': {
                        fontSize: "15px",
                    }
                },

            }} onClick={handleClickOpen} >
                <EditIcon sx={{
                    color: Colours.dark,
                }} />
            </IconButton>

            {/* ---------------------------form------------------------- */}
            <Dialog
                open={open}
                keepMounted
                TransitionComponent={Transition}

            >
                <DialogTitle>{"Update Contact details"}</DialogTitle>
                <DialogContent>

                    {/* <LocationMapForm
                        
                        center={{ lat:6.92 , lng: 79.86 }}
                        zoom={15}
                        sx={{height:"10rem"}}
                    /> */}
                    <Box component="form"
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit}>

                        <CustomTextField id="location" label="Location" name="location" variant="outlined" />
                        <CustomTextField id="address" label="Address" name="address" variant="outlined" />
                        <CustomTextField id="tpnumber" label="Contact Number" name="tpnumber" variant="outlined" />

                        <Box>
                            <UpdateButton type='submit'>Update</UpdateButton>
                            <CancelButton onClick={handleClose}> Cancel </CancelButton>
                        </Box>

                    </Box>
                </DialogContent>
            </Dialog>

        </Box>

    )
};