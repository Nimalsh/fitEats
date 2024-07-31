import {
  Box, Button, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Typography, ButtonBase, Avatar, Tabs, Tab
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const orders = [
  { id: 1, user: 'Ming Wei', requestDate: '2024-07-15', title: 'Weight Loss', status: 'Not Replied', description: 'A program for losing weight', userImage: 'https://media.istockphoto.com/id/180866257/photo/design-is-his-passion.jpg?s=2048x2048&w=is&k=20&c=4Jmxxt1oo1bQdOooPl5anov8ZCcyLK1bDoz-FJaLxZ4=' },
  { id: 2, user: 'Nova Skye ', requestDate: '2024-07-14', title: 'Weight Gain', status: 'Replied', description: 'Nutrition plan for gaining muscle mass', userImage: 'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg' },
  { id: 3, user: 'Zephyr Orion', requestDate: '2024-07-13', title: 'Other', status: 'Replied', description: 'Customized dietary requirements', userImage: 'https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg' },
  { id: 4, user: 'Luna Belle', requestDate: '2024-07-12', title: 'Weight Gain', status: 'Not Replied', description: 'Weight gain strategy', userImage: 'https://sources.roboflow.com/dzuGOec8v6bRLhxo590fQ69a22N2/cNc6Q78185vhZDZhqEdS/original.jpg' },
  { id: 5, user: 'Liam Daniel', requestDate: '2024-07-11', title: 'Muscle gain', status: 'Replied', description: 'Building muscle mass plan', userImage: 'https://t4.ftcdn.net/jpg/03/03/11/75/360_F_303117590_NNmo6BS2fOBEmDp8uKs2maYmt03t8fSL.jpg' },
  { id: 6, user: 'Anne Smith', requestDate: '2024-07-10', title: 'Others', status: 'Not Replied', description: 'General nutrition advice', userImage: 'https://via.placeholder.com/150/6' },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Not Replied':
      return '#f44336'; // Red
    case 'Replied':
      return '#4caf50'; // Green
    default:
      return '#9e9e9e'; // Grey
  }
};

function Query() {
  const navigate = useNavigate();
  
  const handleViewClick = (status) => {
    if (status === 'Replied') {
      navigate('/nutri/queries/replied');
    } else {
      navigate('/nutri/queries/reply');
    }
  };

  const [clickedUser, setClickedUser] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);

  const handleUserClick = (user) => {
    setClickedUser(user);
    console.log(`Clicked on user: ${user}`);
    // Implement any other logic for user click, e.g., navigation or modal popup
  };

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const filteredOrders = orders.filter((order) => {
    if (tabIndex === 1) return order.status === 'Replied';
    if (tabIndex === 2) return order.status === 'Not Replied';
    return true;
  });

  return (
    <Box>
      <Card className='mt-1'>
        <CardHeader
          title={"Queries"}
          sx={{ pt: 2, alignItems: "center" }}
        />
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="All" />
          <Tab label="Replied" />
          <Tab label="Not Replied" />
        </Tabs>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">User</TableCell>
                <TableCell align="center">Post Date</TableCell>
                <TableCell align="center">Description</TableCell>
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
                        <Avatar src={row.userImage} alt={row.user} sx={{ width: 32, height: 32 }} />
                        <Typography
                          variant="body2"
                          sx={{ marginLeft: 1, textDecoration: clickedUser === row.user ? 'underline' : 'none' }}
                        >
                          {row.user} {/* Display the actual user name */}
                        </Typography>
                      </Box>
                    </ButtonBase>
                  </TableCell>
                  <TableCell align="center">
                    {row.requestDate} {/* Display the request date */}
                  </TableCell>
                  <TableCell align="center" sx={{ maxWidth: 100 }}>
                    <Typography noWrap title={row.description}>
                      {row.description.length > 10 ? `${row.description.substring(0, 10)}...` : row.description}
                    </Typography>
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
                    <Button variant="contained" color="primary" onClick={() => handleViewClick(row.status)}>
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

export default Query;
