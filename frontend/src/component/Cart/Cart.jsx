import { Box, Button, Card, Divider, Grid, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { AddressCard } from "./AddressCard";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../State/store";
import { createOrder } from "../State/Order/Action";
import { clearCartAction, findCart } from "../State/Cart/Action";
import { Formik, Form, Field, ErrorMessage } from "formik";


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

// Initial values for the address form
const initialValues = {
  streetAddress: "",
  state: "",
  pincode: "",
  city: "",
};

// Validation function
const validateForm = (values) => {
  const errors = {};
  if (!values.streetAddress) {
    errors.streetAddress = "Street address is required";
  }
  if (!values.state) {
    errors.state = "State is required";
  }
  if (!values.city) {
    errors.city = "City is required";
  }
  if (!values.pincode) {
    errors.pincode = "Postal code is required";
  }
  return errors;
};

const Cart = () => {
  const { cart, auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cart.id) {
      dispatch(findCart(auth.jwt));
    }
  }, [cart.id, dispatch, auth.jwt]);

  console.log("Cart Object:", cart);

  const handleSubmit = async (values, { resetForm }) => {
    const data = {
      jwt: localStorage.getItem("jwt"),
      order: {
        deliveryAddress: {
          streetAddress: values.streetAddress || "",
          city: values.city || "",
          state: values.state || "",
          postalCode: values.pincode || "",
        },
      },
    };

    try {
      await dispatch(createOrder(data)); // Create order
      await dispatch(clearCartAction()); // Clear cart
      resetForm(); // Clear form fields
      setOpen(false); // Close modal
      console.log("Order created and cart cleared successfully.");
    } catch (error) {
      console.error("Error in creating order or clearing cart:", error);
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleOpenAddressModel = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const itemTotal = cart.cartItems.reduce((total, item) => total + item.totalPrice, 0);
  const deliveryFee = 100;
  const gstAndCharges = 500;
  const totalPay = itemTotal + deliveryFee + gstAndCharges;

  return (
    <div>
      <main className="lg:flex justify-between">
        {/* Cart Items Section */}
        <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
          {cart.cartItems?.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

          <Divider />
          <div className="billDetails px-5 text-sm">
            <p className="font-extralight py-5">Bill Details</p>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-400">
                <p>Item Total</p>
                <p>LKR {itemTotal}</p>
              </div>

              <div className="flex justify-between text-gray-400">
                <p>Delivery Fee</p>
                <p>LKR {deliveryFee}</p>
              </div>

              <div className="flex justify-between text-gray-400">
                <p>GST and Restaurant charges</p>
                <p>LKR {gstAndCharges}</p>
              </div>
              <Divider />
            </div>
            <div className="flex justify-between text-gray-400">
              <p>Total Pay</p>
              <p>LKR {totalPay}</p>
            </div>
          </div>
        </section>

        <Divider orientation="vertical" flexItem />

        {/* Address Section */}
        <section className="lg:w-[70%] flex flex-col items-center px-5 pb-10 lg:pb-0">
          <div className="text-center font-semibold text-2xl py-10">
            Choose Delivery Address
          </div>
          <div className="flex gap-5 flex-wrap justify-center">
            {[1].map((item, index) => (
              <AddressCard
                handleSelectAddress={() => {}}
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

      {/* Modal for adding new address */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validate={validateForm}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="streetAddress"
                    label="Street Address"
                    fullWidth
                    variant="outlined"
                    helperText={<ErrorMessage name="streetAddress" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="state"
                    label="State"
                    fullWidth
                    variant="outlined"
                    helperText={<ErrorMessage name="state" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="city"
                    label="City"
                    fullWidth
                    variant="outlined"
                    helperText={<ErrorMessage name="city" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="pincode"
                    label="Pincode"
                    fullWidth
                    variant="outlined"
                    helperText={<ErrorMessage name="pincode" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button fullWidth variant="contained" type="submit" color="primary">
                    Deliver Here
                  </Button>
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
