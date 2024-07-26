import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import { FixedSizeList } from 'react-window';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';

import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';

import Logo from '../assets/icons/foodify-logo.png';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// ------------------for the side drawer----------
import Drawer from '@mui/material/Drawer';
import OrderSideDrawer from '../components/restaurant/OrderSideDrawer';
import { Colours } from '../assets/theme/theme';


const pages = ['HOME', 'EXPLORE', 'ABOUT US', 'CONTACT US'];

var ROLE = null;

const mobileMenu = {
  // backgroundColor: 'Transparent',
  '& .MuiMenuItem-root': {
    fontSize: 12,
    color: 'White'
  },

  '& .MuiPopover-paper': {
    backgroundColor: 'rgba(255, 255, 255, 0.27)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(6px)',
  },

}

const userMenu = {
  marginTop: "55px",
  '& .MuiMenuItem-root': {
    fontSize: 12,
    color: 'White'
  },

  '& .MuiPopover-paper': {
    backgroundColor: 'rgba(255, 255, 255, 0.27)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(6px)',
  }

}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '20px',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
// ---------------notifiation start---------------------
function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" sx={{backgroundColor:Colours.white}} disablePadding>

    <ListItem alignItems="flex-start">
      
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
       
        <ListItemText
          primary={"Food Hut "}
          secondary={
            <React.Fragment>
             
              <Typography fontFamily="Poppins" variant="h7" >
                Your order has been started
              </Typography>
              <Typography fontFamily="Poppins" varient="h8">9.00 AM</Typography>
              <Divider sx={{marginTop:'5%',width:'100%'}} />  
      
            </React.Fragment>
            
          }

        />

      </ListItem>
      

    </ListItem>
    
  );
}
// ---------------notifiation end---------------------

