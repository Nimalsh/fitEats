 import { Delete, MoreVert } from '@mui/icons-material'
import { Avatar, Box, Card, CardActions, CardHeader, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React , {useEffect} from 'react'
import CreateIcon from '@mui/icons-material/Create'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux' 
import { getMenuItemsByRestaurantId } from '../../component/State/Menu/Action'

export const MenuTable = () => {

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const { restaurant , ingredients , menu } = useSelector((store)=>store)

  const navigate = useNavigate();

  useEffect(() => {
    if (restaurant.usersRestaurant) {
      dispatch(getMenuItemsByRestaurantId({ 
        jwt,
        restaurantId: restaurant.usersRestaurant.id,
      })); 
 
    }
  }, [dispatch, jwt, restaurant.usersRestaurant]);


  return (
    <Box>
      <Card className='mt-2'>
        <CardHeader
        action = {
          <IconButton onClick={()=>navigate("/admin/restaurant/add-menu")} aria-label='settings'>
            <CreateIcon />
          </IconButton>
        }
        title={"Food Items"}
        sx={{pt:2, alignItems:"center"}}
        />

        <CardActions 
        />

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead >
          <TableRow >
            <TableCell>id</TableCell>
            <TableCell align="left">Image</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Ingredients</TableCell> 
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Availability</TableCell>
            <TableCell align="right">Delete</TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {menu.menuItems.map((item) => (
            <TableRow
              key={item.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell component="th" scope="row">
                {item.id}
              </TableCell>
              <TableCell align="right"><Avatar src={item.images[0]}></Avatar></TableCell>
              <TableCell align="right">{"codewithzosh"}</TableCell>
              <TableCell align="right">{"price"}</TableCell>
              <TableCell align="right">{"name"}</TableCell>
              <TableCell align="right"><IconButton><Delete/></IconButton></TableCell> 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Card>
    </Box>
  )
}

