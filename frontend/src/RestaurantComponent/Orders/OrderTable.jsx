import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurantsOrder } from "../../component/State/Restaurant Order/Action";
import { Link } from "react-router-dom";

export const OrderTable = ({ filterValue }) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, restaurantOrder } = useSelector((store) => store);

  useEffect(() => {
    if (restaurant.usersRestaurant) {
      console.log("Fetching orders for restaurant ID:", restaurant.usersRestaurant.id); // Debug log
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
    console.log("Orders fetched:", restaurantOrder.orders); // Check if the orders contain customer data
    restaurantOrder.orders.forEach(order => {
      console.log("Customer Info for Order:", order.customer); // Debug log to inspect customer data
    });
  }, [restaurantOrder.orders]);
  

  return (
    <Box>
      <Card className="mt-2">
        <CardHeader title={"All Orders"} sx={{ pt: 2, alignItems: "center" }} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Customer Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Food Items</TableCell>
                <TableCell align="right">Total Items</TableCell>
                <TableCell align="right">Total Price</TableCell>
                <TableCell align="right">View Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantOrder.orders && restaurantOrder.orders.length > 0 ? (
                restaurantOrder.orders.map((order) => {
                  console.log("Processing order:", order); // Debug log for each order
                  const customerName = order.customer?.fullName || "Unknown"; // Ensure full name is used
                  const customerEmail = order.customer?.email || "No Email"; // Default email if missing

                  return (
                    <TableRow key={order.id}>
                      <TableCell align="right">{order.customerName}</TableCell>
                      <TableCell align="right">{order.customerEmail}</TableCell>
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
                      <TableCell align="right">
                        <Button
                          component={Link}
                          to={`/admin/restaurant/orders/order-details/${order.id}`}
                          variant="contained"
                          color="primary"
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
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
