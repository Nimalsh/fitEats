import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

export const Dashboard = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#1a1a1a', // Dark background color
        minHeight: '100vh',
        padding: 2,
      }}
    >
      <Typography variant="h4" sx={{ color: '#ffffff', marginBottom: 3 }}>
        Restaurant Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              backgroundColor: '#333333',
              color: '#ffffff',
              padding: 2,
              height: '100%',
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Orders
              </Typography>
              <Typography variant="body1">
                You have 5 new orders today.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              backgroundColor: '#333333',
              color: '#ffffff',
              padding: 2,
              height: '100%',
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Menu Management
              </Typography>
              <Typography variant="body1">
                Manage your restaurant menu here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card
            sx={{
              backgroundColor: '#333333',
              color: '#ffffff',
              padding: 2,
              height: '100%',
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Analytics
              </Typography>
              <Typography variant="body1">
                View analytics and reports.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
 
