import * as React from 'react';

import Box from '@mui/material/Box';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ListItemButton from '@mui/material/ListItemButton';
import { FixedSizeList } from 'react-window';
import Button from '@mui/material/Button';

import theme from '../../assets/theme/theme';//to use theme provider,need to import this

//Import image
import Image from "../../assets/images/closeup-roasted-meat-with-sauce-vegetables-fries-plate-table.jpg";

import Typography from '@mui/material/Typography';


function renderRow(props) {
    const { index, style } = props;
  
    return (
        
      <ListItem component="div"  sx={{backgroundColor:"#111", opacity:"10"}} >
        <ListItemButton sx={{borderBottom:"1px solid #222"}}>
            <ListItemAvatar>
                <Avatar>
                    <FastfoodIcon />
                </Avatar>
            </ListItemAvatar>
            
            <ListItemText primary={
                <Typography variant="h6" style={{ color: "white" }}>
                250g
                </Typography>
                }
            secondary={
                <Typography style={{ color: "#EFEAEA", fontWeight:"lighter" }}>Total Cholesterol</Typography>
            }
            color="#fff"/>

        </ListItemButton>
       
      </ListItem>      
    );
  }
  

function Nutrition_Card() {
  return (
    //Main box slding card 100vw

    <Box color="#fff" bgcolor="none" width="100vw" mt="4%">
        
       
        <Box display="flex" flexDirection="row"  
          sx = {{[theme.breakpoints.down('md')]: {
            flexDirection:"column" }}
          }
        >


            <Box  width="53%" 
                  mb="5%"
                  ml="5%"
                  sx = {{
                    [theme.breakpoints.down('md')]:{
                      width:"100%",
                      textAlign:"center"
                    }
                  }}
                >
                    <img src={Image} width="65%" style={{borderRadius : "10px"}}/>
                    
                    <Typography color="#95CD41" fontSize="200%" fontWeight="bold">
                    Healthy Zone
                    </Typography>

                    
            </Box>

            <Box>
                    <FixedSizeList
                      height={420}
                      width="150%"
                      itemSize={95}
                      itemCount={6}  
                      style={{borderRadius : "40px"}}  
                    >
                
                        {renderRow}

                        

                          
                    </FixedSizeList>

                    <Box mt="8%" mb="20%" marginLeft="35%"  display="flex" flexDirextion="row" sx={{[theme.breakpoints.down('md')]:{
                      textAlign:"center"
                    }}} >

                            <Button variant="outlined" style={{marginRight:"5%", color:'#95CD41',borderColor: "#95CD41"
                            ,"&:hover": {
                            backgroundColor: "#15e577",
                            borderColor:"#564345"
                            } }}>
                            Confirm
                            </Button>

                            <Button variant="outlined" style={{marginRight:"5%", color:'#F02828',borderColor: "#F02828"
                            ,"&:hover": {
                            backgroundColor: "#15e577",
                            borderColor:"#564345"
                            } }}>
                            Reject
                            </Button>

                    </Box>
                  
            </Box>


        </Box>
    </Box>      
  )
}

export default Nutrition_Card