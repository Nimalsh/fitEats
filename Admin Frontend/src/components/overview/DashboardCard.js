import React from 'react';
import { Avatar, Box, Card, CardContent, Grid, Typography, ThemeProvider} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import theme, { Colours } from '../../assets/theme/theme';

function card (props) {
  const color1 = (props.type === 'up')?"#95CD41":"#F02828";
 
  return (
  <ThemeProvider theme={theme}>
  <Card
    sx={{ 
      height: '90%',
      backgroundColor: "rgba(23, 23, 23, 0.8)", 
    }}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>

          <Typography 
            variant='subtitle1'
            color={Colours.white}
            gutterBottom>
          {/* --------------------------------------------------------------------------Title */}
            {props.title} 
          </Typography>

          <Typography
            color={Colours.white}
            variant="h5">
          {/* --------------------------------------------------------------------------Value */}
            {props.value}
          </Typography>

        </Grid>

        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'transparent',
              height: 70,
              width: 48,
              // padding: '10px 0px'
            }}
          >{/* --------------------------------------------------------------------------Icon */}
            <props.icon fontSize='large' />
          </Avatar>
        </Grid>

      </Grid>

      <Box
        sx={{
          pt: 1,
          display: 'flex',
          alignItems: 'center'
        }}
      >{/* --------------------------------------------------------------------------Arrow (up/down)*/}
        {(props.type === 'up')?<ArrowUpwardIcon sx={{color:color1}}/>:<ArrowDownwardIcon sx={{color:color1}}/>}
        <Typography
          color={color1}
          sx={{
            mr: 1
          }}
          variant="body2"
        >{/* --------------------------------------------------------------------------Percentage */}
          {props.percentage}
        </Typography>
        <Typography
          color={Colours.white}
          variant="caption"
        >{/* --------------------------------------------------------------------------Since */}
          Since {props.since}
        </Typography>
      </Box>

    </CardContent>
  </Card>
  </ThemeProvider>
  );
}

export default card;