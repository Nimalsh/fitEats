import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import theme, { Colours } from '../../assets/theme/theme';
import { Button, TextField } from '@mui/material';
import styled from '@emotion/styled';
import axios from 'axios';
import authHeader from "../../services/auth-header";
import { Checkbox,FormGroup, Grid, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// ---------------------------------text fied css style-----------------------
const InputArea = styled(TextField)({
    width: "90%",
    color: Colours.grayWhite,
    '&:fielset': {
        backgroundColor: Colours.primary,
    },

    '& 	.MuiInputLabel-root': {
        color: Colours.grayWhite,
    },
    '& 	.MuiFormHelperText-root': {
        color: Colours.grayWhite,
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
            borderColor: Colours.grayWhite, //white for borders when not focused
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
});
// ---------------------------------------------------------------------

const AddOfferForm = () => {

    // --------------to get the id------------------
    const location = useLocation();

    const navigate = useNavigate();

    // ------------------------food array-------------------------------

    // ---------------for the check list-----------------------
    const [checked, setChecked] = React.useState([]);

    // Add/Remove checked item from list
    const checklisthandle = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };

    //   ---------------------------------



    // ----------------------for store response data----------------------
    const [details, setDetails] = React.useState({});

    // ----------------------for store response data of items----------------------
    const [details2, setDetails2] = React.useState({});

    // ----------------------for store offer response data----------------------
    const [offerdetails, setOfferDetails] = React.useState({});

    // ----------------------for store items list----------------------
    const [items1, setItems1] = React.useState({});

    // ----------------------for store items list----------------------
    const [items2, setItems2] = React.useState({});

    // console.log(category)
    // console.log(checked)

    // ----------------------to send offer id and cat id to server-----------------------------
    const [foods, setFoods] = React.useState({});

    // const cat = defaultCategory.data;
    // const cat1 = String(cat);
    // console.log(cat1);

    const [category, setCategory] = React.useState("");

    // ------------------set default values of category and items-------------------------------------
    const addFoodId = (data) => {

        // var id = String(data);
        // console.log(data);
        // const cat = details;
        // setItems2({ ...items2,id })
    };

    // ---------------------------to get the food items for selected category--------------------------------------
    const getFood = (food) => {

        const catId1 = String(food);
        const foods = new FormData();
        foods.append('catId', catId1);
        foods.append('offerId', location.state.id);

        setCategory(food);

        var items = {
            "catId": food
        }

        // console.log(items);
        const sendGetRequest2 = async () => {
            try {
                const resp2 = await axios.post('http://localhost:8072/FoodiFy/Restaurant/offerFoodItems', foods, { headers: authHeader() });

                const details2 = resp2.data;
                const details3 = resp2.data;
                setDetails2({ ...details2 });

                console.log(details2);
                var updatedList = [...checked];
                // updatedList = [...checked, event.target.value];
                console.log("request susccess 1");

                const items2 = [];
                details3.map((keyName2) => (
                    items2.push(keyName2.id)
                ))
                console.log(items2)
                setItems2(items2);
            } catch (err) {
                // Handle Error Here
                console.error(err);
            }
        };

        sendGetRequest2();

    };

    // -------------initial states for fields---------------------------
    const initialValues = {
        name: offerdetails.name,
        description: "",
        Bdate: "",
        Edate: "",
        discount: ""
    };

    // ----------create state name form values--------
    const [formValues, setFormValues] = React.useState(initialValues);

    // ------------------------calling category values---------------------------------------------------
    useEffect(() => {

        const sendGetRequest = async () => {
            try {
                const resp = await axios.get('http://localhost:8072/FoodiFy/Restaurant/getCategories', { headers: authHeader() });

                const details = resp.data;
                setDetails({ ...details });

                console.log(details);
            } catch (err) {
                // Handle Error Here
                console.error(err);
            }
        };

        sendGetRequest();

        // -----------------------------------to get the offer details------------------------------------------
        const getOfferDetails = async () => {
            try {
                const respOffer = await axios.get(`http://localhost:8072/FoodiFy/Service/getOffer/${location.state.id}`);

                const offerDetails = respOffer.data;

                const details3 = respOffer.data.items;
                const items1 = [];
                details3.map((keyName2) => (
                    console.log(keyName2),
                    items1.push(keyName2)
                ))
                setItems1(items1);
                // setChecked(items1);


                setOfferDetails({ ...offerDetails });

                // --------------sending category id -----------------------------
                addCategory(respOffer.data.category);
                setCategory(respOffer.data.category);
                getFood(respOffer.data.category);

                // --------------------setting default form values---------------
                const initialValues = {
                    name: respOffer.data.name ,
                    description:respOffer.data.description ,
                    Bdate: respOffer.data.startDate,
                    Edate: respOffer.data.endDate,
                    discount: respOffer.data.discount
                }
                setFormValues({ ...initialValues });

                // console.log(offerDetails);
                // setItems([...items1]);
            } catch (err) {
                // Handle Error Here
                console.error(err);
            }
        };

        getOfferDetails();

    }, []);

    const handleChange = event => {

        const { name, value } = event.target;
        // get the relavant name as key and assign value to it
        setFormValues({ ...formValues, [name]: value });
        // console.log(imageName);
    };

    // ------------------set default values of category and items-------------------------------------
    const addCategory = (data) => {

        console.log(data);
        const cat = details;
        // setDefaultCategory({ data });
    };

    // -------------------------------------------------------------------calling food items-------------------------------------------------------
    const handleChange2 = event => {
        setCategory(event.target.value);

        var items = {
            "catId": event.target.value
        }

        // console.log(items);
        const sendGetRequest2 = async () => {
            try {
                const resp2 = await axios.post('http://localhost:8072/FoodiFy/Restaurant/getfoodItems1', items, { headers: authHeader() });

                const details2 = resp2.data;
                setDetails2({ ...details2 });

                console.log("Request sucessful")
                console.log(details2)
            } catch (err) {
                // Handle Error Here
                console.error(err);
            }
        };

        sendGetRequest2();

    };

    console.log(formValues);
    console.log(category);
    console.log(items1);
    console.log(items2);

    // ----------------sending image for the backend--------------
    const [imageData, setImageData] = useState(null);
    // ---------------preview function-------------------
    const handleUploadClick = event => {
        let file = event.target.files[0];
        const imageData = new FormData();
        imageData.append('imageFile', file);
        setImageData(imageData);
    }

    // console.log(imageData)

    // ---------------------------for uploading the logo-----------------------------------------
    const uploadData = () => {

        const list1 = [category, checked]

        console.log(list1)
        console.log(items1)

        imageData.append('name', formValues.name);
        imageData.append('description', formValues.description);
        imageData.append('Bdate', formValues.Bdate);
        imageData.append('Edate', formValues.Edate);
        imageData.append('discount', formValues.discount);
        imageData.append('offerId', location.state.id);
        imageData.append('itemList', list1);
        imageData.append('foodItems', items1);


        // console.log(imageData)

        axios.post("http://localhost:8072/FoodiFy/Restaurant/updateOffer", imageData, { headers: authHeader() })
            .then(data => {
                console.log("Entry access sucessfull")
                // window.location.reload(false);
                navigate("/Restaurant/Offers",{ state: { id: location.state.id } });
            })
            .catch(error => {
                // console.log(restaurantAbout)
                // console.log("There is an error")
            })
            
    }

    var todayDate = new Date(); //Today Date    
    // -----------------------------setting up date to display---------------------------------
    const bDate = new Date(offerdetails.startDate).toLocaleDateString('en-CA');
    // console.log(defaultValue)

    // var defaultValue = new Date(Bdate).toISOString().split("T")[0];
    const Edate = new Date(offerdetails.endDate).toLocaleDateString('en-CA');

    return (
        <Box>
            {/* -----------------------form area------------------------- */}
            <Box
                component="form"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "90%",
                    margin: "auto",
                    padding: "1rem",
                    opacity: 0.9,
                    background: Colours.secondary,

                    '& .MuiTextField-root': {
                        m: 1,
                        width: '96%',

                    },
                    [theme.breakpoints.down('sm')]: {
                        fontSize: '15px',
                        padding: 0,
                    },
                }}
                noValidate
                autoComplete="off"
            >
                {/* -------text fields----------- */}
                <InputArea id="name" label="Name" focused defaultValue={offerdetails.name}  name="name" multiline rows={1} variant="outlined" onChange={handleChange} />
                <InputArea id="description" label="Description" focused defaultValue={offerdetails.description} name="description" multiline rows={6} variant="outlined" onChange={handleChange} />

                {/* --------date selection area--------- */}
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    [theme.breakpoints.down('sm')]: {
                        flexDirection: "column",
                    },
                }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "0.5rem",

                    }}>
                        <Typography variant='body' sx={{ color: Colours.grayWhite, }}>Begin Date</Typography>
                        <InputArea id="begin date" focused value={formValues.Bdate ? formValues.Bdate : bDate} type="date" name="Bdate" variant="outlined" onChange={handleChange} />
                    </Box>

                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "0.5rem",
                    }}>
                        <Typography variant='body' sx={{ color: Colours.grayWhite, }}>End Date</Typography>
                        <InputArea id="begin date" focused value={formValues.Edate ? formValues.Edate : Edate} type="date" name="Edate" variant="outlined" onChange={handleChange} />
                    </Box>
                </Box>
                {/* ------------end of date selection area------------------ */}

                {/* -------------category and food items area------- */}
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "95%",
                    margin: "auto",
                    justifyContent: "center",
                }}>
                    <Typography variant='body' sx={{
                        color: Colours.grayWhite,
                        textAlign: "center",
                    }}>
                        Add Categories and food items
                    </Typography>

                    <InputArea
                        focused
                        id="outlined-select-currency"
                        select
                        label="Select"
                        value={category}
                        onChange={handleChange2}
                        helperText="Please select your currency"
                    >
                        {/* ------------------------give categories if available-------------------------------------- */}
                        {(() => {
                            if (details !== null) {
                                return (

                                    Object.keys(details).map((keyName) => (
                                        // console.log(details[keyName]),
                                        <MenuItem key={keyName} value={details[keyName].id}>
                                            {details[keyName].foodMenuCategory}
                                        </MenuItem>

                                    ))
                                );
                            }
                        }
                        )()}

                        {/* ---------------------------------default when categories are not availble-------------------------------- */}
                        {(() => {
                            if (details == null) {
                                return (

                                    <MenuItem value={0} name="none">
                                        there is no categories
                                    </MenuItem>

                                );
                            }
                        }
                        )()}
                    </InputArea>

                    {/* ------------------to select food items------------------ */}
                    <FormGroup>

                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                            {/* ------------------------give food items if available-------------------------------------- */}
                            {(() => {
                                if (details2 !== null) {
                                    return (


                                        Object.keys(details2).map((keyName2) => (
                                            // -------------------loop-----------------------------

                                            console.log(JSON.stringify(items2) + "==" + JSON.stringify(items1)),
                                            // let arr = details2.filter(detail2 => details2[keyname].id === items1)
                                            (() => {
                                                if (details2 !== null || details2[keyName2].discount === 0) {
                                                    return (
                                                        <Grid item xs={2} sm={4} md={4} key={details2[keyName2].id} sx={{
                                                            display: "flex",
                                                            flexDirection: "row",
                                                        }}>

                                                            <Checkbox
                                                                id="begin date"
                                                                type="checkbox"
                                                                value={details2[keyName2].id}
                                                                name={details2[keyName2].name}
                                                                variant="standard"
                                                                onChange={checklisthandle}
                                                            />

                                                            <Typography variant='body' sx={{ color: Colours.grayWhite, marginTop: "2%" }}>{details2[keyName2].name}</Typography>

                                                        </Grid>
                                                    );
                                                }
                                            }
                                            )()

                                            // -------------------------loop-------------------------------------
                                        ))
                                    );
                                }
                            }
                            )()}
                        </Grid>

                    </FormGroup>
                    {/* ------------------end of selecting food items------------------ */}

                </Box>
                {/* ------------end of category and food items area----- */}

                {/* ------------------for discount area---------------- */}
                <InputArea id="standard-basic" label="Discount Rate" focused defaultValue={offerdetails.discount} name='discount' multiline rows={1} variant="outlined" onChange={handleChange} />

                {/* ---------------------add image area------------------------------------ */}
                <Typography variant='body' sx={{
                    color: Colours.grayWhite,
                    textAlign: "left",
                }}>
                    Add Image
                </Typography>
                <InputArea type="file" name='image' onChange={handleUploadClick} />

                {/* -----------------------------submit and cancel area--------------------------- */}
                <Box sx={{
                    marginTop: "1rem"
                }}>
                    <Button variant="contained" sx={{
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
                    }} onClick={uploadData}> Add </Button>

                    <Button variant="contained" sx={{
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
                {/* ---------------------------------end of submit and cancel arae---------------------- */}
            </Box>
            {/* ----------------end of form area-------------------------- */}
        </Box>
    )
}

export default AddOfferForm