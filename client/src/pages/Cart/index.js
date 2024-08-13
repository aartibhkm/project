// src/pages/CartPage.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  IconButton,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";
import { removeItem, updateItemQuantity } from "../../reducers/cartSlice"; // Adjust the path as necessary

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");

  const handleRemoveFromCart = (id) => {
    dispatch(removeItem(id));
    setSnackbarMessage("Product removed from cart successfully!");
    setSnackbarSeverity("info");
    setOpenSnackbar(true);
  };

  const handleQuantityChange = (id, change) => {
    const item = cart.find((item) => item.id === id);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity >= 1) {
        dispatch(updateItemQuantity({ id, quantity: newQuantity }));
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Box padding={3}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>
              Cart Items
            </Typography>
            {cart.length === 0 ? (
              <Typography variant="body1">Your cart is empty</Typography>
            ) : (
              <List>
                {cart.map((item) => {
                  console.log(item , "item");
                  return (
                    <ListItem key={item.id}>
                      <ListItemAvatar>
                        <Avatar alt={item.product} src={item.imageUrl} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.product}
                        secondary={`Price: ₹${item.price} | Quantity: ${
                          item.quantity
                        } | Total: ₹${item.quantity * item.price}`}
                      />
                      <IconButton
                        onClick={() => handleQuantityChange(item.id, -1)}
                        disabled={item.quantity <= 1}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography variant="body1" sx={{ marginX: 2 }}>
                        {item.quantity}
                      </Typography>
                      <IconButton
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        <AddIcon />
                      </IconButton>
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          onClick={() => handleRemoveFromCart(item.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
              </List>
            )}
            <Divider sx={{ marginY: 2 }} />
            <Typography variant="h6">Total Amount: ₹{totalAmount}</Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ShoppingCartIcon />}
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CartPage;
