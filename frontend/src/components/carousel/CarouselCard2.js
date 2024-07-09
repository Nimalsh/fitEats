import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import theme, { Colours } from '../../assets/theme/theme';
import {Link} from 'react-router-dom';

const CarouselCard2 = (props) => {

    const itemdata = props.item;
    const Rid = props.Rid;

    const IDs = {
        "id": itemdata.id,
        "Rid":Rid
    }
    // console.log(itemdata);

    var image = null;

    if (itemdata.image) {
        image = itemdata.image.data;
    }


    return (
        // ---------main card area------------
        <Card sx={{
            maxWidth: 345,
            width: '15rem',
            margin:1,
            background: Colours.gray2,
            borderRadius:'1rem',
            transition: 'transform .2s', '&:hover': {
                transform: 'scale(1.04)',
                background:Colours.darkgray,
              },
            [theme.breakpoints.down('sm')]: {
                width:'12rem',
            },
        }}>
            {/* ---------------card action area---------------------- */}
            <CardActionArea>
                {/* -------------------image area------------------------- */}
                <CardMedia
                    component="img"
                    height="235vh"
                    src={`data:image/jpeg;base64,${image}`}
                    alt={itemdata.name}
                    overflow="visible"
                    
                />

                {/* ---------------------card content area---------------------- */}
                <CardContent>
                    {/* title, if any */}
                    <Typography gutterBottom variant="h5" component="div" sx={{
                        textAlign:'center',
                        color:Colours.formWhite,
                        [theme.breakpoints.down('sm')]: {
                            fontSize: '14px',
                            padding: '2px',
                        },
                    }}>
                        {itemdata.name}
                    </Typography>

                    {/* title2 */}
                    <Typography variant="body2" color="text.secondary" sx={{
                        textAlign:'center',
                        color:Colours.formWhite,
                        fontSize:"0.8rem",
                        [theme.breakpoints.down('sm')]: {
                            fontSize: '8px',
                            padding: '2px',
                        },
                    }}>
                        
                        {itemdata.description.substring(0, 30)}
                        ...
                    </Typography>

                    {/* price, if any */}
                    <Typography variant="body2" color="text.secondary" sx={{
                        textAlign:'center',
                        color:Colours.formWhite,
                        fontSize:"1rem",
                        [theme.breakpoints.down('sm')]: {
                            fontSize: '10px',
                            padding: '2px',
                        },
                    }}>
                        Rs.
                        {itemdata.price}
                    </Typography>

                </CardContent>
                {/* ---------------------end of card content area---------------------- */}

            </CardActionArea>
            {/* ---------------end of card action area---------------------- */}

            {/* -------------------------card button area---------------------- */}
            <CardActions sx={{
                justifyContent:'center',
                alignItems:'center',
            }}>
                <Button size="small" component={Link} to={"/Restaurant/Category/Orderfood"} state={{id:IDs}} sx={{
                    margin: '6px',
                    padding:"0.5rem",
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
                    Order
                </Button>
            </CardActions>
            {/* -------------------------end of card button area---------------------- */}

        </Card>
        //   ----------------end of card area---------------
    )
}

export default CarouselCard2
