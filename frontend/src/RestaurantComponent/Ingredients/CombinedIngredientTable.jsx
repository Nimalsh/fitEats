import AddIcon from "@mui/icons-material/Add";
import { Box, Button, CardHeader, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getIngredientCategories,
  getIngredientsOfRestaurant,
  updateStockOfIngredient,
} from "../../component/State/ingredients/Action";
import { CreateIngredientCategoryForm } from "./CreateIngredientCategoryForm";
import { CreateIngredientForm } from "./CreateIngredientForm";

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

export const CombinedIngredientTable = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, ingredients } = useSelector((store) => store);

  const [openIngredient, setOpenIngredient] = React.useState(false);
  const [openCategory, setOpenCategory] = React.useState(false);
  const [openNutrition, setOpenNutrition] = React.useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const handleOpenIngredient = () => setOpenIngredient(true);
  const handleCloseIngredient = () => setOpenIngredient(false);
  const handleOpenCategory = () => setOpenCategory(true);
  const handleCloseCategory = () => setOpenCategory(false);
  const handleOpenNutrition = (ingredient) => {
    setSelectedIngredient(ingredient);
    setOpenNutrition(true);
  };
  const handleCloseNutrition = () => setOpenNutrition(false);

  useEffect(() => {
    console.log(ingredients);
    if (restaurant.usersRestaurant) {
      dispatch(
        getIngredientsOfRestaurant({
          jwt,
          id: restaurant.usersRestaurant.id,
        })
      );
      dispatch(
        getIngredientCategories({
          jwt,
          id: restaurant.usersRestaurant.id,
        })
      );
    }
  }, [dispatch, jwt, restaurant.usersRestaurant]);

  const handleUpdateStock = (id, inStock) => {
    dispatch(updateStockOfIngredient({ id, jwt, inStock }));
  };

  return (
    <Box sx={{ padding: 2 }}>
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
              onClick={handleOpenIngredient}
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
              <AddIcon /> Add Ingredient
            </button>
            <button
              className="button add-button"
              onClick={handleOpenCategory}
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
              <AddIcon /> Add Category
            </button>
          </Box>
        }
        title="Ingredients"
        sx={{ pt: 2, textAlign: "left", marginBottom: "50px" }}
      />

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {ingredients.category.map((category) => (
          <Box
            key={category.id}
            sx={{
              flex: "1 1 calc(33.333% - 16px)",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: 2,
              boxSizing: "border-box",
              background: "#555555",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", marginBottom: 2 }}
            >
              {category.name}
            </Typography>
            <Box sx={{ paddingLeft: 2 }}>
              {ingredients.ingredients
                .filter((ingredient) => ingredient.category.id === category.id)
                .map((ingredient) => (
                  <Box
                    key={ingredient.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 1,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ flexGrow: 1, cursor: "pointer" }}
                      onClick={() => handleOpenNutrition(ingredient)}
                    >
                      {ingredient.name}
                    </Typography>
                    <Button
                      variant="contained"
                      color={ingredient.inStoke ? "success" : "error"}
                      sx={{
                        textTransform: "none",
                        borderRadius: "20px",
                        padding: "5px 10px",
                      }}
                      onClick={() => handleUpdateStock(ingredient.id, !ingredient.inStoke)}
                    >
                      {ingredient.inStoke ? "In Stock" : "Out of Stock"}
                    </Button>
                  </Box>
                ))}
            </Box>
          </Box>
        ))}
      </Box>

      <Modal
        open={openIngredient}
        onClose={handleCloseIngredient}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateIngredientForm />
        </Box>
      </Modal>

      <Modal
        open={openCategory}
        onClose={handleCloseCategory}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateIngredientCategoryForm />
        </Box>
      </Modal>

      <Modal
        open={openNutrition}
        onClose={handleCloseNutrition}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Nutrition Content
          </Typography>
          {selectedIngredient && (
            <>
              <Typography>Calories: {selectedIngredient.calories}</Typography>
              <Typography>Protein: {selectedIngredient.protein}</Typography>
              <Typography>Carbohydrates: {selectedIngredient.carbohydrates}</Typography>
              <Typography>Fat: {selectedIngredient.fat}</Typography>
              <Typography>Total Sugar: {selectedIngredient.totalSugar}</Typography>
              <Typography>Total Iron: {selectedIngredient.totalIron}</Typography>
              <Typography>Total Vitamins: {selectedIngredient.totalVitamins}</Typography>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};
