import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Divider } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const Dashboard = () => {
  const weightData = [
    { month: 'January', avgWeightGain: 2, avgWeightLoss: 1 },
    { month: 'February', avgWeightGain: 2.5, avgWeightLoss: 1.5 },
    { month: 'March', avgWeightGain: 3, avgWeightLoss: 2 },
    { month: 'April', avgWeightGain: -3.5, avgWeightLoss: 2.5 },
    { month: 'May', avgWeightGain: 4, avgWeightLoss: 3 },
    { month: 'June', avgWeightGain: 20.5, avgWeightLoss: 3.5 },
  ];

  const bmiData = [
    { month: 'January', avgBMIGain: 0.5, avgBMILoss: 0.2 },
    { month: 'February', avgBMIGain: 0.6, avgBMILoss: 0.3 },
    { month: 'March', avgBMIGain: 0.7, avgBMILoss: 0.4 },
    { month: 'April', avgBMIGain: -0.8, avgBMILoss: 0.5 },
    { month: 'May', avgBMIGain: 0.9, avgBMILoss: 0.6 },
    { month: 'June', avgBMIGain: 1.0, avgBMILoss: 0.7 },
  ];

  const usersData = [
    { month: 'January', users: 50 },
    { month: 'February', users: 75 },
    { month: 'March', users: 100 },
    { month: 'April', users: 120 },
    { month: 'May', users: 150 },
    { month: 'June', users: 170 },
  ];

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={3}>
        {topTiles.map((tile, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} sx={index < 3 ? { mt: 2 } : {}}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                {index < 3 ? (
                  <>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',marginTop:'30px'}}>
                      {tile.icon === 'up' ? <ArrowUpwardIcon color="success" /> : <ArrowDownwardIcon color="error" />}
                      <Typography variant="h6" color={tile.icon === 'up' ? 'green' : 'red'} sx={{ ml: 1 }}>
                        {tile.percentage}
                      </Typography>
                    </Box>
                    <Typography variant="body1">{tile.title}</Typography>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body2">Current Month</Typography>
                        <Typography variant="h6">{tile.currentMonth}</Typography>
                      </Box>
                      <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body2">Last Month</Typography>
                        <Typography variant="h6">{tile.lastMonth}</Typography>
                      </Box>
                    </Box>
                  </>
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Meal Plan Adherence for Last month</Typography>
                    <Box sx={{ width: 100, height: 100 }}>
                      <CircularProgressbar
                        value={70}
                        text={`${70}%`}
                        styles={buildStyles({
                          pathColor: '#36C2CE',
                          textColor: '#36C2CE',
                          trailColor: '#d3d3d3',
                          backgroundColor: '#f3f3f3',
                        })}
                      />
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body2">Planned Meals</Typography>
                        <Typography variant="h6">43</Typography>
                      </Box>
                      <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body2">Logged Meals</Typography>
                        <Typography variant="h6">56</Typography>
                      </Box>
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>Average Weight Loss & Gain of Users </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                
                  <LineChart data={weightData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="month" axisLine={true} tickLine={true} />
                    <YAxis axisLine={true} tickLine={true} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="avgWeightGain" stroke="#4bc0c0" />
                    <Line type="monotone" dataKey="avgWeightLoss" stroke="#ff6384" />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>Average BMI Loss & Gain of Users</Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
               
                  <LineChart data={bmiData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="month" axisLine={true} tickLine={true} />
                    <YAxis axisLine={true} tickLine={true} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="avgBMIGain" stroke="#4bc0c0" />
                    <Line type="monotone" dataKey="avgBMILoss" stroke="#ff6384" />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>Users Meeting Nutritional Goals </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={usersData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="month" axisLine={true} tickLine={true} />
                    <YAxis axisLine={true} tickLine={true} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="users" fill="#36C2CE" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

const topTiles = [
  {
    icon: 'down',
    percentage: '-80.10%',
    title: 'Plan Requests',
    currentMonth: 40,
    lastMonth: 201,
  },
  {
    icon: 'up',
    percentage: '100.00%',
    title: 'Plans Revenue',
    currentMonth: '$891,700',
    lastMonth: '$0',
  },
  {
    icon: 'up',
    percentage: '75.00%',
    title: 'Users Meeting Nutritional Goals',
    currentMonth: '75%',
    lastMonth: '50%',
  },
  {
    icon: '',
    percentage: '',
    title: '',
    currentMonth: '',
    lastMonth: '',
  }
];

export default Dashboard;
