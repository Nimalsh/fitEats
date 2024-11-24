import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef } from "react";
import { FaDownload } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientsOfRestaurant } from "../../component/State/ingredients/Action";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const IngredientReport = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, ingredients } = useSelector((store) => store);
  const reportRef = useRef(null); // Ref to capture the report section

  useEffect(() => {
    if (restaurant.usersRestaurant) {
      console.log("Fetching ingredients for restaurant:", restaurant.usersRestaurant.id); // Debugging log
      dispatch(
        getIngredientsOfRestaurant({
          jwt,
          id: restaurant.usersRestaurant.id, // Correct ID usage
        })
      );
    }
  }, [dispatch, jwt, restaurant.usersRestaurant]);

  const outOfStockIngredients = ingredients.ingredients?.filter(
    (ingredient) => ingredient.inStoke === false
  );

  console.log("All ingredients data:", ingredients.ingredients); // Debugging log for all ingredients
  console.log("Out of stock ingredients:", outOfStockIngredients); // Debugging log for out-of-stock ingredients

  const currentDate = new Date().toLocaleDateString(); // Get current date

  // Function to download the report as a PDF
  const handleDownload = async () => {
    const element = reportRef.current; // Get the DOM node for the report
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Ingredient_Report.pdf");
  };

  return (
    <>
      <Typography variant="h4" sx={{ margin: 4 }}>
        Ingredient Report
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "60%",
          margin: "0 auto",
        }}
      >
        {/* Add restaurant name and date */}
        <Box
          sx={{
            marginBottom: 2,
            textAlign: "center",
            width: "100%",
            maxWidth: "800px",
          }}
        >
          <Typography variant="h6">
            Restaurant: {restaurant.usersRestaurant?.name || "Unknown"}
          </Typography>
          <Typography variant="subtitle1">Date: {currentDate}</Typography>
        </Box>
        {/* Report content wrapped in a container for PDF capture */}
        <TableContainer
          ref={reportRef} // Attach ref to this container
          component={Paper}
          sx={{ marginBottom: 4, width: "100%", maxWidth: "800px" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h6">Ingredients Out of Stock</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {outOfStockIngredients && outOfStockIngredients.length > 0 ? (
                outOfStockIngredients.map((ingredient) => (
                  <TableRow key={ingredient.id}>
                    <TableCell align="center">{ingredient.name}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell align="center">
                    <Typography>No ingredients are out of stock.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          sx={{
            justifyContent: "space-between",
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "bold",
            background: "#95CD41",
            "&:hover": {
              background: "#7baf30",
            },
          }}
          onClick={handleDownload} // Attach download functionality
        >
          <FaDownload /> Download
        </Button>
      </Box>
    </>
  );
};
