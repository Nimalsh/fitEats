import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react';
import axios from 'axios';
import authHeader from "../../../services/auth-header";




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
    bpaymentBottom: "1px solid rgba(210, 210, 210, 0.5)",
    fontFamily: "Poppins",
    fontSize: "16px"
    // cursor: "default"
  },

  "& .MuiSvgIcon-root": {
    color: '#fff',
  },

  "& .MuiTablePagination-menuItem": {
    color: "#000",
    fontSize: "14px"
  }
}

/*const theme = createTheme({
  palette: {
    success: {
      main: '#95CD41'
    },
    error: {
      main: '#FAC213'
    },
    warning: {
      main: '#f44336'
    }
  },
});*/

//----------------------------------------------------------Pagination function
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

//----------------------------------------------------------Pagination Prop definition
TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

//----------------------------------------------------------Table Row Define

var details = [];
var viewBtn = [];
var orderId1 = [];

// const [status, setstatus] = React.useState(false);

function createData(orderId, user, type, amount, date1, time, restaurant) {

  const view = <Button component={Link} to='/restaurantorder' variant="contained" color="success" size="small">View</Button>
  const done = <Button variant="contained" color="success" size="small">Completed</Button>
  const prepare = <Button variant="contained" color="warning" size="small">Start</Button>
  const abort = <Button variant="contained" color="error" size="small">Abort</Button>
  const cancel = <Button variant="contained" color="error" size="small">Cancel</Button>

  const time1 = Date.parse(time);
  // let date1 = new Date(date);

  let T1 = new Date(time).getHours();
  let T2 = new Date(time).getMinutes();
  let T3;

  // if (T2 > 60) {
  //   T1 = T1 + 1;
  //   T2 = T2 - 60;
  //   T3 = T2;
  //   if (T2 < 10) {
  //     T3 = "0" + T2
  //   }
  // }
  // if (T2 > 10 && T2 < 60) {
  //   T3 = T2
  // }
  // if (T2 > 120) {
  //   T1 = T1 + 2;
  //   T2 = T2 - 120;
  //   T3 = T2;
  //   if (T2 < 10) {
  //     T3 = "0" + T2
  //   }
  // }

  var date2 = date1
  var date3 = date2.split("T");
  var date = date3[0];

  var time2 = time
  var time3 = time2.split("T");
  var OTime = time3[1];

  // let setTime = [T1, T2].join(':');

  // let OTime = setTime.toString();

  orderId1.push(orderId);
  // var OT = date.getHours();
  // console.log(time);
  // console.log(setTime);
  // console.log(date);


  console.log(viewBtn);

  return {
    orderId,
    user,
    type,
    amount,
    date,
    OTime,
    restaurant,
    done,
    cancel,
    details
    // -------------------------------------food tems list-----------------------------------
    // details: [
    //   {
    //     item: "Cheese Pizza",
    //     quantity: "2",
    //     price: "2100.00",
    //     discounts: "0",
    //     status: "Queued",
    //     view,
    //     statusButton: prepare
    //   },
    //   {
    //     item: "Sausage Pizza",
    //     quantity: "2",
    //     price: "2200.00",
    //     discounts: "50",
    //     status: "Preparing",
    //     view,
    //     statusButton: abort
    //   },
    // ]
  };
  // ----------------------------------end of food items list----------------------------------------

}

let completeStatus = (oID) => {
  // -----------------------------------to getting food item details------------------------------------------

  console.log("Order completeted")

  const getOfferDetails = async () => {

    const ItemData = new FormData();
    ItemData.append('orderId', oID);

    try {
      const resp = await axios.put(`http://localhost:8072/FoodiFy/Restaurant/updateOrderStatus`, ItemData, { headers: authHeader() });

      TableActions().callData();
      // navigate("/Restaurantprofile")
      // const details = resp.data;

      // setDetails1({ ...details });

      // console.log(details);

      // setItems([...items1]);
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  getOfferDetails();

};
function Row(props) {
  console.log(props);
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const orderId1 = row.orderId;
  return (
    <React.Fragment>
      {(() => {
        if (row.type != "Completed") {
          return (
            <React.Fragment>
              <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                  >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">{row.orderId}</TableCell>

                {/* ---------------------outer data------------------- */}
                <TableCell >{row.user}</TableCell>
                <TableCell >{row.type}</TableCell>
                <TableCell >{row.amount}</TableCell>
                <TableCell >{row.date}</TableCell>
                <TableCell >{row.OTime}</TableCell>
                <TableCell ><Button variant="contained" color="success" size="small" onClick={() => completeStatus(row.orderId)}>Completed</Button></TableCell>
                <TableCell >{row.cancel}</TableCell>
                {/* ----------------end of outer table row------------- */}
              </TableRow>
              <TableRow>

                <TableCell style={{ paddingBottom: 0, paddingTop: 0, border: "none" }} colSpan={3}>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ marginBottom: 3, marginTop: 1 }}>
                      {/* -----------------------inner table----------------------------- */}
                      <Typography fontFamily='Poppins'>
                        Bill to {row.user}
                      </Typography>
                      {/* -----------------------------inner table---------------------------- */}
                      <Table size="small" aria-label="purchases">
                        {/* -----------------------------inner table table head--------------- */}
                        <TableHead>
                          <TableRow>
                            <TableCell>Item</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Currunt Status</TableCell>
                            <TableCell ></TableCell>
                            {/* <TableCell ></TableCell> */}
                          </TableRow>
                        </TableHead>
                        {/* ------------------------end of inner table table head---------------------- */}

                        {/* -------------------------------inner table details------------------------- */}
                        <TableBody>
                          {row.details.map((detailsRow, index) => (
                            <TableRow key={detailsRow.item}>
                              <TableCell component="th" scope="row">
                                {detailsRow.foodName}
                              </TableCell>
                              <TableCell align="center">{detailsRow.quantity}</TableCell>
                              <TableCell align="center">{detailsRow.price}</TableCell>
                              <TableCell>{detailsRow.preparedStatus}</TableCell>
                              <TableCell>
                                <Button component={Link} to={"/restaurantorder"} state={{ detailsRow, orderId1 }} variant="contained" color="success" size="small">View</Button>
                              </TableCell>
                              {/* <TableCell>{detailsRow.statusButton}</TableCell> */}
                            </TableRow>
                          ))}
                        </TableBody>
                        {/* --------------------------end of inner table details------------------------ */}
                      </Table>
                      {/* ----------------------------------end of inner table-------------------------- */}
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          );
        }
      }
      )()}
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
  })
};

