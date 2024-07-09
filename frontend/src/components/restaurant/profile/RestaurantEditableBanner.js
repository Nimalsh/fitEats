import React, { useState, useEffect } from 'react';
import { Box, IconButton, Rating, TextField, ThemeProvider } from '@mui/material';
import Button from '@mui/material/Button';
import '../../../assets/css/App.css';
import ArrowIcon from '@mui/icons-material/ArrowForward';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

import Logo from '../../../assets/images/restaurant-logo.jpg';
import Cover from '../../../assets/images/indian-food-served-on-table.jpg';
import theme, { Colours } from '../../../assets/theme/theme';//to use theme provider,need to import this
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import EditIcon from '@mui/icons-material/Edit';
import styled from '@emotion/styled';
import axios from 'axios';
import authHeader from "../../../services/auth-header";
import { BannerContainer, BannerContainer2, BannerContent, BannerContent2, BannerLogo, BannerTitle, BannerTitle2 } from '../../../assets/theme/RBanner';


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

const RestaurantEditableBanner = () => {

    // ----------------for the form---------------------------------------
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [open2, setOpen2] = React.useState(false);

    const handleClickOpen2 = () => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };
    // ------------------------------------------------------------------

    //  --------------------for preview the image------------------
    const [imagePreview, setImagePreview] = useState(null);
    // ----------------sending image for the backend--------------
    const [imageData, setImageData] = useState(null);

    //  --------------------for preview the image2------------------
    const [imagePreview2, setImagePreview2] = useState(null);
    // ----------------sending image2 for the backend--------------
    const [imageData2, setImageData2] = useState(null);

    const [imageName, setImageName] = useState("");

    const [Cover1, setCover] = useState(null);

    const [Logo1, setLogo] = useState(null);

    const [rating, setRating] = useState(0);

    // ---------------set response data ----------------------------------------------
    //const [image, setImage] = useState(null);
    // console.log(data);

    // -------------initial states for fields---------------------------
    const initialValues = { restaurant_name: "" };
    // ----------create state name form values--------
    const [formValues, setFormValues] = React.useState(initialValues);

    // -------------initial states for fields---------------------------
    const initialValues2 = { restaurant_name: "" };
    // ----------create state name form values--------
    const [RestaurantName, setName] = React.useState(initialValues2);

    //const blob = null;

    useEffect(() => {

        axios.get("http://localhost:8072/FoodiFy/Restaurant/GetRestaurant", { headers: authHeader() })
            .then(data => {
                // console.log(data)
                setCover(data.data)

            }).catch(err => {
                console.log(err)
                setImagePreview(Cover);
            });

        // console.log("hello");
        //console.log("hello");

    }, []);

    useEffect(() => {

        axios.get("http://localhost:8072/FoodiFy/Restaurant/GetRestaurantInfo", { headers: authHeader() })
            .then(data => {
                // console.log(data)
                //console.log(data)

                const image = data.data.tempLogo;
                setLogo(image);

                setName({ ...RestaurantName, ["restaurant_name"]: data.data.restaurantName });
                // setName(data.data.restaurantName)

                console.log(`data:image/jpeg;base64,${Logo1}`)
                // console.log(data.data.restaurantName)

                // {Logo1 !== null ? setImagePreview2(Logo1) : setImagePreview2(Logo)}

                // if (data.data.tempLogo == null) {
                //     setImagePreview2(Logo);
                // }
                // if (data.data.restaurantName == null) {
                //     setName("Restaurant_Name")
                // }
                const rating = data.data.rating;
                setRating(rating);

            }).catch(err => {
                console.log(err)

                    setImagePreview2(Logo);

                    setName({ ...RestaurantName, ["restaurant_name"]: "Restaurant_Name"})

            });
    }, []);

    // ---------------preview function-------------------
    const handleUploadClick = event => {
        let file = event.target.files[0];
        const imageData = new FormData();
        imageData.append('imageFile', file);
        // setImageData(imageData);
        setImagePreview(URL.createObjectURL(file));
    }

    const uploadImageWithAdditionalData = () => {
        axios.post("http://localhost:8072/FoodiFy/Restaurant/uploadBannerImage", imageData, { headers: authHeader() })
            .then(data => {
               // console.log("Entry access sucessfull")
                window.location.reload(false);
                setOpen(false);

            })
            .catch(error => {
                // console.log(restaurantAbout)
                // console.log("There is an error")

            })
    }

    // -----------------------------for the logo part--------------------------------------------
    const handleUploadClick2 = event => {
        let file = event.target.files[0];
        const imageData2 = new FormData();
        imageData2.append('imageFile', file);
        setImageData2(imageData2);
        setImagePreview2(URL.createObjectURL(file));
    }

    const handleChange2 = event2 => {

        // setImageName(event2.target.value);
        // destructuring inputfield
        const { name, value } = event2.target;
        // get the relavant name as key and assign value to it
        setFormValues({ ...formValues, [name]: value });
       // console.log(imageName);


    };

    // ---------------------------for uploading the logo-----------------------------------------
    const uploadImageWithAdditionalData2 = () => {

        imageData2.append('restName', formValues.restaurant_name);

        axios.post("http://localhost:8072/FoodiFy/Restaurant/uploadLogoDetails", imageData2, { headers: authHeader() })
            .then(data => {
               // console.log("Entry access sucessfull")
                window.location.reload(false);
                setOpen2(false);

            })
            .catch(error => {
                // console.log(restaurantAbout)
                // console.log("There is an error")

            })
    }
    

