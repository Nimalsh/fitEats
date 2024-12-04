import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Modal,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { createOrder } from "../State/Order/Action";
import { clearCartAction, findCart } from "../State/Cart/Action";
import { startPayment } from "../State/Payment/Action";
import { getUser } from "../State/Authentication/Action";
import CartItem from "./CartItem";
import { AddressCard } from "./AddressCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,  // Increased width for more space
  height: 600,  // Height adjusts to content
  maxHeight: "80vh",  // Limit the height to 80% of the viewport height
  bgcolor: "background.paper",
  borderRadius: "16px",  // Rounded corners
  boxShadow: 24,
  p: 4,
  overflowY: "auto",  // Enables scrolling if content exceeds maxHeight
};

const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  borderRadius: "16px",  // Rounded corners
  boxShadow: 24,
  p: 4,
  maxHeight: "90vh",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const initialAddressValues = {
  streetAddress: "",
  state: "",
  pincode: "",
  city: "",
};

const Cart = () => {
  const { cart, auth } = useSelector((store) => store);
  const { user, isLoading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);

  const itemTotal = cart.cartItems.reduce((total, item) => total + item.totalPrice, 0);
  const deliveryFee = 100;
  const gstAndCharges = 500;
  const totalPay = itemTotal + deliveryFee + gstAndCharges;

  const initialPaymentValues = {
    firstName: user?.fullName || "",
    lastName: "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    country: "Sri Lanka",
  };

  useEffect(() => {
    if (!cart.id) {
      dispatch(findCart(auth.jwt));
    }
    if (auth.jwt) {
      dispatch(getUser(auth.jwt)); // Fetch user details
    }
  }, [cart.cartItems, dispatch, auth.jwt]);

  const handleAddressSubmit = async (values, { resetForm }) => {
    if (!cart.cartItems || cart.cartItems.length === 0) {
      console.error("Cart is empty!");
      return;
    }
    const defaultPizzaItem = {
      id: "default-pizza-id",  // Set a unique id for the default item
      food: {
        name: "Pizza",  // Default food name
        description: "Delicious pizza with cheese and toppings",  // Optional description
      },
      totalPrice: 500,  // Default price for the pizza
    };
    const data = {
      jwt: localStorage.getItem("jwt"),
      order: {
        deliveryAddress: {
          streetAddress: values.streetAddress,
          city: values.city,
          state: values.state,
          postalCode: values.pincode,
        },
        items: cart.cartItems && cart.cartItems.length > 0 ? cart.cartItems : [defaultPizzaItem], 
      },
    };

    try {
      await dispatch(createOrder(data));
      resetForm();
      setOpenAddressModal(false);
      setOpenPaymentModal(true); // Open the payment modal after address form submission
    } catch (error) {
      console.error("Error in creating order:", error);
    }
  };

  const handlePaymentSubmit = async (values) => {
    const jwt = localStorage.getItem("jwt");
    try {
      await dispatch(startPayment(jwt, { ...values, amount: totalPay }));
      await dispatch(clearCartAction());
      navigate("/my-profile/payment-success");
      await dispatch(clearCartAction ());
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-center text-red-500">
        <p>Failed to load user details: {error.message || error}</p>
      </div>
    );
  }

  return (
    <div>
      
      <main className="lg:flex justify-between p-4 mb-10 mt-4">
        {/* Cart Section */}
        <section className="lg:w-[30%] space-y-4">
          {cart.cartItems && cart.cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <Divider />
          <div className="px-4 text-sm">
            <Typography variant="h6">Bill Details</Typography>
            <div className="space-y-2 text-gray-600">
              <div className="flex justify-between">
                <p>Item Total</p>
                <p>LKR {itemTotal}</p>
              </div>
              <div className="flex justify-between">
                <p>Delivery Fee</p>
                <p>LKR {deliveryFee}</p>
              </div>
              <div className="flex justify-between">
                <p>GST and Charges</p>
                <p>LKR {gstAndCharges}</p>
              </div>
              <Divider />
              <div className="flex justify-between font-bold">
                <p>Total Pay</p>
                <p>LKR {totalPay}</p>
              </div>
            </div>
          </div>
        </section>

        <Divider orientation="vertical" flexItem />

        {/* Address Section */}
        <section className="lg:w-[70%] flex flex-col items-center space-y-6">
          <Typography variant="h6">Choose Delivery Address</Typography>
          <div className="flex gap-4 flex-wrap justify-center">
            <AddressCard item={initialPaymentValues} showButton={false} />
            <Card className="flex gap-3 w-64 h-64 p-4">
              <AddLocationIcon />
              <div className="text-gray-500">
                <Typography variant="subtitle1">Add New Address</Typography>
                <Button variant="contained" fullWidth onClick={() => setOpenAddressModal(true)}>
                  Add Address
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </main>

   {/* Modal for adding new address */}
<Modal open={openAddressModal} onClose={() => setOpenAddressModal(false)}>
  <Box sx={{ ...style2, width: 600 }}>
    {/* Heading for the Modal */}
    <Typography variant="h6" gutterBottom align="center" sx={{ margintop: 12 }}>
      Delivery Address
    </Typography>

    <Formik initialValues={initialAddressValues} onSubmit={handleAddressSubmit}>
      <Form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Field as={TextField} name="streetAddress" label="Street Address" fullWidth variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <Field as={TextField} name="state" label="State" fullWidth variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <Field as={TextField} name="city" label="City" fullWidth variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <Field as={TextField} name="pincode" label="Pincode" fullWidth variant="outlined" />
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


   {/* Modal for payment */}
   <Modal open={openPaymentModal} onClose={() => setOpenPaymentModal(false)}>
        <Box sx={style}>
          <Formik initialValues={initialPaymentValues} onSubmit={handlePaymentSubmit}>
            {({ values, handleChange }) => (
              <Form style={{ width: "100%" }}>
                <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: "bold", color: "#3f51b5" }}>
                  Payment Details
                </Typography>
                <Grid container spacing={3}> {/* Increased spacing */}
                  <Grid item xs={12} >
                    <Field
                      as={TextField}
                      name="firstName"
                      label="First Name"
                      fullWidth
                      variant="outlined"
                      value={values.firstName}
                      onChange={handleChange}
                      sx={{ borderRadius: "8px" }}
                    />
                  </Grid>
                  <Grid item xs={12} >
                    <Field
                      as={TextField}
                      name="lastName"
                      label="Last Name"
                      fullWidth
                      variant="outlined"
                      value={values.lastName}
                      onChange={handleChange}
                      sx={{ borderRadius: "8px" }}
                    />
                  </Grid>
                  <Grid item xs={12} >
                    <Field
                      as={TextField}
                      name="email"
                      label="Email"
                      fullWidth
                      variant="outlined"
                      value={values.email}
                      onChange={handleChange}
                      sx={{ borderRadius: "8px" }}
                    />
                  </Grid>
                  <Grid item xs={12} >
                    <Field
                      as={TextField}
                      name="phone"
                      label="Phone"
                      fullWidth
                      variant="outlined"
                      value={values.phone}
                      onChange={handleChange}
                      sx={{ borderRadius: "8px" }}
                    />
                  </Grid>
                </Grid>

                <Divider className="my-3" />

                <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#555" }}>
                  Order Summary
                </Typography>
                <Grid item xs={12}>
                  {cart.cartItems && cart.cartItems.length > 0 ? (
                    cart.cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between my-1">
                        <p>{item.food.name}</p>
                        <p>LKR {item.totalPrice}</p>
                      </div>
                    ))
                  ) : (
                    <p>No items to display</p>
                  )}
                </Grid>

                <Divider className="my-3" />

                <div className="flex justify-between font-bold mt-2 mb-3">
                  <p>Total Pay</p>
                  <p>LKR {totalPay}</p>
                </div>

                <Divider className="my-3" />

                <Button variant="contained" fullWidth type="submit" sx={{ borderRadius: "8px" }}>
                  Pay Now
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default Cart;
