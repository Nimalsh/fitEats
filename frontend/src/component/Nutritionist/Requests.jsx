import {
  Box, Button, Card, CardHeader, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton, Typography, ButtonBase, Tabs, Tab
} from '@mui/material';
import React, { useState } from 'react';
import { Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const orders = [
  { id: 1, user: 'Anne Smith', requestDate: '2024-07-15', title: 'Weight Loss', status: 'Pending' },
  { id: 2, user: 'Charlotte Grace', requestDate: '2024-07-14', title: 'Weight Gain', status: 'Finished' },
  { id: 3, user: 'Zoe Madison', requestDate: '2024-07-13', title: 'Other', status: 'Finished' },
  { id: 4, user: 'Ava Lily', requestDate: '2024-07-12', title: 'Weight Gain', status: 'Pending' },
  { id: 5, user: 'James Taylor', requestDate: '2024-07-11', title: 'Muscle gain', status: 'Finished' },
  { id: 6, user: 'Jacob Miller', requestDate: '2024-07-10', title: 'Others', status: 'Pending' },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Pending':
      return '#f44336'; // Red
    case 'Finished':
      return '#4caf50'; // Green
    default:
      return '#9e9e9e'; // Grey
  }
};

function Requests() {
  const navigate = useNavigate();
  const [clickedUser, setClickedUser] = useState(null);
  const [selectedTab, setSelectedTab] = useState('All');

  const handleViewClick = (title, status) => {
    if (status === 'Finished') {
      navigate('view/completed');
    } else {
      switch (title) {
        case 'Weight Loss':
          navigate('/nutri/weightloss/view');
          break;
        case 'Weight Gain':
          navigate('/nutri/weightgain/view');
          break;
        case 'Other':
        case 'Others':
          navigate('/nutri/other/view');
          break;
        default:
          navigate('/nutri/queries/reply'); // Fallback route
          break;
      }
    }
  };

  const handleUserClick = (user) => {
    setClickedUser(user);
    console.log(`Clicked on user: ${user}`);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const filteredOrders = orders.filter(order => 
    selectedTab === 'All' || order.status === selectedTab
  );

  return (
    <Box>
      <Card className='mt-1'>
        <CardHeader
          title={"Requests"}
          sx={{ pt: 2, alignItems: "center" }}
        />
        <Tabs value={selectedTab} onChange={handleTabChange} aria-label="status tabs">
          <Tab label="All" value="All" />
          <Tab label="Pending" value="Pending" />
          <Tab label="Finished" value="Finished" />
        </Tabs>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">User</TableCell>
                <TableCell align="center">Request Date</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((row, index) => (
                <TableRow
                  key={index} // Use index as a key since row has no unique property
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">
                    <ButtonBase onClick={() => handleUserClick(row.user)}>
                      <Box display="flex" alignItems="center" justifyContent="center">
                        <IconButton>
                          <Person />
                        </IconButton>
                        <Typography
                          variant="body2"
                          sx={{ marginLeft: 1, textDecoration: clickedUser === row.user ? 'underline' : 'none' }}
                        >
                          {row.user}
                        </Typography>
                      </Box>
                    </ButtonBase>
                  </TableCell>
                  <TableCell align="center">
                    {row.requestDate}
                  </TableCell>
                  <TableCell align="center">
                    {row.title}
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        backgroundColor: getStatusColor(row.status),
                        color: '#fff',
                        borderRadius: '4px',
                        padding: '0.25em 0.5em',
                        display: 'inline-block',
                      }}
                    >
                      {row.status}
                    </Box>
                  </TableCell>
                  <TableCell align="center" sx={{ marginRight: 10 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleViewClick(row.title, row.status)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}

export default Requests;