/*    const showCoverImage = () => {



        // if(imagePreview !== null){
        //     return imagePreview;
        // }
        // if(image !== null){
        //     return image;
        // }else{
        //     return Cover;
        // }
        // imagePreview !== null ? imagePreview : image;
    }
    */

    return (
        <ThemeProvider theme={theme}>

            {/* banner container */}
            <BannerContainer>

                {/* upper part of the banner */}

                {/* {console.log(imagePreview)}

                {console.log(Cover)} */}

                <BannerContent src={imagePreview !== null ? imagePreview : `data:image/jpeg;base64,${Cover1}`}>

                    {/* <BannerForm1 /> */}

                    {/* -----------------------------begin of the banner form------------------------------- */}
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

                                    <TextField type="file" name='image' onChange={handleUploadClick} />

                                    <Box>
                                        <UpdateButton onClick={uploadImageWithAdditionalData}>Update</UpdateButton>
                                        <CancelButton onClick={handleClose}> Cancel </CancelButton>
                                    </Box>

                                </Box>
                            </DialogContent>
                        </Dialog>

                    </Box>
                    {/* -----------------------end of the begin form---------------------------------------- */}

                    <Box sx={{
                        marginTop: '10%',
                        alignItems: "center",
                    }}>

                        <Box sx={{
                            width: "20%",
                            margin: "auto",
                        }}>
                            <Button href='#' endIcon={<ArrowIcon fontSize="medium" sx={{
                                [theme.breakpoints.down('sm')]: {
                                    fontSize: '8px',
                                },
                            }} />} variant="contained" sx={{
                                margin: '6px',
                                background: Colours.yellow, '&:hover': {
                                    backgroundColor: Colours.green,
                                },
                                color: Colours.dark,
                                fontSize: '20px',
                                hover: Colours.green,
                                [theme.breakpoints.down('sm')]: {
                                    fontSize: '8px',
                                    padding: '2px',
                                },
                            }}>
                                Offers
                            </Button>
                            <Button href='#' endIcon={<RestaurantMenuIcon fontSize="medium" sx={{
                                [theme.breakpoints.down('sm')]: {
                                    fontSize: '8px',
                                },
                            }} />} variant="contained" sx={{
                                margin: '6px',
                                background: Colours.darkgray, '&:hover': {
                                    backgroundColor: Colours.grayWhite, color: Colours.dark,
                                },
                                color: Colours.grayWhite,
                                fontSize: '20px',
                                [theme.breakpoints.down('sm')]: {
                                    fontSize: '8px',
                                    padding: '2px',
                                },
                            }}>
                                Menu
                            </Button>


                        </Box>
                    </Box>

                </BannerContent>
                {/* end of upper part of the banner */}

                {/* lower part of the banner */}
                <BannerContainer2>
                    <BannerLogo src={imagePreview2 !== null ? imagePreview2 : `data:image/jpeg;base64,${Logo1}`} />
                    <BannerContent2>
                        <BannerTitle>
                            {RestaurantName.restaurant_name}
                        </BannerTitle>

                        <BannerTitle2>
                            Rating: {rating}

                        </BannerTitle2>
                        <Rating name="rating" value={rating} precision={0.5} size="small" readOnly sx={{
                            [theme.breakpoints.down('sm')]: {
                                fontSize: '8px',
                            },
                        }} />

                    </BannerContent2>
                    {/* -------------------------------------------from2-------------------------------------- */}
                    {/* <BannerForm2 /> */}
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

                        }} onClick={handleClickOpen2} >
                            <EditIcon sx={{
                                color: Colours.dark,
                            }} />
                        </IconButton>

                        {/* ---------------------------form------------------------- */}
                        <Dialog
                            open={open2}
                            keepMounted
                            TransitionComponent={Transition}

                        >
                            <DialogTitle>{"Update Logo and name"}</DialogTitle>
                            <DialogContent>
                                <Box component="form"
                                    noValidate
                                    autoComplete="off">

                                    <CustomTextField
                                        id="restaurant_name"
                                        label="Restaurant_name"
                                        name="restaurant_name"
                                        variant="outlined"
                                        onChange={handleChange2}
                                    />
                                    <CustomTextField type="file" name='image' onChange={handleUploadClick2} />

                                    <Box>
                                        <UpdateButton onClick={uploadImageWithAdditionalData2}>Update</UpdateButton>
                                        <CancelButton onClick={handleClose2}> Cancel </CancelButton>
                                    </Box>

                                </Box>
                            </DialogContent>
                        </Dialog>

                    </Box>
                    {/* ---------------------------------end of form 2----------------------------------------------------------- */}

                </BannerContainer2>
                {/* end of the lower part of the banner */}

            </BannerContainer>
            {/* end of the banner container */}

        </ThemeProvider >
    )
}

export default RestaurantEditableBanner
