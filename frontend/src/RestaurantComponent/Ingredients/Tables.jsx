
import CreateIcon from '@mui/icons-material/Create'
import { Box, Card, CardActions, CardHeader, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React , { useEffect } from 'react'
import { CreateIngredientForm } from './CreateIngredientForm';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsOfRestaurant , updateStockOfIngredient } from '../../component/State/ingredients/Action'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const Tables = () => {

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant , ingredients } = useSelector(store=>store)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect (() => {
    if (restaurant.usersRestaurant) {
      dispatch(getIngredientsOfRestaurant({ 
        jwt,
        id: restaurant.usersRestaurant.id,
      })); 
 
    }
  }, [dispatch, jwt, restaurant.usersRestaurant]);

  const handleUpdateStoke = (id) => {
    dispatch(updateStockOfIngredient({ id , jwt }))
  } 

  return (
    <Box>
      <Card className='mt-2'>
        <CardHeader
        action = {
          <IconButton onClick={handleOpen} aria-label='settings'>
            <CreateIcon />
          </IconButton>
        }
        title={"Ingredients"}
        sx={{pt:2, alignItems:"center"}}
        />

        <CardActions 
        />

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead >
          <TableRow >
            <TableCell align="left">id</TableCell> 
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Category</TableCell>  
            <TableCell align="right">Availability</TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {ingredients.ingredients.map((item) => (
            <TableRow
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            > 
              <TableCell component="th" scope="row">
                {1}
              </TableCell>
              <TableCell align="right">{item.name}</TableCell> 
              <TableCell align="right">{item.category.name}</TableCell>
              <TableCell align="center">
                <button className="button details-button" onClick={()=>handleUpdateStoke(item.id)}>
                  {item.in_stoke? "in_stock":"out-stock"}
                  </button>
              </TableCell> 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}> 
          <CreateIngredientForm/>
        </Box>
      </Modal>
    </Box>
  )
}

