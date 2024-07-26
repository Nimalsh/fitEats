import * as React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { visuallyHidden } from '@mui/utils';

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

import Popup from'./Popup.js'
import image1 from '../../../assets/images/Complain/image1.jpg'

//----------------------------------------------------------styles for table
const paperSx = {
    width: '100%', 
    // overflow: 'hidden', 
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
    fontSize: "16px",
    // cursor: "default"
  },

  "& .MuiSvgIcon-root":{
    color: '#fff',
    paddingLeft: "4px",
  },

  "& .MuiTablePagination-menuItem":{
    color:"#000",
    fontSize:"14px",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
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

//----------------------------------------------------------styles for sorting headcell
const headcellSx = {

  "& .MuiTableSortLabel-root:hover" : {
    color: '#FFFFFF',
  },

  "& .MuiTableSortLabel-root.Mui-active": {
    color: '#aaa',
  },

  "& .css-1qgma8u-MuiButtonBase-root-MuiTableSortLabel-root.Mui-active .MuiTableSortLabel-icon": {
    color: '#fff',
  },

}

//----------------------------------------------------------name suggetions for the search
const topNames = [
  "Chamari",
  "Ian",
  "Nina",
  "Zayn",
  "Mohommad"
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
function createData(complaintId,title,user ,Restaurant,action,image,description) {
  return { 
    complaintId, 
    title,
    user, 
    Restaurant,
    action,
    //give the complain popup data too
    image,
    description
  };
}


//----------------------------------------------------------Table Row Initialize and Sorting
const rows = [
  createData('B2342','Customer Service is really bad','Rachel Green','Restaurant Z','Ignored',image1,"Cras mattis consectetur purus sit amet fermentum. Cras justo odio dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros."),  
  createData('B2343','Quality of the food is not good','Robert Pattinson', 'Restaurant ABC','Black Listed',image1,"Cras mattis consectetur purus sit amet fermentum. Cras justo odio dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros."),  
  createData('B2344','Customer Service is really bad','Rachel Green','Restaurant Z','Listed Complaint',image1,"Cras mattis consectetur purus sit amet fermentum. Cras justo odio dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros."),  
  createData('B2345','Customer Service is really bad','Robert Pattinson', 'Restaurant ABC','Ignored' ,image1,"Cras mattis consectetur purus sit amet fermentum. Cras justo odio dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros."),  
  createData('B2346','Quality of the food is not good','Rachel Green','Restaurant Z','Ignored',image1,"Cras mattis consectetur purus sit amet fermentum. Cras justo odio dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros."),  
  createData('B2347','Customer Service is really bad','Robert Pattinson', 'Restaurant ABC','Listed Complaint',image1,"Cras mattis consectetur purus sit amet fermentum. Cras justo odio dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros."),  
  createData('B2348','Quality of the food is not good','Rachel Green','Restaurant Z','Listed Complaint',image1,"Cras mattis consectetur purus sit amet fermentum. Cras justo odio dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros."),  
  createData('B2349','Customer Service is really bad','Robert Pattinson', 'Restaurant ABC','Ignored',image1,"Cras mattis consectetur purus sit amet fermentum. Cras justo odio dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros."),  
  createData('B2350','Customer Service is really bad','Rachel Green','Restaurant Z','Listed Complaint',image1,"Cras mattis consectetur purus sit amet fermentum. Cras justo odio dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros."),  
  createData('B2351','Customer Service is really bad','Robert Pattinson', 'Restaurant ABC','Listed Complaint',image1,"Cras mattis consectetur purus sit amet fermentum. Cras justo odio dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros."),  
]

//----------------------------------------------------------sorting functions - 3
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

//----------------------------------------------------------Column Define 
const columns = [
  { 
    id: 'complaintId', 
    label: 'Complaint-Id',
    numeric: false, 
    minWidth: 100},
  { 
    id: 'title', 
    label: 'Title',
    numeric: false,
    minWidth: 150},
  { 
    id: 'user', 
    label: 'User',
    numeric: false, 
    minWidth: 140},
  { 
    id: 'Restaurant', 
    label: 'Restaurent',
    numeric: false, 
    minWidth: 120 },

  { 
    id: 'action', 
    label: 'Action',
    numeric: false, 
    minWidth: 150 },

  { 
    id: 'view', 
    label: '',
    numeric: false, 
    minWidth: 150 }
  
];

//----------------------------------------------------------Table head with sorting
function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={headcellSx}
          >
          
          {headCell.label ?
            <TableSortLabel
            active={orderBy === headCell.id}
            direction={orderBy === headCell.id ? order : 'asc'}
            onClick={createSortHandler(headCell.id)}
            >
             {orderBy === headCell.id ? (
               <Box component="span" sx={visuallyHidden}>
                 {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
               </Box>
             ) : null}
             {headCell.label}
           </TableSortLabel>
          
          : null}
             
          </TableCell>
        ))}
        <TableCell/>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

//----------------------------------------------------------Main function
function TableActions() {
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');

  //----------------------------------------------------------Empty Rows
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  //----------------------------------------------------------Sort Request
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  //----------------------------------------------------------Footer Functions
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={paperSx}>
    
    {/* -----------------------------------------------------------------------Search box - Auto Complete*/}
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

    <TableContainer sx={{ maxHeight: 440 }}>

      {/* ------------------------------------------------------------------------Table with sticky header*/}
      <Table stickyHeader sx={{ minWidth: 1200}} aria-label="custom pagination table">

        {/* ------------------------------------------------------------------------Tableheader with sorting*/}
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          rowCount={rows.length}
        />

        {/* ------------------------------------------------------------------------TableBody with sorting*/}
        <TableBody>
        {stableSort(rows, getComparator(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row, index) => {
            const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.complaintId}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row" 
                      
                    >
                      {row.complaintId}
                    </TableCell>
                    <TableCell >{row.title}</TableCell>
                    <TableCell >{row.user}</TableCell>
                    <TableCell >{row.Restaurant}</TableCell>
                    <TableCell >{row.action}</TableCell>
                    <TableCell ><Popup 
                                  title={row.title} 
                                  image={row.image}
                                  restaurant={row.Restaurant}
                                  user={row.user}
                                  description={row.description}/>
                    </TableCell>
                    <TableCell ></TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (53 * emptyRows),
                }}
              >
                <TableCell colSpan={12} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ------------------------------------------------------------------------Pagination*/}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ 
          color: '#fff',
          "& p":{fontFamily: 'Poppins'}  }}
      />
    </Paper>
  );
}

export default TableActions;
