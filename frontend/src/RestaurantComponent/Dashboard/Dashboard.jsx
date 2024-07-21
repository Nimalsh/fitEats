import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Paper, Table, TableHead, TableBody, TableCell, TableContainer, TableFooter, TablePagination, TableRow, Button, IconButton, Collapse } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { KeyboardArrowDown as KeyboardArrowDownIcon, KeyboardArrowUp as KeyboardArrowUpIcon, FirstPage as FirstPageIcon, LastPage as LastPageIcon, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import PropTypes from 'prop-types';
import axios from 'axios';
// import authHeader from '../../../services/auth-header';

const tableSx = {
  width: '100%',
  overflow: 'hidden',
  backgroundColor: 'rgba(23, 23, 23, 0.8)',
  marginBottom: '40px',
  "& .MuiTableCell-stickyHeader": {
    fontFamily: 'Poppins',
    backgroundColor: "#111",
    color: '#fff',
    fontSize: 16,
  },
  "& .MuiTableCell-root": {
    color: '#fff',
    borderBottom: "1px solid rgba(210, 210, 210, 0.5)",
    fontFamily: "Poppins",
    fontSize: "16px"
  },
  "& .MuiSvgIcon-root": {
    color: '#fff',
  },
  "& .MuiTablePagination-menuItem": {
    color: "#000",
    fontSize: "14px"
  }
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const completeStatus = async (oID) => {
    console.log("Order completed");
    const ItemData = new FormData();
    ItemData.append('orderId', oID);
    // try {
    //   await axios.put(`http://localhost:8072/FoodiFy/Restaurant/updateOrderStatus`, ItemData, { headers: authHeader() });
    // } catch (err) {
    //   console.error(err);
    // }
  };

  return (
    <React.Fragment>
      {row.type !== "Completed" && (
        <React.Fragment>
          <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>
              <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">{row.orderId}</TableCell>
            <TableCell>{row.user}</TableCell>
            <TableCell>{row.type}</TableCell>
            <TableCell>{row.amount}</TableCell>
            <TableCell>{row.date}</TableCell>
            <TableCell>{row.OTime}</TableCell>
            <TableCell>
              <Button variant="contained" color="success" size="small" onClick={() => completeStatus(row.orderId)}>Completed</Button>
            </TableCell>
            <TableCell>{row.cancel}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0, border: "none" }} colSpan={3}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ marginBottom: 3, marginTop: 1 }}>
                  <Typography fontFamily='Poppins'>
                    Bill to {row.user}
                  </Typography>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Current Status</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row.details.map((detailsRow) => (
                        <TableRow key={detailsRow.item}>
                          <TableCell component="th" scope="row">{detailsRow.foodName}</TableCell>
                          <TableCell align="center">{detailsRow.quantity}</TableCell>
                          <TableCell align="center">{detailsRow.price}</TableCell>
                          <TableCell>{detailsRow.preparedStatus}</TableCell>
                          <TableCell>
                            <Button component={Link} to={"/restaurantorder"} state={{ detailsRow, orderId1: row.orderId }} variant="contained" color="success" size="small">View</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    payment: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    details: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number,
        customerId: PropTypes.string,
        date: PropTypes.string,
      }),
    ),
    restaurant: PropTypes.string.isRequired,
  }).isRequired,
};

export const Dashboard = () => {
  const [details1, setDetails1] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  const columns = [
    { id: 'details', label: '', maxWidth: 10 },
    { id: 'payment', label: 'Payment-ID', minWidth: 150 },
    { id: 'user', label: 'User', minWidth: 170 },
    { id: 'type', label: 'Status', minWidth: 200 },
    { id: 'amount', label: 'Amount', minWidth: 100 },
    { id: 'date', label: 'Date', minWidth: 100 },
    { id: 'time', label: 'Time', minWidth: 100 },
    { id: 'done', label: '', minWidth: 100 },
    { id: 'cancel', label: '', minWidth: 100 },
  ];

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const callData = async () => {
    const ItemData = new FormData();
    // try {
    //   const resp = await axios.get(`http://localhost:8072/FoodiFy/Restaurant/callOrder`, { headers: authHeader() });
    //   setDetails1(resp.data);
    // } catch (err) {
    //   console.error(err);
    // }
  };

  useEffect(() => {
    rows.length = 0;
    callData();
  }, []);

  useEffect(() => {
    const newRows = Object.keys(details1).map((item) => ({
      orderId: details1[item].id,
      user: details1[item].userName1,
      type: details1[item].preparedState,
      amount: details1[item].price,
      date: details1[item].orderDate,
      OTime: details1[item].orderTime,
      details: details1[item].items,
      done: <Button variant="contained" color="success" size="small">Completed</Button>,
      cancel: <Button variant="contained" color="error" size="small">Cancel</Button>,
    }));
    setRows(newRows);
  }, [details1]);

  return (
    <Box sx={{ backgroundColor: '#1a1a1a', minHeight: '100vh', padding: 2 }}>
      <Typography variant="h4" sx={{ color: '#ffffff', marginBottom: 3 }}>
        Restaurant Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: '#333333', color: '#ffffff', padding: 2, height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Orders</Typography>
              <Typography variant="body1">You have 5 new orders today.</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: '#333333', color: '#ffffff', padding: 2, height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Menu Management</Typography>
              <Typography variant="body1">Manage your restaurant menu here.</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ backgroundColor: '#333333', color: '#ffffff', padding: 2, height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Order Management</Typography>
              <TableContainer component={Paper} sx={tableSx}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                      <Row key={row.orderId} row={row} />
                    ))}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        colSpan={6}
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: { 'aria-label': 'rows per page' },
                          native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: '#333333', color: '#ffffff', padding: 2, height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Revenue</Typography>
              <Typography variant="body1">Today's revenue: $1200</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: '#333333', color: '#ffffff', padding: 2, height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Customer Feedback</Typography>
              <Typography variant="body1">You have 3 new reviews.</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ backgroundColor: '#333333', color: '#ffffff', padding: 2, height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Analytics</Typography>
              <Typography variant="body1">View analytics and reports.</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
 


