import { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  IconButton,
  Box,
  TextField,
} from "@mui/material";
import { Add, Remove, Info, Edit, Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";

const ProduitCard = ({ produit, addToBasket }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    const value = Math.max(1, parseInt(event.target.value, 10) || 1);
    setQuantity(value);
  };

  const handleAddToBasket = () => {
    addToBasket({ ...produit, quantity });
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h6" component="div" sx={{ mb: 1 }}>
            {produit.nom}
          </Typography>
          <Typography color="textSecondary" sx={{ mb: 1 }}>
            {produit.description}
          </Typography>
          <Typography color="textSecondary">Price: {produit.price}€</Typography>
        </CardContent>
        <CardActions>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
              <Remove />
            </IconButton>
            <TextField
              size="small"
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              inputProps={{ min: 1, style: { textAlign: "center" } }}
              sx={{ width: "3rem" }}
            />
            <IconButton onClick={() => setQuantity((q) => q + 1)}>
              <Add />
            </IconButton>
          </Box>
          <Button size="small" color="primary" onClick={handleAddToBasket}>
            Add to Basket
          </Button>
          <IconButton
            color="primary"
            component={Link}
            to={`/detailProduct/${produit._id}`}
            size="small"
          >
            <Info />
          </IconButton>
          <IconButton
            color="secondary"
            component={Link}
            to={`/editProduct/${produit._id}`}
            size="small"
          >
            <Edit />
          </IconButton>
          <IconButton color="error" size="small">
            <Delete />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProduitCard;
