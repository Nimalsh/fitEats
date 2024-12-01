import React, { useState, useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurantsOrder } from "../../component/State/Restaurant Order/Action";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FaDownload } from "react-icons/fa6";

export const IncomeReport = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportData, setReportData] = useState(null);
  const { restaurantOrder } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const reportRef = useRef(null); // Ref for capturing the entire report section

  const generateReport = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    if (!restaurantOrder.orders || restaurantOrder.orders.length === 0) {
      const restaurantId = "YOUR_RESTAURANT_ID";
      dispatch(
        fetchRestaurantsOrder({
          restaurantId,
          orderStatus: "all",
          includeCustomer: true,
          jwt,
        })
      );
    }

    const filteredOrders = restaurantOrder.orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      orderDate.setHours(0, 0, 0, 0);
      return orderDate >= start && orderDate <= end;
    });

    const totalIncome = filteredOrders.reduce((sum, order) => sum + order.totalPrice, 0);

    setReportData({
      totalIncome,
      totalOrders: filteredOrders.length,
      filteredOrders,
    });
  };

  const handleDownload = async () => {
    const element = reportRef.current; // Get the full report section
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Income_Report.pdf");
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Card sx={{ maxWidth: 800, margin: "auto", padding: 2 }} ref={reportRef}>
        {/* Ref wraps the entire content */} 
        <CardHeader title="Income Report" />
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Start Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <TextField
              label="End Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={generateReport}
              disabled={!restaurantOrder.orders || restaurantOrder.orders.length === 0}
            >
              Generate Report
            </Button>
          </Box>

          {reportData && (
            <Box sx={{ marginTop: 3 }}>
              <Typography variant="h6">Income Report Summary</Typography>
              <Typography>Total Income: Rs.{reportData.totalIncome.toFixed(2)}</Typography>
              <Typography>Total Orders: {reportData.totalOrders}</Typography>

              <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Order ID</TableCell>
                      <TableCell align="left">Customer</TableCell>
                      <TableCell align="left">Order Date</TableCell>
                      <TableCell align="left">Total Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reportData.filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell align="left">{order.id}</TableCell>
                        <TableCell align="left">{order.customerName || "Unknown"}</TableCell>
                        <TableCell align="left">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell align="left">Rs.{order.totalPrice.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </CardContent>
      </Card>
      {reportData && (
        <Button
variant="contained"
sx={{
  justifyContent: "center", 
  marginLeft: "45%",
  marginTop: "2%",
  padding: "10px 20px",
  fontSize: "16px",
  fontWeight: "bold",
  background: "#95CD41",
  "&:hover": {
    background: "#7baf30",
  },
}}
onClick={handleDownload}
>
<FaDownload /> Download
</Button>
      )}
    </Box>
  );
};