// ---------------navigation bar beginin---------------------
export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("TOKEN");
    localStorage.removeItem("ROLE");

    ROLE = null

    navigate("/register/Signup");

  };

  //use this for notifiacation menu
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };


  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderAccountMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={userMenu}
    >
      <MenuItem component={Link} to="/myprofile">
        PROFILE
      </MenuItem>

      <MenuItem>
        TRANSACTION
      </MenuItem>

      <MenuItem >
        LOGOUT
      </MenuItem>

    </Menu>
  );


  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      sx={mobileMenu}
    >
      {pages.map((page) => (
        <MenuItem>
          {page}
        </MenuItem>
      ))}

      <MenuItem>
        NOTIFICATIONS
      </MenuItem>
      <MenuItem>
        PROFILE
      </MenuItem>
    </Menu>
  );


  // -----------------cutomise drawer-------------------------------------
  const SideDrawer = styled(Drawer)({
    '.MuiDrawer-paper': {
      background: Colours.gray3,
      borderRadius: "360px 0px 0px 360px",

    }
  });
  // -------------------------------------------------------------------------

  // --------------------for the side drawer----------------------------------------------
  const [state, setState] = React.useState({ right: false });

  const toggleDrawer = (anchor, open) => (event) => {

    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  //   ------------------End of the side drawer--------------------------------------

  //   ------------------Notifications--------------------------------------


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box sx={{ flexGrow: 1 }}>

      {/* ----------------for the side drawer-------------- */}
      <SideDrawer
        anchor={'right'}
        open={state['right']}
        onClose={toggleDrawer('right', false)}
      >
        <OrderSideDrawer />
      </SideDrawer>
      {/* ---------------end of ide drawer----------------- */}
      <AppBar position="static" style={{ background: '#000', boxShadow: '0 10 5 0 rgba(0,0,0,0.75)' }}>
        <Toolbar>

          <Box
            component="img"
            sx={{
              height: 40,
            }}
            src={Logo}

          />

          {/*------------------------------START SET USERTOLE-------------------------------------------------*/}
          {(() => {
            if (JSON.parse(localStorage.getItem('ROLE'))) {
              ROLE = JSON.parse(localStorage.getItem('ROLE'))[0].authority;

            }
          }
          )()}
          {/*------------------------------END SET USERTOLE-------------------------------------------------*/}

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            {/*------------------------------START Without Resturants Have this option-------------------------------------------------*/}
            {(() => {
              if (ROLE != "restaurant") {
                return (<Button component={Link} to='/' sx={{ my: 2, color: 'white', display: 'block', ml: 10 }}> HOME </Button>);
              }
            }
            )()}
            {(() => {
              if (ROLE != "restaurant") {
                return (<Button component={Link} to='/Explore' sx={{ my: 2, color: 'white', display: 'block', ml: 10 }}> EXPLORE </Button>);
              }
            }
            )()}
            {/*------------------------------END Without Resturants Have this option-------------------------------------------------*/}


            {/*------------------------------START Only unregistered Have this option-------------------------------------------------*/}
            {(() => {
              if (ROLE === null) {
                return (<Button component={Link} to='/' sx={{ my: 2, color: 'white', display: 'block', ml: 10 }}> ABOUT US </Button>);
              }
            }
            )()}

            {(() => {
              if (ROLE === null) {
                return (<Button component={Link} to='/Explore' sx={{ my: 2, color: 'white', display: 'block', ml: 10 }}> CONTACT US </Button>);
              }
            }
            )()}
            {/*------------------------------END Only unregistered Have this option-------------------------------------------------*/}



            {/*------------------------------START Only Resturants Have these option-------------------------------------------------*/}
            {(() => {
              if (ROLE === "restaurant") {
                return (<Button component={Link} to='/RestaurantProfile' sx={{ my: 2, color: 'white', display: 'block', ml: 10 }}> HOME </Button>);
              }
            }
            )()}
            {(() => {
              if (ROLE === "restaurant") {
                return (<Button component={Link} to='/AddFoodMenu' sx={{ my: 2, color: 'white', display: 'block', ml: 10 }}> MENU </Button>);
              }
            }
            )()}
            {(() => {
              if (ROLE === "restaurant") {
                return (<Button component={Link} to='/Restaurant/AddOffers' sx={{ my: 2, color: 'white', display: 'block', ml: 10 }}> OFFERS </Button>);
              }
            }
            )()}
            {/*------------------------------END Only Resturants Have these option-------------------------------------------------*/}


            {/*------------------------------START Only Premium Have these option-------------------------------------------------*/}
            {/*{(() => {
              if (ROLE === "premiumUser") {
                return (<Button component={Link} to='/Image_Upload' sx={{ my: 2, color: 'white', display: 'block', ml: 10 }}> IMAGE </Button>);
              }
            }
          )()}*/}
            {(() => {
              if (ROLE === "premiumUser") {
                return (<Button component={Link} to='/Intake' sx={{ my: 2, color: 'white', display: 'block', ml: 10 }}> CHART </Button>);
              }
            }
            )()}
            {/*------------------------------END Only Premium Have these option-------------------------------------------------*/}

            {/*------------------------------START Only Registered user and Premium Have this option-------------------------------------------------*/}
            {(() => {
              if (ROLE === "User" || ROLE === "premiumUser") {
                return (<Button component={Link} to='/PurchaseHistory' sx={{ my: 2, color: 'white', display: 'block', ml: 10 }}> PURCHASE  </Button>);
              }
            }
            )()}

            {(() => {
              if (ROLE === "User" || ROLE === "premiumUser") {
                return (<Button component={Link} to='/Complaints' sx={{ my: 2, color: 'white', display: 'block', ml: 10 }}> COMPLAIN  </Button>);
              }
            }
            )()}
            {/*------------------------------END Only Registered user and Premium Have this option-------------------------------------------------*/}

            {/*------------------------------START Only Registered user and Premium Have this option-------------------------------------------------*/}
            {(() => {
              if (ROLE === "admin") {
                return (<Button component={Link} to='/dashboard' sx={{ my: 2, color: 'white', display: 'block', ml: 10 }}> DASHBOARD  </Button>);
              }
            }
            )()}
            {/*------------------------------END Only Registered user and Premium Have this option-------------------------------------------------*/}

          </Box>




          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for items"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>


            {/*------------------------------START Notification Icons-------------------------------------------------*/}
            {(() => {
              if (ROLE != null) {
                return (<>
                  <IconButton
                      size="large"
                      aria-label="show 1 new notifications"
                      color="inherit"
                      backgroundColor="#FFFFFF"
                    >
                      <Badge badgeContent={1} color="error">
                        <NotificationsIcon aria-describedby={id} variant="contained" style={{ color:Colours.white }} onClick={handleClick} />
                      </Badge>
                    </IconButton>
            
                  <Popover
             
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
            
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                  >
               <Box
                 
                >
                  <FixedSizeList
                    height={400}
                    width={360}
                    itemSize={106}
                    itemCount={100}
                    overscanCount={5}
                  >
                    {renderRow}
                  </FixedSizeList>
                </Box>
                  </Popover>
                </>);
              }
            }
            )()}
            {/*------------------------------END Notification Icons-------------------------------------------------*/}

            {/*------------------------------START Only Registered user and Premium Have this option-------------------------------------------------*/}
            {/* -------------------------shopping cart------------------------- */}
            {(() => {
              if (ROLE === "User" || ROLE === "premiumUser") {
                return (
                  <IconButton
                    sx={{ my: 2, color: 'white', display: 'block', ml: 1 }} onClick={toggleDrawer('right', true)}>
                    <ShoppingCartIcon />
                  </IconButton>);
              }
            }
            )()}
            {/*------------------------------END Only Registered user and Premium Have this option-------------------------------------------------*/}



            {/*------------------------------START User Icons-------------------------------------------------*/}

            {(() => {
              if (ROLE != null && ROLE != "admin" && ROLE != "restaurant") {
                return (<IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  color="inherit"
                  onClick={handleProfileMenuOpen}

                  component={Link}
                  to="/myProfile"
                >
                  <AccountCircle />
                </IconButton>);
              }
            }
            )()}


            {(() => {
              if (ROLE != null) {
                return (<IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  color="inherit"
                >
                  <LogoutIcon onClick={logout} />
                </IconButton>);
              }
            }
            )()}


            {/*------------------------------END User Icons-------------------------------------------------*/}


            {/*------------------------------START Login Icons-------------------------------------------------*/}
            {(() => {
              if (ROLE === null) {
                return (
                  <Button component={Link} to='/login' sx={{ my: 2, color: 'white', display: 'block', ml: 1 }}> LogIn  </Button>
                );
              }
            }
            )()}
            {/*------------------------------END Login Icons-------------------------------------------------*/}



            {/*------------------------------START SignUp Icons-------------------------------------------------*/}
            {(() => {
              if (ROLE === null) {
                return (
                  <Button component={Link} to='/register/Signup' sx={{ my: 2, color: 'white', display: 'block', ml: 1 }}> SignUp  </Button>
                );
              }
            }
            )()}
            {/*------------------------------END Signup Icons-------------------------------------------------*/}



          </Box>
          {renderAccountMenu}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderAccountMenu}
      {renderMobileMenu}
    </Box>
  );

}
