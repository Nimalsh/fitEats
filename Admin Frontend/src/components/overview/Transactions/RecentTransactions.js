import * as React from 'react';
import PropTypes from 'prop-types';
// import { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

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
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {Link} from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';


//----------------------------------------------------------styles for table
const tableSx = {
    width: '100%', 
    overflow: 'hidden', 
    backgroundColor: 'rgba(23, 23, 23, 0.8)',
    marginBottom: '40px',

  "& .MuiTableCell-stickyHeader":{
    fontFamily: 'Poppins',
    backgroundColor: "#111",
    color: '#fff',
    fontSize: 16,
  },

  "& .MuiTableCell-root":{
    color: '#fff',
    bpaymentBottom: "1px solid rgba(210, 210, 210, 0.5)",
    fontFamily: "Poppins",
    fontSize: "16px"
    // cursor: "default"
  },

  "& .MuiSvgIcon-root":{
    color: '#fff',
  },

  "& .MuiTablePagination-menuItem":{
    color:"#000",
    fontSize:"14px"
  },

  "& input":{
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },

}

//----------------------------------------------------------styles for input
const textFSx ={
  color:"#ccc",
  fontFamily:"Poppins",
  fontWeight: '300',
  fontSize: "14px",
  paddingLeft: "5px" ,
}

//----------------------------------------------------------name suggetions for the search
const topNames = [
  "Pizza Hut",
  "KFC",
  "Burger King",
  "McDonald's",
  "Subway"
];

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
function createData(amount, date, time, restaurant, user,type, billItems) {
  const viewItem = <Button variant="outlined" color="success" size="small" component={Link} to="../Restaurant/Category/Orderfood">View Item</Button>

  billItems.forEach(billItem => (
    billItem['viewItem'] = viewItem
    // console.log(billItem))
  ))

  var details = billItems;
  // console.log(details);

    return {  
    date, 
    time,
    user, 
    type,
    restaurant, 
    amount, 
    user,
    details
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

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
        <TableCell component="th" scope="row">{row.date}</TableCell>
        <TableCell >{row.time}</TableCell>
        <TableCell >{row.user}</TableCell>
        <TableCell >{row.type}</TableCell>
        <TableCell >{row.restaurant}</TableCell>
        <TableCell >{row.amount}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, border:"none" }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ marginBottom: 3, marginTop:1}}>
              <Typography fontFamily='Poppins'>
                Bill from {row.restaurant}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead >
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Discount</TableCell>
                    <TableCell align="right">Total price</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.details.map((detailsRow) => (
                    // console.log(typeof(detailsRow)),
                    <TableRow key={detailsRow.foodName}>
                      <TableCell component="th" scope="row">
                        {detailsRow.foodName}
                      </TableCell>
                      <TableCell align="right">{detailsRow.quantity}</TableCell>
                      <TableCell align="right">{detailsRow.price}</TableCell>
                      <TableCell align="right">{detailsRow.discount}</TableCell>
                      <TableCell align="right">
                        {Math.round(detailsRow.quantity * detailsRow.price * 100) / 100 - detailsRow.discount}
                      </TableCell>
                      {/* <TableCell align="right">{detailsRow.viewItem}</TableCell> */}
                      <TableCell>{detailsRow.rateItem}</TableCell>
                      <TableCell>{detailsRow.createComplaint}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
  amount: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
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



function TableActions(details) {

  //----------------------------------------------------------accepting data array object out of details object
  const orders = details.orders;
  // console.log(details);
  var datetime, date, time, price, restaurant, details,user,type;

  const rows = [
    Object.keys(orders).map((key, index) => (

      datetime = orders[key].orderDate.split("T"),
      // console.log(datetime),
      date = datetime[0],
      time = datetime[1].slice(0,8),

      // date = orders[key].orderDate,
      // time = orders[key].orderTime,
      price = orders[key].price,
      restaurant = orders[key].resId,
      details = orders[key].items,
      user = orders[key].userName1,
      type = "Order",
      createData(price, date, time, restaurant, user, type, details)
      ))
  ];

  const rowsData = rows[0];

  //-----------------------------------------------------------end of modyfyng data to the table, now rowsData is a array

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  

  //----------------------------------------------------------Column Define 
  const columns = [
    { id: 'details', label: '', maxWidth: 10},
    // { id: 'payment', label: 'Payment-ID', minWidth: 100},
    { id: 'date', label: 'Date', minWidth: 150 },
    { id: 'time', label: 'Time', minWidth: 100},
    { id: 'user', label: 'User', minWidth: 150},
    { id: 'type', label: 'Type', minWidth: 100 },
    { id: 'restaurant', label: 'Restaurant', minWidth: 200 },
    { id: 'amount', label: 'Amount', minWidth: 100 },
    
    
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


  return (
    <Paper sx={tableSx}>

    <Box sx={{
      display: 'inline-flex',
    }}>
      <Stack spacing={2} sx={{ width: 300, margin:"1% 2%", padding:"0px 0px 10px 5px"}}>
        <Autocomplete
          id="search-box"
          freeSolo
          options={topNames.map((option) => option)}
          renderInput={(params) => <TextField {...params} label={<Typography sx={textFSx}>Enter Name</Typography>} variant="standard" />}
        />
      </Stack>
    </Box>
    
    <TableContainer sx={{ maxHeight: 800 }}>
      <Table stickyHeader sx={{ minWidth: 500 }} aria-label="custom pagination table">

      <TableHead>

          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth}}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {(rowsPerPage > 0
            ? rowsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage): rowsData).map((row) => (
            <Row key={row.id} row={row} />
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell />
            </TableRow>
          )}
          
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
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
        
      </Table>
    </TableContainer>
    </Paper>
  );
}

export default TableActions;