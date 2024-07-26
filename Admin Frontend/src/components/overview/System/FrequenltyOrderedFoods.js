import * as React from 'react';

import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';

import { FixedSizeList } from 'react-window';

const RowButton = {
  fontFamily: 'Poppins',
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: "0.5px solid rgba(224, 224, 224, 0.9)",

  "& .MuiTypography-root":{
    fontFamily: 'Poppins',
  }

}

function renderRow(props) {
    const { index, style } = props;
  
    return (
      <ListItem style={style} key={index} component="div" disablePadding >
        <ListItemButton sx={RowButton} >
          <Box>
          <Typography>{index+1}. Cheese Pizza</Typography>
          <Typography variant="subtitle2" color="#666">Restaurant Z</Typography>
          </Box>
            <Typography variant="subtitle2">102</Typography>
        </ListItemButton>
      </ListItem>
    );
}

export default function FrequentDishes() {
  return (
    <Box sx={{
        bgcolor: 'rgba(23, 23, 23, 0.8)',
        color: '#fff',
        padding: "15px 10px",
        fontFamily: 'Poppins',
        width: '95%', 
        height: "95%", 
        maxWidth: 320, 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
    }}>
    <Typography varient="h3" fontFamily= 'Poppins' align="center">Today's Most Frequent Dishes</Typography>
        <FixedSizeList
            height={500}
            itemSize={70}
            itemCount={10}
            overscanCount={5}
        >
            {renderRow}
      </FixedSizeList>
    </Box>
  );
}
