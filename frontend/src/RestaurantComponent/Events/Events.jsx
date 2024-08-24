import { AddPhotoAlternate } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress, Grid, IconButton, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEventAction } from "../../component/State/Restaurant/Action";
import { uploadImageToCloudinary } from "../util/UploadToCloudinary";
import { EventTable } from "./EventTable";

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

const initialValues = {
  images: [],
  location: "",
  description: "",
  name: "",
  startedAt: null,
  endAt: null,
};

export const Events = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant } = useSelector((store) => store); 

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formValues, setFormValues] = React.useState(initialValues);

  const [uploadImages, setUploadImage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit", formValues);
    dispatch(
      createEventAction({
        data: formValues,
        restaurantId: restaurant.usersRestaurant?.id,
        jwt,
      })
    );
    setFormValues(initialValues);
    handleClose();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setUploadImage(true);
    const image = await uploadImageToCloudinary(file);
    setFormValues((prevValues) => ({
        ...prevValues,
        images: [...prevValues.images, image],
    }));
    setUploadImage(false);
};


  const handleRemoveImage = (index) => {
    const updatedImages = [...formValues.images];
    updatedImages.splice(index, 1); 
  }

 

  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, dateType) => {
    setFormValues({ ...formValues, [dateType]: date });
  };


  return (
    <div className="p-5">
      <button
        onClick={handleOpen}
        variant="contained"
        className="button add-button"
      >
        Create New Event
      </button>

      <EventTable />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-center text-xl pb-10">Create New Event</h1>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                {/* <TextField
                  name="images"      
                  label="Image"
                  variant="outlined"
                  fullWidth
                  value={formValues.images}
                  onChange={handleFormChange}
                /> */}

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
                  className="w-24 h-24 cursor-pointer flex items-center justify-center
                  p-3 border rounded-md bordergrey-600"
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
                {formValues.images.map((image, index) => (
                  <div className="relative">
                    <img
                      className="w-24 h-24 object-cover"
                      key={index}
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
                  name="name"
                  label="Event Name"
                  variant="outlined"
                  fullWidth
                  value={formValues.name}
                  onChange={handleFormChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="location"
                  label="Location"
                  variant="outlined"
                  fullWidth
                  value={formValues.location}
                  onChange={handleFormChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="description"
                  label="Description"
                  variant="outlined"
                  fullWidth
                  value={formValues.description}
                  onChange={handleFormChange}
                />
              </Grid>

              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Start Date and Time"
                    value={formValues.startedAt}
                    onChange={(newValue) =>
                      handleDateChange(newValue, "startedAt")
                    }
                    inputFormat="MM/DD/YYYY hh:mm A"
                    className="w-full"
                    sx={{ width: "100%" }}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="End Date and Time"
                    value={formValues.endAt}
                    onChange={(newValue) => handleDateChange(newValue, "endAt")}
                    inputFormat="MM/DD/YYYY hh:mm A"
                    className="w-full"
                    sx={{ width: "100%" }}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                className="button add-button"
                variant="contained"
                type="submit"
                style={{ marginTop: "10px" }}
              >
                Create Event
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
