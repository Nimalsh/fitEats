import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Card, Typography, Container, Grid, Paper, List, ListItem, ListItemText, Table, TableBody, TableRow, TableCell, TableHead } from '@mui/material';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import OrderIcon from '@mui/icons-material/ShoppingCart';
import MealIcon from '@mui/icons-material/Restaurant';
import { AccountCircle } from '@mui/icons-material';
import ArticleIcon from '@mui/icons-material/Article';

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  // Dummy data for charts and tables
  const userProgressData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    datasets: [
      {
        label: 'User Progress',
        data: [10, 25, 40, 55, 70], // Example data
        borderColor: '#E34F18',
        backgroundColor: 'rgba(229, 79, 24, 0.2)',
        fill: true,
      },
    ],
  };

  const userProgressOptions = {
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#fff',
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Weeks',
          color: '#fff',
        },
        ticks: {
          color: '#fff',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Progress',
          color: '#fff',
        },
        ticks: {
          color: '#fff',
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const weightProgressData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    datasets: [
      {
        label: 'Weight Progress',
        data: [70, 68, 67, 66, 65], // Example data
        borderColor: '#4F8BE3',
        backgroundColor: 'rgba(79, 139, 227, 0.2)',
        fill: true,
      },
    ],
  };

  const weightProgressOptions = {
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#fff',
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Weeks',
          color: '#fff',
        },
        ticks: {
          color: '#fff',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Weight (kg)',
          color: '#fff',
        },
        ticks: {
          color: '#fff',
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const mostOrderedItemsData = {
    labels: ['Burger', 'Pizza', 'Salad', 'Pasta', 'Soda'],
    datasets: [
      {
        data: [300, 500, 200, 150, 100],
        backgroundColor: [
          'rgba(231, 99, 132, 0.1)', // Red with 50% opacity
          'rgba(88, 25, 9, 0.9)', // Blue with 50% opacity
          'rgba(255, 206, 86, 0.7)', // Yellow with 50% opacity
          'rgba(151, 59, 26, 0.6)', // Green with 50% opacity
          'rgba(23, 100, 89, 0.7)', // Purple with 50% opacity
        ],
        borderColor: '#000000',
        borderWidth: 1,
      },
    ],
  };


  const mostOrderedItemsOptions = {
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#fff',
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const recentOrders = [
    { id: 1, date: '2024-07-01', items: ['Burger', 'Fries'], totalCalories: 1200 },
    { id: 2, date: '2024-07-02', items: ['Salad', 'Juice'], totalCalories: 600 },
    { id: 3, date: '2024-07-03', items: ['Pizza', 'Soda'], totalCalories: 1500 },
  ];

  const mealPlan = [
    { id: 1, name: 'Breakfast: Oatmeal', calories: 300 },
    { id: 2, name: 'Lunch: Chicken Salad', calories: 500 },
    { id: 3, name: 'Dinner: Grilled Fish', calories: 400 },
  ];

  return (
    <Container 
        maxWidth={false} 
        sx={{ 
          backgroundColor: '#1C1B1A', 
          padding: '10px', 
          borderRadius: '8px', 
          width: '100%',
          maxWidth: '100%',
        }}
      >
      <Grid container spacing={1}>

        {/* Left Main Content */}
        <Grid item xs={12} sm={9}>
          <Grid container spacing={1}>

            {/* Project Overview */}
            <Grid item xs={12}>
              <Paper style={{ padding: '10px', backgroundColor: '#181816', marginBottom: '10px' }}>
                <Typography variant="h6" style={{ color: '#979533' }}>FIT EATS</Typography>
                <Typography variant="body2" style={{ color: '#B0BEC5' }}>
                  nutrition and food ordering 
                </Typography>
              </Paper>
            </Grid>

            {/* Statistics Cards */}
            <Grid item xs={12} md={4}>
              <Paper style={{ padding: '10px', backgroundColor: '#181816', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <OrderIcon style={{ color: '#fff' }} />
                <Typography variant="h6" style={{ color: '#979533' }}>All Orders</Typography>
                <Typography variant="h4" style={{ color: '#fff' }}>120</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper style={{ padding: '10px', backgroundColor: '#181816', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <ArticleIcon style={{ color: '#fff' }} />
                <Typography variant="h6" style={{ color: '#979533' }}>Meal Articles</Typography>
                <Typography variant="h4" style={{ color: '#fff' }}>85</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper style={{ padding: '15px', backgroundColor: '#181816', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px',width:"270px" }}>
                <MealIcon style={{ color: '#fff' }} />
                <Typography variant="h6" style={{ color: '#979533' }}>Personal Meal Plan</Typography>
              </Paper>
            </Grid>

            {/* User Progress and Most Ordered Items */}
            <Grid item xs={12} md={6}>
              <Paper style={{ padding: '10px', backgroundColor: '#181816', marginBottom: '10px' }}>
                <Typography variant="h6" style={{ color: '#979533' }}>User Progress</Typography>
                <div style={{ height: '200px', width: '100%' }}>
                  <Line data={userProgressData} options={userProgressOptions} />
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper style={{ padding: '10px', backgroundColor: '#181816', marginBottom: '10px' }}>
                <Typography variant="h6" style={{ color: '#979533' }}>Most Ordered Items</Typography>
                <div style={{ height: '200px', width: '100%' }}>
                  <Pie data={mostOrderedItemsData} options={mostOrderedItemsOptions} />
                </div>
              </Paper>
            </Grid>

            {/* Recent Orders */}
            <Grid item xs={12}>
            <Paper style={{ padding: '10px', backgroundColor: '#181816' }}>
              <Typography variant="h6" style={{ color: '#979533' }}>Recent Orders</Typography>
              <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: '#333' }}>
                  <TableCell style={{ color: '#fff' }}>Date</TableCell>
                  <TableCell style={{ color: '#fff' }}>Items</TableCell>
                  <TableCell style={{ color: '#fff' }}>Total Calories</TableCell>
                </TableRow>
              </TableHead>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell style={{ color: '#fff' }}>{order.date}</TableCell>
                      <TableCell style={{ color: '#fff' }}>{order.items.join(', ')}</TableCell>
                      <TableCell style={{ color: '#fff' }}>{order.totalCalories} Calories</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Right Sidebar */}
        <Grid item xs={12} sm={3}>
          <Paper style={{ padding: '10px', backgroundColor: '#181816', color: '#fff', marginBottom: '10px' }}>
            <Typography variant="h6" style={{ marginBottom: '10px' , color: '#979533' }}>Profile</Typography>
            <Card style={{ backgroundColor: '#424242', marginBottom: '10px', display: 'flex', alignItems: 'center', padding: '10px' }}>
            <AccountCircle style={{ marginRight: '10px', fontSize: 40, color: '#fff' }} />
              <div>
                <Typography variant="h6" style={{ color: '#fff' }}>Nimalsha</Typography>
                <Typography variant="body1" style={{ color: '#fff' }}>nimalsha@example.com</Typography>
              </div>
            </Card>
            <Typography variant="h6" style={{ marginBottom: '10px',color: '#979533' }}>Today's Meal Plan</Typography>
            <Paper style={{ backgroundColor: '#333', padding: '10px' }}>
              <List>
                {mealPlan.map((meal) => (
                  <ListItem key={meal.id}>
                    <ListItemText primary={meal.name} secondary={`Calories: ${meal.calories}`} style={{ color: '#fff' }} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Paper>

          {/* Weight Progress Over Time */}
          <Paper style={{ padding: '10px', backgroundColor: '#181816', marginBottom: '10px' }}>
            <Typography variant="h6" style={{ color: '#979533' }}>Weight Progress Over Time</Typography>
            <div style={{ height: '200px', width: '100%' }}>
              <Line data={weightProgressData} options={weightProgressOptions} />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;



  