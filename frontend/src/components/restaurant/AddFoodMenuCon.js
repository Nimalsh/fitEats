import React, { useState } from 'react';
import { Box, TextareaAutosize, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { TextField, Typography } from '@mui/material';
import { Colours } from '../../assets/theme/theme';//to use theme provider,need to import this

import AddFoodMenuCat from './AddFoodMenuCat';

import axios from "axios";

import authHeader from "../../services/auth-header";


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

function AddFoodMenuCon(props) {

    const Id = props.Path.state.id;
    const name = props.Path.state.name;

    // --------to add category section--------
    const [components, addComponents] = useState(["Category1"]); //use to render when new component added to page

    function addSection() {
        addComponents([...components, <AddFoodMenuCat />])
    }
    // ---------------------------------------


    const initialValues = {
        Food_Carbo: null,
        Food_Protein: null,
        Food_Fat: null,
        Food_Calories: null,
        Food_Price: "",
        Food_Des: "",
        Food_Item: ""
    };

    // ----------create state name form values--------
    const [formValues, setFormValues] = React.useState(initialValues);
    const [imageData, setImageData] = useState(null);


    // ----------create state name form errors--------
    const [formErrors, setFormErrors] = React.useState({});


    // -------function to handle changes in the input fields and set it to formvalues----------
    const handleChange = (e) => {

        // destructuring inputfield
        const { name, value } = e.target;
        // get the relavant name as key and assign value to it
        setFormValues({ ...formValues, [name]: value });


    }

    const handleUploadClick = event => {
        let file = event.target.files[0];
        const imageData = new FormData();
        imageData.append('Image', file);
        setImageData(imageData);

        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value })
        // setImagePreview(URL.createObjectURL(file));
    }

    const handleSubmit = (e) => {

        e.preventDefault();


        const errors = {};

        // creating menu object
        const restaurantmenucatfood = {
            name: formValues.Food_Item,
            price: formValues.Food_Price,
            description: formValues.Food_Des,
            catId: Id,
            calaries: formValues.Food_Calories,
            fat: formValues.Food_Fat,
            protein: formValues.Food_Protein,
            carbo: formValues.Food_Carbo
        }

        const Food_Price = Number(formValues.Food_Price);
        const Food_Calories = Number(formValues.Food_Calories);
        const Food_Fat = Number(formValues.Food_Fat);
        const Food_Carbo = Number(formValues.Food_Carbo);
        const Food_Protein = Number(formValues.Food_Protein);

        if (Food_Price === 0 && Food_Calories === 0 && Food_Fat === 0 && Food_Protein === 0 && Food_Carbo === 0) {
            errors.valuetype = "Complete All Inputs";
            setFormErrors(errors);
        }
        else if (!isNaN(Food_Price) && !isNaN(Food_Calories) && !isNaN(Food_Fat) && !isNaN(Food_Protein) && !isNaN(Food_Carbo)) {


            imageData.append('catId', Id);
            imageData.append('name', formValues.Food_Item);
            imageData.append('description', formValues.Food_Des);
            imageData.append('price', formValues.Food_Price);

            imageData.append('calaries', formValues.Food_Calories);
            imageData.append('fat', formValues.Food_Fat);
            imageData.append('protein', formValues.Food_Protein);
            imageData.append('carbo', formValues.Food_Carbo);
            

            console.log(imageData);

            
            axios.post("http://localhost:8072/FoodiFy/Restaurant/addFoodMenuCategoryItem", imageData, { headers: authHeader() })
                .then(data => {
                    setFormValues(initialValues);
                    window.location.reload(false);

                })
                .catch(error => {
                    errors.exists = error.response.data;
                    setFormErrors(errors);

                })

                

        }
        else {
            errors.valuetype = "Check these are real values";
            setFormErrors(errors);
        }




    }

    return (

        <Box scroll='paper' sx={{
            margin: "auto",
            height: "60vh",
            width: "49%",
            padding: "auto",
            overflow: "scroll"
        }}>

            <Box component="form" color="#fff" bgcolor="#171717" opacity="50" sx={{ display: "flex", flexDirection: "column", borderRadius: '20px', p: "3%", '& .MuiTextField-root': { m: 1, width: '96%' }, width: { lg: "45vw", xs: "55vw" } }} >

                <Typography variant="h4" gutterBottom sx={{ fontSize: { lg: "230%", xs: "180%" } }} >
                    Add Foods
                </Typography>

                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "95%",
                    margin: "auto",
                    justifyContent: "center",
                }}>

                    <Typography variant='body' sx={{
                        color: Colours.formWhite,
                        textAlign: "center",
                    }}>
                        {name}
                    </Typography>

                    <Grid container spacing={3} sx={{ input: { color: "#fff" }, "label": { color: "#fff" }, p: "1%" }} >

                        <Grid item xs={12}>
                            <TextField
                                required
                                id="Food_Item"
                                name="Food_Item"
                                label="Food Item"
                                fullWidth
                                autoComplete="given-name"
                                variant="standard"
                                sx={{
                                    "& label.Mui-focused": {
                                        color: "#fff"
                                    }
                                }}

                                value={formValues.Food_Item}
                                onChange={handleChange}
                                {...(formErrors.exists && { error: true, helperText: formErrors.exists })}


                            />
                        </Grid>

                        <Grid item xs={12} >
                            <TextareaAutosize
                                required
                                id="Food_Des"
                                name="Food_Des"
                                placeholder="Description about Food Item"
                                style={{ width: "97%", paddingTop: '5px' }}

                                value={formValues.Food_Des}
                                onChange={handleChange}
                                {...(formErrors.exists && { error: true, helperText: formErrors.exists })}


                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                id="Food_Price"
                                name="Food_Price"
                                label="Food Price(Rs.)"
                                fullWidth
                                autoComplete="given-name"
                                variant="standard"
                                sx={{
                                    "& label.Mui-focused": {
                                        color: "#fff"
                                    }
                                }}

                                value={formValues.Food_Price}
                                onChange={handleChange}
                                {...(formErrors.valuetype && { error: true, helperText: formErrors.valuetype })}

                            />
                        </Grid>

                        <Grid item xs={3}>
                            <TextField
                                required
                                id="Food_Calories"
                                name="Food_Calories"
                                label="Calories (g)"
                                fullWidth
                                autoComplete="given-name"
                                variant="standard"
                                sx={{
                                    "& label.Mui-focused": {
                                        color: "#fff"
                                    }
                                }}

                                value={formValues.Food_Calories}
                                onChange={handleChange}
                                {...(formErrors.valuetype && { error: true, helperText: formErrors.valuetype })}

                            />
                        </Grid>

                        <Grid item xs={3}>
                            <TextField
                                required
                                id="Food_Fat"
                                name="Food_Fat"
                                label="Fat (g)"
                                fullWidth
                                autoComplete="given-name"
                                variant="standard"
                                sx={{
                                    "& label.Mui-focused": {
                                        color: "#fff"
                                    }
                                }}

                                value={formValues.Food_Fat}
                                onChange={handleChange}
                                {...(formErrors.valuetype && { error: true, helperText: formErrors.valuetype })}

                            />
                        </Grid>

                        <Grid item xs={3}>
                            <TextField
                                required
                                id="Food_Protein"
                                name="Food_Protein"
                                label="Protein (g)"
                                fullWidth
                                autoComplete="given-name"
                                variant="standard"
                                sx={{
                                    "& label.Mui-focused": {
                                        color: "#fff"
                                    }
                                }}

                                value={formValues.Protein}
                                onChange={handleChange}
                                {...(formErrors.valuetype && { error: true, helperText: formErrors.valuetype })}

                            />
                        </Grid>

                        <Grid item xs={3}>
                            <TextField
                                required
                                id="Food_Carbo"
                                name="Food_Carbo"
                                label="Carbo (g)"
                                fullWidth
                                autoComplete="given-name"
                                variant="standard"
                                sx={{
                                    "& label.Mui-focused": {
                                        color: "#fff"
                                    }
                                }}

                                value={formValues.Food_Carbo}
                                onChange={handleChange}
                                {...(formErrors.valuetype && { error: true, helperText: formErrors.valuetype })}

                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField type="file" name='Image' onChange={handleUploadClick} required />
                        </Grid>

                    </Grid>


                    <Grid item container ml="87%" mt="1%">

                        <Button variant="contained" sx={{
                            color: '#000', backgroundColor: "#95CD41", '&:hover': {
                                backgroundColor: "#95CD41"
                            }
                        }}
                            onClick={handleSubmit}
                        >
                            Confirm
                        </Button>

                    </Grid>


                </Box>



            </Box>


        </Box>
    )
}

export default AddFoodMenuCon