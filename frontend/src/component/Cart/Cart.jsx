import { Box, Button, Card, Divider, Grid, Modal, TextField, Typography } from "@mui/material";
import React from "react";
import CartItem from "./CartItem";
import { AddressCard } from "./AddressCard";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { ErrorMessage, Field, Form, Formik } from "formik";
// import * as Yup from "yup";

const items = [1, 1];

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  streetAddress: "",
  state: "",
  pincode: "",
  city: "",
};

// const validationSchema = Yep.object.shape({
//   streetAddress: Yup.string().required("Street address is required"),
//   state: Yup.string().required("State is required"),
//   pincode: Yup.required("pincode is required"),
//   city: Yup.string().required("City is required"),
// });

const handleSubmit = (values) => {console.log(values)};

const Cart = () => {
  const createOderUsingSelectedAddress = () => {};
  const handleOpenAddressModel = () => setOpen(true);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <main className="lg:flex justify-between">
        <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
          {items.map((item) => (
            <CartItem />
          ))}

          <Divider />
          <div className="billDetails px-5 text-sm">
            <p className="font-extralight py-5">Bill Details</p>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-400">
                <p>Item Total</p>
                <p>LkR 5900 </p>
              </div>

              <div className="flex justify-between text-gray-400">
                <p>delivery Fee</p>
                <p>LkR 100 </p>
              </div>

              <div className="flex justify-between text-gray-400">
                <p>GST and Restaurant charges</p>
                <p>LkR 500 </p>
              </div>
              <Divider />
            </div>
            <div className="flex justify-between text-gray-400">
              <p>Total pay</p>
              <p>LKR 6500</p>
            </div>
          </div>
        </section>

        <Divider orientation="vertical" flexItem />

        <section className="lg:w-[70%] flex flex-col items-center px-5 pb-10 lg:pb-0">
          <div className="text-center font-semibold text-2xl py-10">
            Choose Delivery Address
          </div>
          <div className="flex gap-5 flex-wrap justify-center">
            {[1, 1, 1, 1, 1].map((item, index) => (
              <AddressCard
                handleSelectAddress={createOderUsingSelectedAddress}
                key={index}
                item={item}
                showButton={true}
              />
            ))}

            <Card className="flex gap-5 w-64 h-64 p-5">
              <AddLocationIcon />
              <div className="space-y-3 text-gray-500">
                <h1 className="font-semibold text-lg text-white">
                  Add New Address
                </h1>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleOpenAddressModel}
                >
                  Add
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </main>

    
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
          <Form>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="streetAddress"
                    label="StreetAdress"
                    fullWidth
                    variant="outlined"
                    // error={!ErrorMessage("streetAddress")}
                    // helperText={
                    //   <ErrorMessage>
                    //     {(msg)=><span className="text-red-600">{msg}</span>}
                    //   </ErrorMessage>
                    // }
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="state"
                    label="state"
                    fullWidth
                    variant="outlined"
                    // error={!ErrorMessage("streetAddress")}
                    // helperText={
                    //   <ErrorMessage>
                    //     {(msg)=><span className="text-red-600">{msg}</span>}
                    //   </ErrorMessage>
                    // }
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="city"
                    label="city"
                    fullWidth
                    variant="outlined"
                    // error={!ErrorMessage("streetAddress")}
                    // helperText={
                    //   <ErrorMessage>
                    //     {(msg)=><span className="text-red-600">{msg}</span>}
                    //   </ErrorMessage>
                    // }
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="pincode"
                    label="pincode"
                    fullWidth
                    variant="outlined"
                    // error={!ErrorMessage("streetAddress")}
                    // helperText={
                    //   <ErrorMessage>
                    //     {(msg)=><span className="text-red-600">{msg}</span>}
                    //   </ErrorMessage>
                    // }
                  />
                </Grid>

                <Grid  item xs={12}>
                  <Button fullWidth variant="contained" type="submit" color="primary">Deliver Here</Button>
                </Grid>
            </Grid>
          </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default Cart;
