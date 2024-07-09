import { Box } from '@mui/system';
import React from 'react';
import theme, { Colours } from '../../assets/theme/theme';
import { IconButton, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {Link} from 'react-router-dom';


const OrderDescription = (props) => {

    const details = props.details;
    var todayDate = new Date(); //Today Date    
    const Edate1 = props.EndDate;
    const eDate1 = new Date(Edate1);
    // console.log(details);
  return (
    
    <Box sx={{
        width: "85%",
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        // marginBottom: "2rem",
        [theme.breakpoints.down('sm')]: {
            width: "100%",
            marginTop:"45px",
        },
    }}>

        {/* --------------beginin of the description area---------------- */}
        <Box sx={{
            display: "flex",
            flexDirection: "column",
        }}>
            {/* ------------topic area--------------------- */}
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                padding: "1rem",
            }}>
                <IconButton component={Link} to={"/Restaurant/Category"} state={{id:details.catId}} >
                    <ArrowBackIosIcon sx={{
                        color: Colours.green, '&:hover': {
                            color: Colours.yellow,
                            [theme.breakpoints.down('sm')]: {
                                height:"80%",
                                marginTop:"30px",
                            },
                        },
                        fontSize: "2rem",
                    }} />
                </IconButton>

                <Typography variant='h4' sx={{
                    color: Colours.green,
                    marginTop: "0.5%",
                    [theme.breakpoints.down('sm')]: {
                        fontSize: '20px',
                        marginRight: "10%",
                        marginTop:"12px",
                    }
                }}>
                    {details.name}
                </Typography>

            </Box>
            {/* ------------end of topic area--------------- */}

                {/* -------description begin-------------- */}
            <Typography sx={{
                color:Colours.green,
                marginLeft:"2rem",
            }}>
                Description
            </Typography>

            <Typography variant="body1" gutterBottom sx={{
                color: Colours.grayWhite,
                justifyContent: 'center',
                textAlign: 'center',
                fontSize: '1rem',
                padding: '1%',
                width: "80%",
                margin: "auto",
                marginRight: "15%",
                transition: 'transform .2s', '&:hover': {
                    transform: 'scale(1.04)',
                    opacity: 4,
                },
                [theme.breakpoints.down('sm')]: {
                    fontSize: '14px',
                    marginRight: "10%",
                }
            }}>
                {details.description}
                <br />
                <br />
                Discount: {(() => {
                        if (todayDate < eDate1) {
                            return (
                                // num*price
                                details.discount+"%"
                                // handleAmount(num*price)
                            );
                        }
                    }
                    )()}
                    {(() => {
                        if (todayDate > eDate1) {
                            return (
                                // num*price
                                0+"%"
                                // handleAmount(num*price)
                            );
                        }
                    }
                    )()}
            </Typography>

        </Box>
        {/* --------------end of the description area---------------- */}

    </Box>

  )
}

export default OrderDescription
