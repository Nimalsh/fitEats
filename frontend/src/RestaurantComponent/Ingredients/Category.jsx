
import CreateIcon from '@mui/icons-material/Create'
import { Box, Card, CardActions, CardHeader, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import { CreateIngredientCategoryForm } from './CreateIngredientCategoryForm'
import { useDispatch, useSelector } from 'react-redux'
import { getIngredientCategories } from '../../component/State/ingredients/Action'

const orders = [1,1,1,1,1,1,1]

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

export const Category = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false)
  
  const dispatch = useDispatch()
  const {restaurant , ingredients} = useSelector(store=>store)
  const jwt = localStorage.getItem("jwt")

  useEffect(() => {
    if (restaurant.usersRestaurant) {
      dispatch(getIngredientCategories({ 
        jwt,
        id: restaurant.usersRestaurant.id,
      })); 
 
    }
  }, [dispatch, jwt, restaurant.usersRestaurant]);

  return (
    <Box>
      <Card className='mt-2'>
        <CardHeader
        action = {
          <IconButton onClick={handleOpen} aria-label='settings'>
            <CreateIcon />
          </IconButton>
        }
        title={"Ingredient Category"}
        sx={{pt:2, alignItems:"center"}}
        />

        <CardActions 
        />

    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead >
          <TableRow >
            <TableCell>id</TableCell> 
            <TableCell align="left">Name</TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {ingredients.category.map((item) => (
            <TableRow
              key={item.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            > 
              <TableCell component="th" scope="row">
                {item.id}
              </TableCell>
              <TableCell align="left">{item.name}</TableCell> 
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
          <CreateIngredientCategoryForm/>
        </Box>
      </Modal>

    </Box>
  )
}


