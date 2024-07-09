import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import theme, { Colours } from '../../assets/theme/theme';
import { Link } from 'react-router-dom';

import axois from "axios";
import authHeader from '../../services/auth-header';



var ROLE = null;

const CarouselCard = (props) => {


    const category = props.item;

    const categoryId = category.id;

    var image = null;

    if (category.image) {
        image = category.image.data;
    }

    const handleDelete = () => {

        // //console.log(categoryId);

        axois.get("http://localhost:8072/FoodiFy/Restaurant/deleteFoodCategory/" + categoryId, { headers: authHeader() })
            .then(data => {
                // this part if sucess
                window.location.reload(false);

            })
            .catch(error => {
                console.log(error);
            });


    }



    return (
        // ---------main card area------------
        <Card sx={{
            maxWidth: 345,
            width: '15rem',
            margin: 1,
            background: Colours.grayWhite,
            borderRadius: '1rem',
            transition: 'transform .2s', '&:hover': {
                transform: 'scale(1.04)',
            },
            [theme.breakpoints.down('sm')]: {
                width: '12rem',
            },
        }}>
            {/* ---------------card action area---------------------- */}
            <CardActionArea>
                {/* -------------------image area------------------------- */}

                <CardMedia
                    component="img"
                    height="235vh"
                    src={`data:image/jpeg;base64,${image}`}
                    alt={category.foodMenuCategory}
                />



                {/* ---------------------card content area---------------------- */}
                <CardContent>
                    {/* title, if any */}
                    <Typography gutterBottom variant="h5" component="div" sx={{
                        textAlign: 'center',
                        [theme.breakpoints.down('sm')]: {
                            fontSize: '14px',
                            padding: '2px',
                        },
                    }}>
                        {category.foodMenuCategory}
                    </Typography>
                    {/* description, if any */}
                    <Typography variant="body2" color="text.secondary" sx={{
                        textAlign: 'center',
                        [theme.breakpoints.down('sm')]: {
                            fontSize: '10px',
                            padding: '2px',
                        },
                    }}>
                        {category.foodMenuCategoryDes}
                    </Typography>

                </CardContent>
                {/* ---------------------end of card content area---------------------- */}

            </CardActionArea>
            {/* ---------------end of card action area---------------------- */}

            {/* -------------------------card button area---------------------- */}
            <CardActions sx={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Button component={Link} to={"/Restaurant/Category"} state={{ id: category.id, name: category.foodMenuCategory, RestId:props.RestId }} size="small" sx={{
                    margin: '6px',
                    background: Colours.green, '&:hover': {
                        backgroundColor: Colours.yellow,
                    },
                    color: Colours.dark,
                    fontSize: '0.8rem',
                    [theme.breakpoints.down('sm')]: {
                        fontSize: '8px',
                        padding: '2px',
                    },
                }}>
                    View
                </Button>

                {/* <Link to={`blog/${id}`}>{title}</Link> */}


                {/*------------------------------START SET USERTOLE-------------------------------------------------*/}
                {(() => {
                    if (JSON.parse(localStorage.getItem('ROLE'))) {
                        ROLE = JSON.parse(localStorage.getItem('ROLE'))[0].authority;
                        //console.log(ROLE)
                    }
                    else{
                        ROLE = null;
                      }
                }
                )()}
                {/*------------------------------END SET USERTOLE-------------------------------------------------*/}


                {(() => {
                    if (ROLE === "restaurant") {
                        return (
                            <Button component={Link} to={'/AddFoodMenuItem'} state={{ id: category.id, name: category.foodMenuCategory }} size="small" sx={{
                                margin: '6px',
                                background: Colours.yellow, '&:hover': {
                                    backgroundColor: Colours.green,
                                },
                                color: Colours.dark,
                                fontSize: '0.8rem',
                                [theme.breakpoints.down('sm')]: {
                                    fontSize: '8px',
                                    padding: '2px',
                                },
                            }}>
                                Edit
                            </Button>
                        );
                    }
                }
                )()}


                {(() => {
                    if (ROLE === "restaurant") {
                        return (
                            <Button
                                onClick={handleDelete}
                                size="small" sx={{
                                    margin: '6px',
                                    background: Colours.green, '&:hover': {
                                        backgroundColor: Colours.yellow,
                                    },
                                    color: Colours.dark,
                                    fontSize: '0.8rem',
                                    [theme.breakpoints.down('sm')]: {
                                        fontSize: '8px',
                                        padding: '2px',
                                    },
                                }}>
                                Delete
                            </Button>
                        );
                    }
                }
                )()}




            </CardActions>
            {/* -------------------------end of card button area---------------------- */}

        </Card>
        //   ----------------end of card area---------------
    )
}

export default CarouselCard
