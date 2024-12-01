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

  const modalStyle = {
    width: "90%",
    margin: "20px auto",
    bgcolor: "#36454F", // Light grey background
    boxShadow: 3,
    borderRadius: "10px",
    padding: "16px",
  };

  const buttonStyle = {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    backgroundColor: "#FFD700", // Light yellow background
    color: "#000", // Black text color
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    backgroundColor: "#FFF5CC", // Lighter yellow on hover
  };

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", padding: "16px" }}>
      {order ? (
        <>
          <Card>
            <CardHeader title={`Order Details for Order ID: ${order.id}`} />
          </Card>
          {/* Grey rectangle for customer details below the card */}
          <Box sx={modalStyle}>
            <Typography variant="h6" sx={{ p: 1 }}>
              CUSTOMER NAME: {order.customerName}
            </Typography>
            <Typography variant="h6" sx={{ p: 1 }}>
              CUSTOMER EMAIL: {order.customerEmail}
            </Typography>
            <Typography variant="h6" sx={{ p: 1 }}>
               CUSTOMER ADDRESS: {order.customerAddress}
            </Typography>
            <Typography variant="h6" sx={{ p: 1 }}>
              STATUS: {order.orderStatus}
            </Typography>
            <Typography variant="h6" sx={{ p: 1 }}>
              TOTAL PRICE: Rs.{order.totalPrice}.00
            </Typography>
          </Box>

          <Card sx={{ marginBottom: "20px" }}>
            <Typography variant="h6" sx={{ p: 2 }}>
              Items Ordered:
            </Typography>
            <TableContainer component={Paper} sx={{ mb: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Food Item</TableCell>
                    <TableCell>Ingredients</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.foodName}</TableCell>
                      <TableCell>
                        {/* Display ingredients two by two */}
                        {item.ingredients ? (
                          <>
                            {item.ingredients.map((ingredient, i) => {
                              // Create pairs of ingredients
                              if (i % 2 === 0) {
                                return (
                                  <div key={i} style={{ display: "flex" }}>
                                    <div style={{ marginRight: "10px" }}>{ingredient}</div>
                                    {/* Check if there is a next ingredient to pair with */}
                                    {item.ingredients[i + 1] && (
                                      <div>{item.ingredients[i + 1]}</div>
                                    )}
                                  </div>
                                );
                              }
                            })}
                          </>
                        ) : (
                          <div>No ingredients</div>
                        )}
                      </TableCell>

                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>Rs.{item.totalPrice}.00</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>

          {/* Assign a Driver Button */}
          <button
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#FFF5CC")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#FFD700")}
          >
            Assign a Driver
          </button>
        </>
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
