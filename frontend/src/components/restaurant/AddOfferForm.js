import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import theme, { Colours } from '../../assets/theme/theme';
import { Button, TextField } from '@mui/material';
import styled from '@emotion/styled';
import CategorySelection from './CategorySelection';
import axios from 'axios';
import authHeader from "../../services/auth-header";
import { Checkbox, FormControl, FormGroup, Grid, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

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

// ----------array or object ot get category values--------------------
const category = [
    {
        value: 'Vegie',
        label: 'Vegie',
    },
    {
        value: 'Sea Food',
        label: 'Sea Food',
    },
    {
        value: 'Indian',
        label: 'Indian',
    },
    {
        value: 'Italian',
        label: 'Italian',
    },
];

// ------------------------food names-----------------
const foods = [
    {
        value: 'Vegie',
        label: 'Vegie Masala',
    },
    {
        value: 'Sea Food',
        label: 'Sea Food Fish curry',
    },
    {
        value: 'Indian',
        label: 'Indian Those',
    },
    {
        value: 'Italian',
        label: 'Italian burger',
    },
];

const AddOfferForm = () => {

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

    const [category, setCategory] = React.useState('category');

    // ----------------------for store response data----------------------
    const [details, setDetails] = React.useState({});

    // ----------------------for store response data of items----------------------
    const [details2, setDetails2] = React.useState({});

    // console.log(category)
    // console.log(checked)

    // ------------send data if corrects---------
    React.useEffect((event) => {

        if (checked !== null) {

        }

    }, [])

    // ------------------------calling category values---------------------------------------------------
    useEffect(() => {

        const sendGetRequest = async () => {
            try {
                const resp = await axios.get('http://localhost:8072/FoodiFy/Restaurant/getCategories', { headers: authHeader() });

                const details = resp.data;
                setDetails({ ...details });

                // console.log(details);
            } catch (err) {
                // Handle Error Here
                console.error(err);
            }
        };

        sendGetRequest();

    }, []);

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
            } catch (err) {
                // Handle Error Here
                console.error(err);
            }
        };

        sendGetRequest2();

    };

    // console.log(details2);

    // --------to add category section--------
    const [components, addComponents] = useState(["Vegie"]); //use to render when new component added to page

    function addSection() {
        addComponents([...components, <CategorySelection />])
    }
    // ---------------------------------------

    // -------------initial states for fields---------------------------
    const initialValues = { name: "", description: "", Bdate: "", Edate: "", discount: "" };
    // ----------create state name form values--------
    const [formValues, setFormValues] = React.useState(initialValues);

    const handleChange = event => {

        const { name, value } = event.target;
        // get the relavant name as key and assign value to it
        setFormValues({ ...formValues, [name]: value });
        // console.log(imageName);
    };

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

        // console.log(list1)

        imageData.append('name', formValues.name);
        imageData.append('description', formValues.description);
        imageData.append('Bdate', formValues.Bdate);
        imageData.append('Edate', formValues.Edate);
        imageData.append('discount', formValues.discount);
        imageData.append('itemList', list1)


        // console.log(imageData)

        axios.post("http://localhost:8072/FoodiFy/Restaurant/uploadOffers", imageData, { headers: authHeader() })
            .then(data => {
                console.log("Entry access sucessfull")
                window.location.reload(false);

            })
            .catch(error => {
                // console.log(restaurantAbout)
                // console.log("There is an error")

            })
    }

    return (
        <Box>
            {/* -----------------------form area------------------------- */}
            <Box
                component="form"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
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
                <InputArea id="name" label="Name" name="name" variant="outlined" onChange={handleChange} />
                <InputArea id="description" label="Description" name="description" multiline rows={6} variant="outlined" onChange={handleChange} />

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
                        <InputArea id="begin date" type="date" name="Bdate" variant="outlined" onChange={handleChange} />
                    </Box>

                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "0.5rem",
                    }}>
                        <Typography variant='body' sx={{ color: Colours.grayWhite, }}>End Date</Typography>
                        <InputArea id="begin date" type="date" name="Edate" variant="outlined" onChange={handleChange} />
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

                    <FormControl>
                        <InputArea
                            id="outlined-select-currency"
                            select
                            name='category'
                            label="Category"
                            value={category}
                            onChange={handleChange2}
                            helperText="Add food Category"
                        >
                            {/* ------------------------give categories if available-------------------------------------- */}
                            {(() => {
                                if (details !== null) {
                                    return (

                                        Object.keys(details).map((keyName) => (
                                            // console.log(details[keyName]),
                                            <MenuItem key={keyName} value={details[keyName].id} name="Category1">
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

                            {/* {props.category.map((option) => (
                    <MenuItem key={option.value} value={option.value} name={option.value}>
                        {option.label}
                    </MenuItem>
                ))} */}
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
                                                // console.log(details2[keyName2]),

                                                (() => {
                                                    if (details2[keyName2].discount === 0) {
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
                    </FormControl>
                </Box>
                {/* ------------end of category and food items area----- */}

                {/* ------------------for discount area---------------- */}
                <InputArea id="standard-basic" label="Discount Rate" name='discount' variant="outlined" onChange={handleChange} />

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
