import React, { useState, useEffect } from "react";
import { Box, TextareaAutosize, Button, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import { TextField, Typography } from '@mui/material';
import { Colours } from '../../assets/theme/theme';//to use theme provider,need to import this


import axios from "axios";

import authHeader from "../../services/auth-header";

var food = 0;
var formDataCat = new FormData();

// -------------initial states for fields---------------------------
const initialValues = { foodMenuCategory: "", foodMenuCategoryDes: "" };

function AddFoodMenuIns() {


    // --------to add category section--------
    const [components, addComponents] = useState(["Vegie"]); //use to render when new component added to page


    // ----------create state name form values--------
    const [formValues, setFormValues] = React.useState(initialValues);
    const [imageData, setImageData] = useState(null);

    // ----------create state name form errors--------
    const [formErrors, setFormErrors] = React.useState({});


    // ----------store restaurant values--------
    const [details, setDetails] = React.useState({});


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

        imageData.append('menuId', details.menuId);
        imageData.append('foodMenuCategory', formValues.Menu_Category);
        imageData.append('foodMenuCategoryDes', formValues.Menu_Category_des);


       
        axios.post("http://localhost:8072/FoodiFy/Restaurant/addFoodMenuCategory", imageData, { headers: authHeader() })
            .then(data => {
                console.log("Entry access sucessfull");
                setFormValues(initialValues);
                window.location.reload(false);

            })
            .catch(error => {
                errors.exists = error.response.data;
                setFormErrors(errors);

            })



    }

    useEffect((event) => {
        axios.get("http://localhost:8072/FoodiFy/Restaurant/getFoodMenu", { headers: authHeader() })
            .then(data => {
                var menuId = data.data[0].id;
                setDetails({ ...details, "menuId": menuId });

            })
            .catch(error => {
                console.log(error);
            });

    }, []);


    return (

        <Box scroll='paper' sx={{
            margin: "auto",
            height: "57vh",
            width: "49%",
            padding: "auto",
            overflow: "scroll"
        }}>

            <Box component="form" color="#fff" bgcolor="#171717" opacity="50" sx={{ display: "flex", flexDirection: "column", borderRadius: '20px', p: "3%", '& .MuiTextField-root': { m: 1, width: '96%' }, width: { lg: "45vw", xs: "55vw" } }} >

                <Typography variant="h4" gutterBottom sx={{ fontSize: { lg: "230%", xs: "180%" } }} >
                    Add Menu Category
                </Typography>

                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "95%",
                    margin: "auto",
                    justifyContent: "center",
                }}>

                    <Typography variant='body' sx={{
                        color: Colours.primary,
                        textAlign: "center",
                    }}>
                        Add Menu Categories and Description
                    </Typography>

                    {/* button */}



                    {components.map((item, i) => (



                        <Grid container spacing={3} sx={{ input: { color: "#fff" }, "label": { color: "#fff" }, p: "1%" }} >
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="Menu_Category"
                                    name="Menu_Category"
                                    label="Menu Category"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="standard"
                                    sx={{
                                        "& label.Mui-focused": {
                                            color: "#fff"
                                        }
                                    }}

                                    value={formValues.Menu_Category}
                                    onChange={handleChange}
                                    {...(formErrors.exists && { error: true, helperText: formErrors.exists })}


                                />
                            </Grid>

                            <Grid item xs={12} >
                                <TextareaAutosize
                                    id="Menu_Category_des"
                                    name="Menu_Category_des"
                                    placeholder="Description about Menu Category"
                                    style={{ width: "97%", paddingTop: '5px' }}
                                    required

                                    value={formValues.Menu_Category_des}
                                    onChange={handleChange}
                                    {...(formErrors.exists && { error: true, helperText: formErrors.exists })}

                                />
                            </Grid>

                            <Grid item xs={12} md={4}>

                                <TextField type="file" name='Image' onChange={handleUploadClick} required />


                            </Grid>

                        </Grid>

                    ))}


                    <Grid item container ml="87%" mt="1%">

                        <Button variant="contained" sx={{
                            color: '#000', backgroundColor: "#95CD41", '&:hover': {
                                backgroundColor: "#95CD41"
                            }
                        }} onClick={handleSubmit} >
                            Add
                        </Button>

                    </Grid>


                </Box>



            </Box>


        </Box>
    )
}

export default AddFoodMenuIns