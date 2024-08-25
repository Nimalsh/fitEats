import { Delete } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteFoodAction,
  getMenuItemsByRestaurantId,
} from "../../component/State/Menu/Action";
import { getRestaurantsCategory } from "../../component/State/Restaurant/Action";

export const MenuTable = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, menu } = useSelector((store) => store);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (restaurant.usersRestaurant) {
      dispatch(
        getMenuItemsByRestaurantId({
          restaurantId: restaurant.usersRestaurant.id,
          jwt,
          vegetarian: false,
          seasonal: false,
          nonveg: false,
          foodCategory: selectedCategory,
        })
      );
      dispatch(
        getRestaurantsCategory({
          jwt,
          restaurantId: restaurant.usersRestaurant.id,
        })
      );
    }
  }, [dispatch, jwt, restaurant.usersRestaurant, selectedCategory]);

  const handleDeleteFood = (foodId) => {
    dispatch(deleteFoodAction({ foodId, jwt }));
  };

  const handleViewDetails = (foodId) => {
    navigate(`/admin/restaurant/menu/food-details/${foodId}`);
  };

  const filteredMenuItems = menu.menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "" || item.foodCategory.id === selectedCategory;
    const matchesSearchQuery =
      item.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearchQuery;
  });

  return (
    <Box>
      <Card className="mt-2">
        <CardHeader
          action={
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
              }}
            >
              <button
                className="button add-button"
                onClick={() => navigate("/admin/restaurant/add-menu")}
                sx={{
                  backgroundColor: "#95CD41",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#7baf30",
                  },
                  borderRadius: "20px",
                  padding: "10px 20px",
                  width: "150px",
                }}
              >
                <AddIcon /> Add Food 
              </button> 

              <TextField
                variant="outlined"
                placeholder="Search Food Item"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon />,
                }}
                sx={{ width: "250px", backgroundColor: "#555555", borderRadius: "4px", height: "55px" }}
              />

              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                displayEmpty
                sx={{ width: "200px", backgroundColor: "#555555", borderRadius: "4px" }}
              >
                <MenuItem value="">
                  <em>All Categories</em>
                </MenuItem>
                {restaurant.categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          }
          title="All Food Items"
          sx={{ pt: 2, textAlign: "left" }}
        />
      </Card>

      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {filteredMenuItems && filteredMenuItems.length > 0 ? (
          filteredMenuItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card style={{ background: "#555555" }}>
                <CardContent>
                  <Box display="flex" justifyContent="center">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      style={{
                        width: 180,
                        height: 150,
                        borderRadius: "10%",
                        marginBottom: "10px",
                      }}
                    />
                  </Box>
                  <Typography variant="h5" align="center" gutterBottom>
                    {item.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    align="center"
                  >
                    Rs.{item.price}/= 
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ fontWeight: "bold" }}
                    onClick={() => handleViewDetails(item.id)}
                  >
                    View Details
                  </Button>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteFood(item.id)}
                  >
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" align="center" sx={{ marginTop: 2 }}>
              No Menu Items Found
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
