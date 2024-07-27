import { Box, Button, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ButtonBase, Avatar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const orders = [
    { id: 1, user: 'User1', requestDate: '2024-07-15', title: 'Weight Loss', status: 'Pending', userImage: 'https://media.istockphoto.com/id/180866257/photo/design-is-his-passion.jpg?s=2048x2048&w=is&k=20&c=4Jmxxt1oo1bQdOooPl5anov8ZCcyLK1bDoz-FJaLxZ4=' },
    { id: 2, user: 'User2', requestDate: '2024-07-14', title: 'Weight Gain', status: 'Replied', userImage: 'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg' },
    { id: 3, user: 'User3', requestDate: '2024-07-13', title: 'Other', status: 'Replied', userImage: 'https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg' },
    { id: 4, user: 'User4', requestDate: '2024-07-12', title: 'Weight Gain', status: 'Finished', userImage: 'https://sources.roboflow.com/dzuGOec8v6bRLhxo590fQ69a22N2/cNc6Q78185vhZDZhqEdS/original.jpg' },
    { id: 5, user: 'User5', requestDate: '2024-07-11', title: 'Muscle gain', status: 'Pending', userImage: 'https://t4.ftcdn.net/jpg/03/03/11/75/360_F_303117590_NNmo6BS2fOBEmDp8uKs2maYmt03t8fSL.jpg' },
    { id: 6, user: 'User6', requestDate: '2024-07-10', title: 'Others', status: 'In progress', userImage: 'https://via.placeholder.com/150/6' },
];

const getStatusColor = (status) => {
    switch (status) {
        case 'Pending':
            return '#f44336'; // Orange
        case 'In progress':
            return '#4caf50'; // Green
        case 'Replied':
            return '#F0ED0C';
        default:
            return '#9e9e9e'; // Grey
    }
};

function Plans() {
    const navigate = useNavigate();
    const [clickedUser, setClickedUser] = useState(null);

    const handleUserClick = (user) => {
        setClickedUser(user);
        console.log(`Clicked on user: ${user}`);
        // Implement any other logic for user click, e.g., navigation or modal popup
    };

    return (
        <Box>
            <Card className='mt-1'>
                <CardHeader
                  
                    sx={{ pt: 2, alignItems: "center" }}
                />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>id</TableCell>
                                <TableCell align="center">Request Plan title</TableCell>
                                <TableCell align="center">Nutritionist</TableCell>
                                <TableCell align="center">Request Date</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((row, index) => (
                                <TableRow
                                    key={index} // Use index as a key since row has no unique property
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.title} {/* Display the order title */}
                                    </TableCell>
                                    <TableCell align="center">
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
                                        {row.status !== 'Pending' && (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => navigate('/my-profile/personalized-plan/view')}
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
