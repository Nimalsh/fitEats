import { Delete } from '@mui/icons-material'
import CreateIcon from '@mui/icons-material/Create'
import { Box, Card , CardHeader, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

const orders = [1,1,1,1,1,1]
export const MenuTable = () => {
  return (
    <Box>
      <Card className='mt-1'>
        <CardHeader action = {
            <IconButton aria-label='settings'>
                <CreateIcon/>
            </IconButton>
        }
        title={"Menu"}
        sx= {{pt:2, alignItems:"center"}}
        /> 

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow> 
            <TableCell align="right">Image</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Ingredients</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Availability</TableCell>
            <TableCell align="right">Delete</TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {1}
              </TableCell>
              <TableCell align="left">{"iamge" }</TableCell>
              <TableCell align="right">{"codes"}</TableCell>
              <TableCell align="right">{"price"}</TableCell>
              <TableCell align="right">{"name"}</TableCell>
              <TableCell align="right"><IconButton><Delete/></IconButton> </TableCell>
               
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

        
      </Card>
    </Box>
  )
}
