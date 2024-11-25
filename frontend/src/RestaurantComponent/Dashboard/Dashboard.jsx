import { Box, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
// import authHeader from '../../../services/auth-header';

export const Dashboard = () => {
  const [orderData, setOrderData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [popularFoodData, setPopularFoodData] = useState([]);
  const navigate = useNavigate();  

  const handleNavigate = () => {
    navigate('ingredient-report');
  };


  const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

  const callData = async () => {
    // const response = await axios.get('http://localhost:8072/FoodiFy/Restaurant/callOrder', { headers: authHeader() });
    // const data = response.data;
    // Mock data for the example:
    const data = [
      { date: '2024-07-01', orders: 5, revenue: 200 },
      { date: '2024-07-02', orders: 8, revenue: 350 },
      { date: '2024-07-03', orders: 4, revenue: 150 },
      { date: '2024-07-04', orders: 6, revenue: 250 },
      { date: '2024-07-05', orders: 7, revenue: 300 },
      { date: '2024-07-06', orders: 3, revenue: 100 },
      { date: '2024-07-07', orders: 9, revenue: 400 },
    ];
    setOrderData(data);
    setRevenueData(data.map(item => ({ date: item.date, revenue: item.revenue })));
    setPopularFoodData([
      { name: 'Burger', value: 200 },
      { name: 'Pizza', value: 700 },
      { name: 'Sandwich', value: 100 },
    ]);
  };

  useEffect(() => {
    callData();
  }, []);

  const targetIncomePercentage = 70; // Mock data for target income percentage

  return (
    <Box sx={{ backgroundColor: '#1a1a1a', minHeight: '100vh', padding: 2 }}>
      <Typography variant="h4" sx={{ color: '#ffffff', marginBottom: 3 }}>
        Restaurant Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: '#333333', color: '#ffffff', padding: 2, height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Orders</Typography>
              <Typography variant="body1">You have 5 new orders today.</Typography>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={orderData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" stroke="#ffffff" />
                  <YAxis stroke="#ffffff" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="orders" stroke="#82ca9d" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: '#333333', color: '#ffffff', padding: 2, height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Revenue</Typography>
              <Typography variant="body1">Today's revenue: $1200</Typography>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" stroke="#ffffff" />
                  <YAxis stroke="#ffffff" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: '#333333', color: '#ffffff', padding: 2, height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Popular Food</Typography>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={popularFoodData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {popularFoodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: '#1e1e1e', color: '#e0e0e0', padding: 2, height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#ff4081' }}>
                Daily Target Income
              </Typography>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: '#ff4081', marginBottom: 1 }}>
                  {targetIncomePercentage}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={targetIncomePercentage}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: '#333333',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(to right, #ff4081, #82ca9d)',
                    },
                  }}
                />
                <Typography variant="body1" sx={{ color: '#e0e0e0', marginTop: 1 }}>
                  of today's target income achieved
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: '#333333', color: '#ffffff', padding: 2, height: '100%' }}>
            <CardContent  >
              <Typography variant="h6" gutterBottom>Customer Feedback</Typography>
              <Typography variant="body1">You have 3 new reviews.</Typography>
            </CardContent>
            <CardContent >
              <Typography variant="h6" gutterBottom>Analytics</Typography> 
              <button
              className="button add-button"
              onClick={handleNavigate}
              sx={{
                backgroundColor: "#95CD41",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#7baf30",
                },
                borderRadius: "20px",
                padding: "10px 20px",
                width: "150px",
              }}
            >
             Ingredient Report
            </button>
            </CardContent>
          </Card>
          
        </Grid>
        {/* <Grid item xs={12}>
          <Card sx={{ backgroundColor: '#333333', color: '#ffffff', padding: 2, height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Analytics</Typography>
              <Typography variant="body1">View analytics and reports.</Typography>
            </CardContent>
          </Card>
        </Grid> */}
      </Grid>
    </Box>
  );
};
