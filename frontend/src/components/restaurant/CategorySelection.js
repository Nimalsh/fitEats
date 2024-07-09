import React, { useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Colours } from '../../assets/theme/theme';
import styled from '@emotion/styled';
import { Checkbox, FormControl, FormGroup, Grid, Typography } from '@mui/material';
import authHeader from "../../services/auth-header";

// ---------------------------------text fied css style-----------------------
const InputArea = styled(TextField)({
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

const foods1 = [
    {
        id: "0",
        name: "Vegie Masala",
    },
    {
        id: "1",
        name: "Vegie onion pizza",
    },
    {
        id: "2",
        name: "Vegie Those",
    },
    {
        id: "3",
        name: "Burger",
    },
    {
        id: "4",
        name: "Samosha",
    },
    {
        id: "5",
        name: "Noodles",
    }
];

//const name = { Food1: "false", Food2: "false", Food3: "false", Food4: "false", Food5: "false", Food6: "false", }

const CategorySelection = (props) => {

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

    // -------------initial states for fields---------------------------
    const initialValues = { category: "" };
    // ----------create state name form values--------
    const [formValues, setFormValues] = React.useState(initialValues);

   // console.log(category)
    //console.log(checked)

    const list1 = [category,checked]

    //console.log(list1)

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

              //  console.log(details);
            } catch (err) {
                // Handle Error Here
                console.error(err);
            }
        };

        sendGetRequest();

    }, []);

    const handleChange = event => {
        setCategory(event.target.value);

        var items = {
            "catId": event.target.value
        }

     //   console.log(items);
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

    return (

        <FormControl>
            <InputArea
                id="outlined-select-currency"
                select
                name='category'
                label="Category"
                value={category}
                onChange={handleChange}
                helperText="Add food Category"
            >
                {/* ------------------------give categories if available-------------------------------------- */}
                {(() => {
                    if (details !== null) {
                        return (

                            Object.keys(details).map((keyName) => (
                                console.log(details[keyName]),
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
                                    console.log(details2[keyName2]),

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
                                ))
                            );
                        }
                    }
                    )()}
                    {/* {foods1.map((item) => (
                        <Grid item xs={2} sm={4} md={4} key={item.id} sx={{
                            display: "flex",
                            flexDirection: "row",
                        }}>

                            <Checkbox
                                id="begin date"
                                type="checkbox"
                                value={item.name}
                                name={item.name}
                                variant="standard"
                                onChange={checklisthandle}
                            />
                            <Typography variant='body' sx={{ color: Colours.grayWhite, marginTop: "2%" }}>{item.name}</Typography>

                        </Grid>
                    ))} */}
                </Grid>

            </FormGroup>
            {/* ------------------end of selecting food items------------------ */}
        </FormControl>
    )
}

export default CategorySelection
