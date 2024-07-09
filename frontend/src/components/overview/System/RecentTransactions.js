import * as React from 'react';
import PropTypes from 'prop-types';
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
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { border } from '@mui/system';

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
  }
}


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
function createData(payment, user, type, amount, date, time, restaurant) {
  return { 
    payment, 
    user, 
    type, 
    amount, 
    date, 
    time,
    restaurant, 
    details: [
      {
        item: "Cheese Pizza",
        quantity: "2",
        price: "2100.00",
        discounts: "0"
      },
      {
        item: "Sausage Pizza",
        quantity: "2",
        price: "2200.00",
        discounts: "50"
      },
    ] };
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
        <TableCell component="th" scope="row">{row.payment}</TableCell>
        <TableCell >{row.user}</TableCell>
        <TableCell >{row.type}</TableCell>
        <TableCell >{row.amount}</TableCell>
        <TableCell >{row.date}</TableCell>
        <TableCell >{row.time}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, border:"none" }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ marginBottom: 3, marginTop:1}}>
              <Typography fontFamily='Poppins'>
                Bill from {row.restaurant}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Discount</TableCell>
                    <TableCell align="right">Total price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.details.map((detailsRow) => (
                    <TableRow key={detailsRow.item}>
                      <TableCell component="th" scope="row">
                        {detailsRow.item}
                      </TableCell>
                      <TableCell>{detailsRow.quantity}</TableCell>
                      <TableCell>{detailsRow.price}</TableCell>
                      <TableCell>{detailsRow.discounts}</TableCell>
                      <TableCell align="right">
                        {Math.round(detailsRow.quantity * detailsRow.price * 100) / 100 - detailsRow.discounts}
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
const rows = [
  createData('B2342','Robert Brown','Food Order',8550, "2022/04/23","14:23:14", "RestaurantZ"),  
  createData('B2343','Robert Brown','Food Order',8550, "2022/04/23","14:23:14", "RestaurantZ"),  
  createData('B2344','Robert Brown','Food Order',8550, "2022/04/23","14:23:14", "RestaurantZ"),  
  createData('B2345','Robert Brown','Food Order',8550, "2022/04/23","14:23:14", "RestaurantZ"),  
  createData('B2346','Robert Brown','Food Order',8550, "2022/04/23","14:23:14", "RestaurantZ"),  
  createData('B2347','Robert Brown','Food Order',8550, "2022/04/23","14:23:14", "RestaurantZ"),  
  createData('B2348','Robert Brown','Food Order',8550, "2022/04/23","14:23:14", "RestaurantZ"),  
  createData('B2349','Robert Brown','Food Order',8550, "2022/04/23","14:23:14", "RestaurantZ"),  
  createData('B2350','Robert Brown','Food Order',8550, "2022/04/23","14:23:14", "RestaurantZ"),  
  createData('B2351','Robert Brown','Food Order',8550, "2022/04/23","14:23:14", "RestaurantZ"),  
  createData('B2352','Robert Brown','Food Order',8550, "2022/04/23","14:23:14", "RestaurantZ"),  
  createData('B2353','Robert Brown','Food Order',8550, "2022/04/23","14:23:14", "RestaurantZ"),  
  createData('B2354','Robert Brown','Food Order',8550, "2022/04/23","14:23:14", "RestaurantZ"),  
  createData('B2355','Robert Brown','Food Order',8550, "2022/04/23","14:23:14", "RestaurantZ"),  
]

function TableActions() {
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  //----------------------------------------------------------Column Define 
  const columns = [
    { id: 'details', label: '', maxWidth: 10},
    { id: 'payment', label: 'Payment-ID', minWidth: 150},
    { id: 'user', label: 'User', minWidth: 170 },
    { id: 'type', label: 'Type', minWidth: 200 },
    { id: 'amount', label: 'Amount', minWidth: 100 },
    { id: 'date', label: 'Date', minWidth: 100 },
    { id: 'time', label: 'Time', minWidth: 100},
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
    <TableContainer sx={{ maxHeight: 440 }}>
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