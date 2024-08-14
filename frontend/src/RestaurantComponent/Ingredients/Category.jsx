
import CreateIcon from '@mui/icons-material/Create'
import { Box, Card, CardActions, CardHeader, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

const orders = [1,1,1,1,1,1,1]

export const Category = () => {
  return (
    <Box>
      <Card className='mt-2'>
        <CardHeader
        title={"Ingredient Category"}
        sx={{pt:2, alignItems:"center"}}
        />

        <CardActions action = {
          <IconButton aria-label='settings'>
            <CreateIcon />
          </IconButton>
        }
        />

    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead >
          <TableRow >
            <TableCell>id</TableCell>
            <TableCell align="left">Image</TableCell>
            <TableCell align="left">Name</TableCell> 
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
              <TableCell align="right">{"image"}</TableCell>
              <TableCell align="right">{"name"}</TableCell> 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Card>
    </Box>
  )
}


