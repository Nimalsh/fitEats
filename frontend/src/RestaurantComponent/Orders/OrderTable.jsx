import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurantsOrder, updateOrderStatus } from "../../component/State/Restaurant Order/Action";

const orderStatus = [
  { label: "All", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "On Delivery", value: "ON DELIVERY" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" },
];

export const OrderTable = ({ filterValue }) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, restaurantOrder } = useSelector((store) => store);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (restaurant.usersRestaurant) {
      dispatch(
        fetchRestaurantsOrder({
          restaurantId: restaurant.usersRestaurant.id,
          orderStatus: filterValue,
          jwt,
        })
      );
    }
  }, [dispatch, jwt, restaurant.usersRestaurant, filterValue]);

  useEffect(() => {
    if (restaurantOrder.orders && restaurantOrder.orders.length > 0) {
      console.log("Fetched orders:", restaurantOrder.orders);
    }
  }, [restaurantOrder.orders]);

  const handleClick = (event, order) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrder(order);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedOrder(null);
  };

  const handleUpdateOrder = (status) => {
    if (selectedOrder) {
      dispatch(
        updateOrderStatus({
          orderId: selectedOrder.id,
          orderStatus: status,
          jwt,
        })
      );
      handleClose();
    }
  };

  return (
    <Box>
      <Card className="mt-2">
        <CardHeader title={"All Orders"} sx={{ pt: 2, alignItems: "center" }} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Created At</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Food Items</TableCell>
                <TableCell align="right">Total Items</TableCell>
                <TableCell align="right">Total Price</TableCell>
                <TableCell align="right">Customer ID</TableCell>
                <TableCell align="right">Restaurant ID</TableCell>
                <TableCell align="right">Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantOrder.orders && restaurantOrder.orders.length > 0 ? (
                restaurantOrder.orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.createdAt}</TableCell>
                    <TableCell align="right">{order.orderStatus}</TableCell>
                    <TableCell align="right">
                      {order.items.map((item, index) => (
                        <div key={index}>
                          {item.foodName} (x{item.quantity})
                        </div>
                      ))}
                    </TableCell>
                    <TableCell align="right">{order.items.length}</TableCell>
                    <TableCell align="right">{order.totalPrice}</TableCell>
                    <TableCell align="right">{order.customerId}</TableCell>
                    <TableCell align="right">{order.restaurantId}</TableCell>
                    <TableCell align="right">
                        {order.user?.fullName || "N/A"}
                    </TableCell>
                    <TableCell align="right">
                        {order.user?.email || "N/A"}
                    </TableCell>

                    <TableCell align="right">
                      <Button onClick={(e) => handleClick(e, order)}>Update</Button>
                      <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                      >
                        {orderStatus.map((status) => (
                          <MenuItem
                            key={status.value}
                            onClick={() => handleUpdateOrder(status.value)}
                          >
                            {status.label}
                          </MenuItem>
                        ))}
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    No orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};
