import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, ThemeProvider, Typography } from '@mui/material';
import theme from '../../assets/theme/theme';
import ButtonBase from '@mui/material/ButtonBase';
import Userimage from '../../assets/icons/ant-design_user-outlined.png';
import Resimage from '../../assets/icons/clarity_store-solid.png';

const images = [
  {
    url: Userimage,
    title: 'User',
    width: '50%',
    url2: 'UserPackage'
  },
  {
    url: Resimage,
    title: 'Restaurant',
    width: '50%',
    url2: 'signuprestaurant'
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 600,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  [theme.breakpoints.down('xs')]: {
    width: '200 !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  // backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export default function RegisterBanner0() {
  return (
    <React.Fragment>
    {/* <Typography color="#95CD41" fontWeight="400" variant="h2" fontSize="300%"
          align="center"
        >
          Choose user role
        </Typography> */}
          <ThemeProvider theme={theme}>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
      {images.map((image) => (
        <ImageButton
          focusRipple
          key={image.title}
          onClick={() => {
    window.location.href = `${image.url2}`}}
          style={{
            width: image.width,
          }}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.url})`
            ,left: '41.9%',
            right: '41.9%',
            top: '20.14%',
            bottom: '54.79%'}} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>
    </ThemeProvider>
    </React.Fragment>
  );
}
