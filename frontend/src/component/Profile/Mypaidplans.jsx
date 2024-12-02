import {
    Box,
    Button,
    Card,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    ButtonBase,
    Avatar,
    Typography,
    Tabs,
    Tab,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRequestsByToken } from '../State/Autoplans/Action'; // Import the action to fetch user requests

const Plans = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [tabIndex, setTabIndex] = useState(0);
    const token = localStorage.getItem('jwt');

    // Function to return a color based on the status
    const getStatusColor = (status) => {
        switch (status) {
           
            case 'Completed':
                return '#66BB6A'; // Green color for finished status
            case 'Pending':
                return '#FFEB3B'; // Yellow color for pending status
           default:
                return '#BDBDBD'; // Grey color for unknown status
        }
    };

    useEffect(() => {
        // Fetch user requests on component mount
        dispatch(getRequestsByToken(token));
    }, [dispatch]);

    const { requests, loading, error } = useSelector((state) => state.request);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const filterOrders = (orders, status) => {
        switch (status) {
            case 0: // In Progress
                return orders.filter(order => order.status === 'Pending');
            case 1: // Completed
                return orders.filter(order => order.status === 'Completed');
          
            default:
                return orders;
        }
    };

    const handleViewClick = (planId, duration) => {
        navigate(`/my-profile/personalized-plan/view/${planId}/${duration}`);
    };

    

    const filteredOrders = filterOrders(requests, tabIndex);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Box>
            <Card className='mt-1'>
                <Tabs value={tabIndex} onChange={handleTabChange} centered>
                    <Tab label="Pending" />
                    <Tab label="Completed" />
                  
                   
                </Tabs>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Request Plan Title</TableCell>
                                <TableCell align="center">Nutritionist</TableCell>
                                <TableCell align="center">
                                    {(() => {
                                        switch (tabIndex) {
                                            case 0: // In Progress
                                                return "Started Date";
                                            case 1: // Completed
                                                return "Completed Date";
                                            
                                         
                                            default:
                                                return "Request Date"; // Default case
                                        }
                                    })()}
                                </TableCell>

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
                                        {row.title}
                                    </TableCell>
                                    <TableCell align="center">
                                       
                                    </TableCell>
                                    <TableCell align="center">
                                    

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
                                    <TableCell align="center">
                                        
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleViewClick(row.planId, row.duration)}
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
};

export default Plans;
