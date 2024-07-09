import * as React from 'react';
import { createTheme } from '@mui/material/styles';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';
import axios from 'axios';
import authHeader from '../../../services/auth-header';



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

const theme = createTheme({
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
});


//----------------------------------------------------------Table Row Initialize and Sorting

var rows = [];

axios.get("http://localhost:8072/FoodiFy/Restaurant/GetRestaurantIncome", { headers: authHeader() })
  .then(data => {

    const X = data.data;

    
    Object.keys(X).map((key, index) => {

      rows.push(X[key]);
      
    })

    console.log(rows);

   //rows.push(X[key].resturant, X[key].date, X[key].items, X[key].total)


  })
  .catch(error => {
    console.log(error)
  })



function Row(props) {
  const { row } = props;
  
  return (
    <React.Fragment>

      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          
        </TableCell>
        <TableCell >{row.restaurantName}</TableCell>
        <TableCell >{row.date}</TableCell>
        <TableCell >{row.items}</TableCell>
        <TableCell >{row.total}</TableCell>
      </TableRow>


    </React.Fragment>
  );
}

function Income() {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  //----------------------------------------------------------Column Define 
  const columns = [

    { id: 'details', label: "#", maxWidth: 10 },
    { id: 'resturant', label: 'Resturant', minWidth: 200 },
    { id: 'date', label: 'Date', minWidth: 150 },
    { id: 'items', label: 'Items', minWidth: 150 },
    { id: 'income', label: 'Total Income(Rs.)', minWidth: 50 },
    
  ];

  return (
    <Paper sx={tableSx}>
      <TableContainer sx={{ maxHeight: 800 }}>
        <Table stickyHeader sx={{ minWidth: 500 }} aria-label="custom pagination table">

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

          <TableBody>

            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <Row key={row.payment} row={row} />
            ))}

          </TableBody>

        </Table>
      </TableContainer>
    </Paper>
  );
}

export default Income