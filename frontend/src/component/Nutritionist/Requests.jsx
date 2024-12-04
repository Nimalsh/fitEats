import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Button, Card, CardHeader, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton, Typography, ButtonBase, Tabs, Tab
} from '@mui/material';
import { Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getRequestsByNutritionistId } from '../State/Requests/Action'; // Adjust the import path accordingly

function Requests() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [clickedUser, setClickedUser] = React.useState(null);
  const [selectedTab, setSelectedTab] = React.useState('All');

  const { requests, loading, error } = useSelector(state => state.request); // Adjust according to your state structure

  useEffect(() => {
    const token = localStorage.getItem("jwt"); // Adjust based on how you store the token
    console.log("Token:", token);
    if (token) {
      dispatch(getRequestsByNutritionistId(token));
    }
  }, [dispatch]);

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

  const handleViewClick = (title, status, requestId, planId, duration) => {
    // Convert title to lowercase
    const lowerCaseTitle = title.toLowerCase();
    
    if (status === 'Finished' || status === 'Completed') {
      if (lowerCaseTitle === 'other' || lowerCaseTitle === 'others'||lowerCaseTitle === 'other goal') {
        if (planId) {
          navigate(`/nutri/weightloss/view/proceed/${planId}/${duration}`);
        } else {
          navigate(`/nutri/other/view/${requestId}`);
        }
      } else {
        navigate(`/nutri/weightloss/view/proceed/${planId}/${duration}`);
      }
    } else {
      switch (lowerCaseTitle) {
        case 'weight loss':
          navigate(`/nutri/weightloss/view/${requestId}`);
          break;
        case 'weight gain':
          navigate(`/nutri/weightgain/view/${requestId}`);
          break;
        case 'other goal':
        case 'other':
        case 'others':
          navigate(`/nutri/other/view/${requestId}`);
          break;
        default:
          navigate(`/nutri/queries/reply/${requestId}`); // Fallback route
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

  const filteredOrders = requests.filter(order =>
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
                <TableCell align="center">
                  {selectedTab === 'Finished' ? 'Completed Date' : 'Request Date'}
                </TableCell>
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
                          {row.name}
                        </Typography>
                      </Box>
                    </ButtonBase>
                  </TableCell>
                  <TableCell align="center">
                    {selectedTab === 'Finished' ? row.completedDate : row.requestDate}
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
                      onClick={() => handleViewClick(row.title, row.status, row.requestId, row.planId, row.duration, row.status)}
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
