import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { Colours } from '../../assets/theme/theme';
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { FixedSizeList } from 'react-window';






const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
}); 

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


export default function BasicPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
          backgroundColor="#FFFFFF"
        >
          <Badge badgeContent={17} color="error">
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
    </div>
  );
}
