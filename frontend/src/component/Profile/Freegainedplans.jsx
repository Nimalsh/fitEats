import { Box, Button, Card, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Tab } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRequestsByToken } from '../State/Autoplans/Action'; // Import the action to fetch user requests

const Plans = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [tabIndex, setTabIndex] = useState(0);
    const token = localStorage.getItem('jwt');
    const [requests, setRequests] = useState([]); 
   
    const getStatusColor = (status) => {
        switch (status) {
            case 'In progress':
                return '#FFA726';
            case 'Finished':
                return '#66BB6A';
            case 'Pending':
                return '#FFEB3B';
            case 'Replied':
                return '#29B6F6';
            default:
                return '#BDBDBD';
        }
    };

    useEffect(() => {
        const fetchRequests = async () => {
            if (token) {
                try {
                    const fetchedRequests = await dispatch(getRequestsByToken(token)); // Step 2: Store the return value
                    setRequests(fetchedRequests);  // Update state with the fetched data
                } catch (error) {
                    console.error('Error fetching requests:', error);
                }
            }
        };

        fetchRequests();  // Call the async function to fetch requests
    }, [dispatch, token]);  // Only re-run when dispatch or token changes

  
    console.log("Fetched Requests from Redux:", requests); 
    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue); // This will trigger re-filtering
    };

    const filterOrders = (orders, tabIndex) => {
        console.log("Filtering Orders:", orders);
        if (!orders) return []; // Check if orders are null or undefined

        const statusMap = ['Completed','Pending', ]; // Map tabIndex to status
        const status = statusMap[tabIndex]; // Get the status based on the tab index

        if (status) {
            console.log("Status",status);
            return orders.filter(order => order.status === status); // Filter based on status
        }

        return orders; // If no matching status, return all orders
    };

    const handleViewClick = (planId, duration) => {
        navigate(`/my-profile/autoplan/view/${planId}/${duration}`);
    };

    const filteredOrders = filterOrders(requests, tabIndex);

   

    return (
        <Box>
            <Card className='mt-1'>
                <Tabs value={tabIndex} onChange={handleTabChange} >
                   
                    <Tab label="Completed" />
                    <Tab label="Pending" />
                   
                </Tabs>

                <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
            <TableRow>
                <TableCell align="left">Request Plan Title</TableCell>
                <TableCell align="center">Duration</TableCell>
                <TableCell align="center">Target Weight Loss/Gain</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center"></TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {filteredOrders.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={5} align="center">
                        No requests available.
                    </TableCell>
                </TableRow>
            ) : (
                filteredOrders.map((row, index) => {
                    const targetWeight = row.target || 0;  // Default to 0 if target is undefined
                    const currentWeight = row.weight || 0;  // Default to 0 if currentWeight is undefined
                    
                    // Calculate the weight difference
                    const weightDifference = targetWeight - currentWeight;

                    // Determine if it's a weight loss or gain
                    const weightText = weightDifference > 0
                        ? `Gain ${Math.abs(weightDifference)}`
                        : weightDifference < 0
                        ? `Loss ${Math.abs(weightDifference)}`
                        : 'No Change';

                    return (
                        <TableRow key={index}>
                            <TableCell align="left">{row.title || '-'}</TableCell>
                            <TableCell align="center">{row.duration || '-'}</TableCell>
                            <TableCell align="center">{weightText}</TableCell>
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
                                    {row.status || '-'}
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
                    );
                })
            )}
        </TableBody>
    </Table>
</TableContainer>
            </Card>
        </Box>
    );
};

export default Plans;
