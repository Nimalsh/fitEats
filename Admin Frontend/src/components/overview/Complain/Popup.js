import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import {ThemeProvider, createTheme } from '@mui/material/styles';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    
    '& .MuiDialogTitle-root':{
        textAlign: 'center',
    },

    '& .MuiTypography-root':{
        fontFamily: 'Poppins',
        color: 'white',
    },

    '& .MuiDialog-paper':{
        backgroundColor: 'rgba(255, 255, 255, 0.20)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(7px)',
    },

    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
        borderTop: '1px solid rgba(255, 255, 255, 0.5)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.5)',
    },

    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        backdropFilter: 'blur(7px)',
    },
}));

//----------------------------------------------------------Theme for buttons
const theme = createTheme({
    palette: {
      success:{
        main: 'rgb(149, 205, 65, 1)'
      },
      error:{ 
        main: '#FAC213'
      }
    },
});

const imageSet = [
    {
      img: 'https://thumbs.dreamstime.com/b/angry-client-couple-complain-bad-service-to-waitress-angry-couple-client-talk-dispute-millennial-waitress-feel-169416275.jpg',
      title: 'Breakfast',
    },
    {
      img: 'https://thumbs.dreamstime.com/b/dissatisfied-restaurant-clients-complaining-bad-service-hostile-angry-client-couple-friends-talking-waiting-staff-145994511.jpg',
      title: 'Camera',
    },
    {
      img: 'https://images.askmen.com/1080x540/2017/12/11-062032-science_finds_a_rude_waiter_can_make_your_food_less_tasty.jpg',
      title: 'Coffee',
    },
    {
      img: 'https://thumbs.dreamstime.com/b/angry-client-couple-complain-bad-service-to-waitress-angry-couple-client-talk-dispute-millennial-waitress-feel-169416275.jpg',
      title: 'Breakfast',
    },
    {
      img: 'https://thumbs.dreamstime.com/b/dissatisfied-restaurant-clients-complaining-bad-service-hostile-angry-client-couple-friends-talking-waiting-staff-145994511.jpg',
      title: 'Camera',
    },
    {
      img: 'https://images.askmen.com/1080x540/2017/12/11-062032-science_finds_a_rude_waiter_can_make_your_food_less_tasty.jpg',
      title: 'Coffee',
    },
    {
      img: 'https://thumbs.dreamstime.com/b/angry-client-couple-complain-bad-service-to-waitress-angry-couple-client-talk-dispute-millennial-waitress-feel-169416275.jpg',
      title: 'Breakfast',
    },
    {
      img: 'https://thumbs.dreamstime.com/b/dissatisfied-restaurant-clients-complaining-bad-service-hostile-angry-client-couple-friends-talking-waiting-staff-145994511.jpg',
      title: 'Camera',
    },
    {
      img: 'https://images.askmen.com/1080x540/2017/12/11-062032-science_finds_a_rude_waiter_can_make_your_food_less_tasty.jpg',
      title: 'Coffee',
    },
    
];

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Button variant="outlined" onClick={handleClickOpen} color="success">
        View
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {props.title}
        </BootstrapDialogTitle>
        <DialogContent dividers>
            <ImageList sx={{ width: 500, height: 300, margin:"auto", mb:"20px" }} cols={3} rowHeight={164}>
                {imageSet.map((item) => (
                    <ImageListItem key={item.img}>
                    <img
                        src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                    />
                    </ImageListItem>
                ))}
            </ImageList>
          <Typography gutterBottom>
            {props.description}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" autoFocus onClick={handleClose} color="error">
            Black List Restaurant
          </Button>
          <Button variant="outlined" autoFocus onClick={handleClose} color="error">
            Block User
          </Button>
          <Button variant="outlined" autoFocus onClick={handleClose} color="error">
            Ignore Complaint
          </Button>
          <Button variant="outlined" autoFocus onClick={handleClose} color="error">
            Add to Compalint List
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </ThemeProvider>
  );
}
