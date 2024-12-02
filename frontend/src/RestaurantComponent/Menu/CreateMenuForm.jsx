import { AddPhotoAlternate } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  CardHeader,
  Chip,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import BackgroundImage from "../../assets/images/item.png";
import { uploadImageToCloudinary } from "../util/UploadToCloudinary";
import { createMenuItem } from "../../component/State/Menu/Action";
import { getIngredientsOfRestaurant } from "../../component/State/ingredients/Action";

const initialValues = {
  name: "",
  description: "",
  price: "",
  category: "",
  restaurantId: "",
  vegetarian: true,
  seasonal: false,
  ingredients: [],
  images: [],
};

export const CreateMenuForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Initialize useNavigate
  const jwt = localStorage.getItem("jwt");
  const { restaurant, ingredients } = useSelector((store) => store);

  const [uploadImages, setUploadImage] = useState(false);
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      values.restaurantId = restaurant.usersRestaurant.id;
      dispatch(createMenuItem({ menu: values, jwt }));
      console.log("data ---", values);

      // Redirect to the menu page after successful creation
      navigate("/admin/restaurant/menu");  // This will navigate to the menu page
    },
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setUploadImage(true);
    const image = await uploadImageToCloudinary(file);
    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadImage(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  useEffect(() => {
    if (restaurant.usersRestaurant) {
      dispatch(
        getIngredientsOfRestaurant({
          jwt,
          id: restaurant.usersRestaurant.id,
        })
      );
    }
  }, [dispatch, jwt, restaurant.usersRestaurant]);

  return (
    <Box
      sx={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "75%",
          backgroundColor: "rgba(64, 64, 64, 0.8)",
          borderRadius: 10,
          padding: 4,
          marginLeft: "12%",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CardHeader
          title="Add New Food Item"
          sx={{ pt: 2, alignItems: "center", color: "white" }}
        />
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <Grid container spacing={2}>
            <Grid className="flex flex-wrap gap-5" items xs={12}>
              <input
                accept="image/*"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleImageChange}
                type="file"
              />
              <label className="relative" htmlFor="fileInput">
                <span
                  className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md bordergrey-600"
                >
                  <AddPhotoAlternate className="text-white" />
                </span>
                {uploadImages && (
                  <div className="absolute left-0-right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
                    <CircularProgress />
                  </div>
                )}
              </label>
              <div className="flex flex-wrap gap-2">
                {formik.values.images.map((image, index) => (
                  <div className="relative" key={index}>
                    <img
                      className="w-24 h-24 object-cover"
                      src={image}
                      alt=""
                    />
                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        outline: "none",
                      }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <CloseIcon sx={{ fontSize: "1rem" }} />
                    </IconButton>
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.name}
                sx={{
                  backgroundColor: "#000000",
                  borderRadius: 1,
                  label: { color: "#fff" },
                  "& label.Mui-focused": { color: "#fff" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.description}
                sx={{
                  backgroundColor: "#000000",
                  borderRadius: 1,
                  label: { color: "#fff" },
                  "& label.Mui-focused": { color: "#fff" },
                }}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                id="price"
                name="price"
                label="Price"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.price}
                sx={{
                  backgroundColor: "#000000",
                  borderRadius: 1,
                  label: { color: "#fff" },
                  "& label.Mui-focused": { color: "#fff" },
                }}
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <FormControl fullWidth style={{ background: "black" }}>
                <InputLabel id="demo-simple-select-label">Food Category</InputLabel>
                <Select
                  labelId="category"
                  id="demo-simple-select"
                  value={formik.values.category}
                  label="Category"
                  onChange={formik.handleChange}
                  name="category"
                >
                  {restaurant.categories?.map((item) => (
                    <MenuItem key={item.id} value={item}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth style={{ background: "black" }}>
                <InputLabel id="demo-multiple-chip-label">Ingredients</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  name="ingredients"
                  multiple
                  value={formik.values.ingredients}
                  onChange={formik.handleChange}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="ingredients" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value.id} label={value.name} />
                      ))}
                    </Box>
                  )}
                >
                  {ingredients.ingredients?.map((item) => (
                    <MenuItem key={item.id} value={item}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} lg={6}>
              <FormControl fullWidth style={{ background: "black" }}>
                <InputLabel id="demo-simple-select-label">Is vegetarian</InputLabel>
                <Select
                  labelId="vegetarian"
                  id="demo-simple-select"
                  value={formik.values.vegetarian}
                  label="Is Vegetarian"
                  onChange={formik.handleChange}
                  name="vegetarian"
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} lg={6}>
              <FormControl fullWidth style={{ background: "black" }}>
                <InputLabel id="demo-simple-select-label">Is Seasonal</InputLabel>
                <Select
                  labelId="seasonal"
                  id="demo-simple-select"
                  value={formik.values.seasonal}
                  label="Is Seasonal"
                  onChange={formik.handleChange}
                  name="seasonal"
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid
              container
              item
              xs={12}
              sx={{ justifyContent: "flex-center", marginTop: 3 }}
            >
              <button 
                  type="submit" className="button add-button">
                Save Item
              </button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};