//----------------------------------------------------------Table Row Initialize and Sorting
// const rows = [
//   createData('B2342', 'Robert Brown', 'Preparing', 8550, "2022/04/23", "14:23:14"),
//   createData('B2343', 'Rachel Green', 'Queued', 8550, "2022/04/23", "14:23:19"),
//   createData('B2344', 'Robert Brown', 'Preparing', 8550, "2022/04/23", "14:23:14"),
//   createData('B2345', 'Rachel Green', 'Queued', 8550, "2022/04/23", "14:23:19"),
//   createData('B2346', 'Robert Brown', 'Preparing', 8550, "2022/04/23", "14:23:14"),
//   createData('B2347', 'Rachel Green', 'Queued', 8550, "2022/04/23", "14:23:19"),
//   createData('B2348', 'Robert Brown', 'Preparing', 8550, "2022/04/23", "14:23:14"),
//   createData('B2349', 'Rachel Green', 'Queued', 8550, "2022/04/23", "14:23:19"),
//   createData('B2350', 'Robert Brown', 'Preparing', 8550, "2022/04/23", "14:23:14"),
//   createData('B2351', 'Rachel Green', 'Queued', 8550, "2022/04/23", "14:23:19"),
//   createData('B2352', 'Robert Brown', 'Preparing', 8550, "2022/04/23", "14:23:14"),
//   createData('B2353', 'Rachel Green', 'Queued', 8550, "2022/04/23", "14:23:19"),

// ]

var rows = [];


function TableActions() {

  // ----------------------for store response data----------------------
  const [details1, setDetails1] = React.useState([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [num1, setNum1] = React.useState(0);
  const [rows1, setRows1] = React.useState([]);

  //----------------------------------------------------------Column Define 
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

  //----------------------------------------------------------Empty Rows
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  //----------------------------------------------------------Footer Functions
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // -------------------------for the backdrop------------------------------
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  var orderData = {};

  // --------------------------calling orders---------------------------------------------

  const callData = () => {

    details1.length = 0;

    // -----------------------------------to getting food item details------------------------------------------
    const getOfferDetails = async () => {
      const ItemData = new FormData();
      // ItemData.append('foodId', location.state.id.id);
      // ItemData.append('restId', Rid);

      try {
        const resp = await axios.get(`http://localhost:8072/FoodiFy/Restaurant/callOrder`, { headers: authHeader() });

        const details = resp.data;

        setDetails1({ ...details });

        console.log(details);

        // setItems([...items1]);
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    };

    getOfferDetails();

    // --------calling items for cart---------------

  };


  useEffect(() => {

    rows.length = 0;
    callData();

  }, []);

  // -----------------------set details to the rows---------------
  console.log(rows1);
  {
    Object.keys(details1).map((item) => (

      // console.log(x[keyName]),
      // setRows1({ ...formValues, [name]: value }),
      details = details1[item].items,

      rows.push(createData(
        details1[item].id,
        details1[item].userName1,
        details1[item].preparedState,
        details1[item].price,
        details1[item].orderDate,
        details1[item].orderTime,
        // details1[item].items
      )),

      console.log(details1[item].items)

    ))
  }

  console.log(rows);

  return (
    <Box>
      <Paper sx={tableSx}>
        <TableContainer sx={{ maxHeight: 800 }}>
          {/* ----------------------------main outer table------------------------------- */}
          <Table stickyHeader sx={{ minWidth: 500 }} aria-label="custom pagination table">

            {/* --------------------------main table head---------------------------------- */}
            <TableHead>

              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {/* ---------------------end of main table head------------------------------- */}


            {/* ----------------------------main table body------------------------------- */}
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
              ).map((row) => (
                <Row key={row.payment} row={row} />
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            {/* --------------------------end of main table body------------------------- */}

            {/* ----------------------------main table footer---------------------------- */}
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 15, 25, { label: 'All', value: -1 }]}
                  colSpan={7}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
            {/* ------------------------end of main table footer----------------------- */}

          </Table>
          {/* -----------------------end of main table--------------------------------- */}
        </TableContainer>

      </Paper>


    </Box>

  );
}

export default TableActions;