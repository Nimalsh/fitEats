import CreateIcon from "@mui/icons-material/Create";
import { Box, Card, CardHeader, Grid, IconButton, Modal, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantsCategory } from "../../component/State/Restaurant/Action";
import { CreateFoodCategoryForm } from "./CreateFoodCategoryForm";
import AddIcon from "@mui/icons-material/Add";

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

const tileStyle = {
  backgroundColor: '#333', // Dark grey color
  color: 'white',
  borderRadius: '8px',
  padding: '20px',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100px',
};

export const CategoryTable = () => {
  const { restaurant } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (restaurant.usersRestaurant) {
      dispatch(getRestaurantsCategory({
        jwt,
        restaurantId: restaurant.usersRestaurant.id,
      }));
    }
  }, [dispatch, jwt, restaurant.usersRestaurant]);

  return (
    <Box>
      <Card className="mt-2">
        <CardHeader
          // action={
          //   <IconButton onClick={handleOpen} aria-label="settings">
          //     <CreateIcon />
          //   </IconButton>
          // }
          // title={"Food Category"}
          // sx={{ pt: 2, alignItems: "center" }}
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
                onClick={handleOpen}
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
          title="Food Categories"
          sx={{ pt: 2, textAlign: "left" }}
        />

        <Box sx={{ p: 2 }}>
          <Grid container spacing={2}>
            {restaurant.categories.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.name}>
                <Box sx={tileStyle}>
                  <Typography variant="h6">
                    {item.name}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateFoodCategoryForm />
        </Box>
      </Modal>
    </Box>
  );
};
