import { Box, Button, Card, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ButtonBase, Avatar, Typography, Tabs, Tab } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const orders = [
    { id: 1, user: 'John Smith', requestDate: '2024-07-15', title: 'Weight Loss', status: 'Pending', userImage: 'https://media.istockphoto.com/id/180866257/photo/design-is-his-passion.jpg?s=2048x2048&w=is&k=20&c=4Jmxxt1oo1bQdOooPl5anov8ZCcyLK1bDoz-FJaLxZ4=' },
    { id: 2, user: 'Sarah Johnson', requestDate: '2024-07-14', title: 'Weight Gain', status: 'Replied', userImage: 'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg' },
    { id: 3, user: 'Michael Williams', requestDate: '2024-07-13', title: 'Other', status: 'Replied', userImage: 'https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg' },
    { id: 4, user: 'Emily Brown', requestDate: '2024-07-12', title: 'Weight Gain', status: 'Finished', userImage: 'https://sources.roboflow.com/dzuGOec8v6bRLhxo590fQ69a22N2/cNc6Q78185vhZDZhqEdS/original.jpg' },
    { id: 5, user: 'Jessica Miller', requestDate: '2024-07-11', title: 'Muscle gain', status: 'Pending', userImage: 'https://t4.ftcdn.net/jpg/03/03/11/75/360_F_303117590_NNmo6BS2fOBEmDp8uKs2maYmt03t8fSL.jpg' },
    { id: 6, user: 'Ashley Garcia', requestDate: '2024-07-10', title: 'Weight Gain', status: 'In progress', userImage: 'https://via.placeholder.com/150/6' },
];

const getStatusColor = (status) => {
    switch (status) {
        case 'Pending':
            return '#f44336'; // Red
        case 'In progress':
            return '#4caf50'; // Green
        case 'Replied':
            return '#F0ED0C'; // Yellow
        case 'Finished':
            return '#2196f3'; // Blue
        default:
            return '#9e9e9e'; // Grey
    }
};

function Plans() {
    const navigate = useNavigate();
    const [clickedUser, setClickedUser] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);

    const handleUserClick = (user) => {
        setClickedUser(user);
        console.log(`Clicked on user: ${user}`);
    };

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const filterOrders = (orders, status) => {
        switch (status) {
            case 0: // In Progress
                return orders.filter(order => order.status === 'In progress');
            case 1: // Completed
                return orders.filter(order => order.status === 'Finished');
            case 2: // Requested
                return orders.filter(order => order.status === 'Pending');
            case 3: // Replied
                return orders.filter(order => order.status === 'Replied');
            default:
                return orders;
        }
    };

    const handleViewClick = (status) => {
        if (status === 'Finished') {
            navigate('/my-profile/completed');
        } else {
            navigate('/my-profile/personalized-plan/view');
        }
    };

    const filteredOrders = filterOrders(orders, tabIndex);

    return (
        <Box>
            <Card className='mt-1'>
                <Tabs value={tabIndex} onChange={handleTabChange} centered>
                    <Tab label="In Progress" />
                    <Tab label="Completed" />
                    <Tab label="Requested" />
                    <Tab label="Replied" />
                </Tabs>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Request Plan Title</TableCell>
                                <TableCell align="center">Nutritionist</TableCell>
                                <TableCell align="center">Request Date</TableCell>
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
                                        {row.title}
                                    </TableCell>
                                    <TableCell align="center">
                                        <ButtonBase onClick={() => handleUserClick(row.user)}>
                                            <Box display="flex" alignItems="center" justifyContent="center">
                                                <Avatar src={row.userImage} alt={row.user} sx={{ width: 32, height: 32 }} />
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
                                        {row.status !== "Pending" && (
                                          <Button
                                            variant="contained"
                                            color="primary"
                                           onClick={() => handleViewClick(row.status)}
                                            >
                                            View
                                        </Button>
                                       )}
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

export default Plans;
