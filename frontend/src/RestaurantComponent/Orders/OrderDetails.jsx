import React, { useEffect, useState } from "react";
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
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const OrderDetails = () => {
  const { orderId } = useParams(); // Extract orderId from the URL
  const { restaurantOrder } = useSelector((store) => store);

  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Log the orders from the Redux state for debugging
    console.log("All Orders in Redux State:", restaurantOrder.orders);

    if (restaurantOrder.orders) {
      // Find the order with the matching ID
      const selectedOrder = restaurantOrder.orders.find(
        (o) => o.id.toString() === orderId
      );
      setOrder(selectedOrder);

      // Log the selected order and orderId for debugging
      console.log("Order ID from URL:", orderId);
      console.log("Matched Order:", selectedOrder);
    }
  }, [orderId, restaurantOrder.orders]);

  return (
    <Box>
      {order ? (
        <Card>
          <CardHeader title={`Order Details for Order ID: ${order.id}`} />
          <Typography variant="h6" sx={{ p: 2 }}>
            Status: {order.orderStatus}
          </Typography>
          <Typography variant="h6" sx={{ p: 2 }}>
            Total Price: Rs.{order.totalPrice}.00
          </Typography>
          <Typography variant="h6" sx={{ p: 2 }}>
            Items Ordered:
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Food Item</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.foodName}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>Rs.{item.totalPrice}.00</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      ) : (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          {restaurantOrder.orders && restaurantOrder.orders.length > 0
            ? "No matching order found!"
            : "Loading order details..."}
        </Typography>
      )}
    </Box>
  );
};
