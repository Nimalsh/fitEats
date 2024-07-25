import React from 'react';
import { Card, CardContent, Typography, Grid, Box, ButtonBase } from '@mui/material';
import diet from './diet.png';

const Goalselect = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
        
      <Box sx={{ width: '30%', padding: 2, marginLeft: '100px', marginTop: '30px' }}>
      
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ButtonBase
              sx={{ width: '100%' }}
              onClick={() => alert('Weight Loss selected')}
            >
              <Card sx={{ width: 400, height: 70 }}>
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
                    Weight Loss Goal
                  </Typography>
                </CardContent>
              </Card>
            </ButtonBase>
          </Grid>
          <Grid item xs={12}>
            <ButtonBase
              sx={{ width: '100%' }}
              onClick={() => alert('Weight Gain selected')}
            >
              <Card sx={{ width: 400, height: 70 }}>
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
                    Weight Gain Goal
                  </Typography>
                </CardContent>
              </Card>
            </ButtonBase>
          </Grid>
          <Grid item xs={12}>
            <ButtonBase
              sx={{ width: '100%' }}
              onClick={() => alert('Other selected')}
            >
              <Card sx={{ width: 400, height: 70 }}>
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
                    Other Goal
                  </Typography>
                </CardContent>
              </Card>
            </ButtonBase>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ width: '70%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2 }}>
        <img
          src={diet}
          alt="Placeholder"
          style={{ width: '500px', height: '500px' }}
        />
      </Box>
    </Box>
  );
};

export default Goalselect;
