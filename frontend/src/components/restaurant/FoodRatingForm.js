import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import theme, { Colours } from '../../assets/theme/theme';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import authHeader from "../../services/auth-header";
import axios from "axios";
import { useLocation } from 'react-router-dom';



// --------------------------------rating values---------------------------
const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}
// --------------------------------------------------------------------------------

// ---------------------------------text fied css style-----------------------
const CommentArea = styled(TextField)({
    background: Colours.secondary,
    margin: "auto",
    borderRadius: "1rem",
    '&:hover': {
        backgroundColor: Colours.secondary,
    },

    '& label.Mui-focused': {
        color: '#95CD41',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#95CD41',
    },
    '& label': {
        borderColor: '#EFEAEA',
    },

    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#757575',
            borderRadius: "1rem",
        },
        '&:hover fieldset': {
            borderColor: '#FAC213',
            borderRadius: "1rem",

        },
        '&.Mui-focused fieldset': {
            borderColor: '#95CD41',
        },
    },
});
// ---------------------------------------------------------------------

export default function MultilineTextFields() {
    const location = useLocation();
    // console.log(location.state.rid);
    // ----------------for star rating-----------------------------
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);
 // ------------------------------------------------------------
    // -------------initial states for fields---------------------------
    const initialValues = { commentDescription: "", foodRating: 2 };

    // ----------create state name form values--------
    const [formValues, setFormValues] = React.useState(initialValues);

    // ----------create state name form errors--------
    const [formErrors, setFormErrors] = React.useState({});

    // -------------usestate for submit form-----------
    const [isSubmit, setIsSubmit] = React.useState(false);
    const [name, setName] = React.useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = {};

        // creating comment object
        const foodcomment = {
            commentDescription: formValues.commentDescription,
            foodRating: formValues.foodRating,
            foodId: location.state.food
        }

        console.log(foodcomment);
        axios.post("http://localhost:8072/FoodiFy/User/addFoodComment", foodcomment, { headers: authHeader() })
        .then(data => {
            console.log("Entry access sucessfull");
            // window.location.reload(false);
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

        // ------------main box------------------
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            width: "70%",
            margin: "auto",
            marginRight: "25%",
            marginTop: "8%",
            [theme.breakpoints.down('sm')]: {
                marginRight: "20%",
            },
        }}>
            <Typography variant='h4' sx={{
                color: Colours.green,
                [theme.breakpoints.down('sm')]: {
                    fontSize: '20px',
                    padding: '2px',
                },
            }}>
                Add Rating
            </Typography>

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
                noValidate
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
                    Food Name: {location.state.food2}
                </Typography>

                {/* ---------------text area----------------- */}
                <CommentArea
                    id="commentDescription"
                    name="commentDescription"
                    label="Add Comment"
                    multiline
                    rows={6}
                    placeholder="Comment"
                    value={formValues.commentDescription}
                    onChange={handleChange}
                />

                {/* ---------------star rating area-------------- */}
                <Box sx={{
                    width: "100%",
                }}>
                    <Typography component="legend" sx={{
                        color: Colours.green,
                        marginLeft:"0.5rem",
                        [theme.breakpoints.down('sm')]: {
                            fontSize: '12px',
                            padding: '2px',
                        },
                    }}>
                        Rate
                    </Typography>


                    {/* ----------------------for star rating------------------------- */}
                    <Box
                        sx={{
                            width: 200,
                            display: 'flex',
                            alignItems: 'center',
                            marginLeft:"0.5rem",
                        }}
                    >
                        <Rating
                            id="foodRating"
                            name="foodRating"
                            value={formValues.foodRating}
                            precision={0.5}
                            getLabelText={getLabelText}
                            // onChange={(event, newValue) => {
                            //     setValue(newValue);
                            // }}
                            onChange={handleChange}
                            onChangeActive={(event, newHover) => {
                                setHover(newHover);
                            }}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                        {value !== null && (
                            <Box sx={{ ml: 2, color: Colours.formWhite }}>{labels[hover !== -1 ? hover : value]}</Box>
                        )}
                    </Box>
                    {/* ----------------------end of star rating------------------------- */}

                </Box>
                {/* ---------------end of star rating area-------------- */}

                {/* -----------------------------submit and cancel area--------------------------- */}
                <Box sx={{
                    marginTop: "1rem"
                }}>
                    <Button onClick={handleSubmit} type='submit' variant="contained" sx={{
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
                            padding: '2px',
                        },
                    }}>Submit</Button>

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
            {/* -----------------------end of form---------------- */}

        </Box>
    );
}
