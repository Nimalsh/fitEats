import { Box, Grid } from '@material-ui/core'
import React,{useState} from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';
import { FixedSizeList } from 'react-window';

import Typography from '@mui/material/Typography';

import LunchDiningIcon from '@mui/icons-material/LunchDining';

import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const styles = {
    floatingLabelFocusStyle: {
        color: "#fff"
    }
}

function renderRow(props) {
    const { index, style } = props;
    
  
    return (
        
      <ListItem component="div"  sx={{backgroundColor:"#111", opacity:"10"}} >
        <ListItemButton sx={{borderBottom:"1px solid #222"}}>
            <ListItemAvatar>
                <Avatar>
                    <LunchDiningIcon />
                </Avatar>
            </ListItemAvatar>
            
            <ListItemText primary={
                <Typography variant="h6" style={{ color: "#999999" }}>
                Salad
                </Typography>
                }
            color="#fff"/>

            <ListItemText primary={
                <Checkbox {...label} defaultChecked  sx={{
                    color: "#95CD41",
                    '&.Mui-checked': {
                      color: "#95CD41",
                    },
                  }}/>
                }/>
                <Box width="100px" color="#fff"  >
                    <TextField
                id="outlined-number"
                label="Quantity"
                type="number"
                InputLabelProps={{
                    shrink: true,
                    className: styles.floatingLabelFocusStyle,

                }}
                style={{  backgroundColor:"none", color:"#fff"}}
                sx={{ input: { color: "#fff" }, "label": {color: "#fff"}}}

                  
                
                />
                </Box>
               
        </ListItemButton>
       
      </ListItem>      
    );
  }


function Details() {

  return (
        


        
    <Box  style={{marginBottom:"1%"}} pl="21%" width="20vw"

    
     
    >
              
              <FixedSizeList
                  height={420}
                  width="150%"
                  itemSize={90}
                  itemCount={6}  
                  style={{borderRadius : "40px"}}  
                  
              >
                  {renderRow}
                
              </FixedSizeList>

    </Box>
        

        
        
    
  )
}

export default Details