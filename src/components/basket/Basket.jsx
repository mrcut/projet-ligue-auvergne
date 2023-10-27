import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { Link } from "react-router-dom";
const Basket = () => {
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    // Charger le panier depuis le local storage
    const storedBasket = localStorage.getItem("basket");
    if (storedBasket) {
      setBasket(JSON.parse(storedBasket));
    }
  }, []);

  const removeFromBasket = (productId) => {
    // Supprimer un produit du panier
    const updatedBasket = basket.filter((item) => item._id !== productId);
    setBasket(updatedBasket);
    // Mettre à jour le local storage
    localStorage.setItem("basket", JSON.stringify(updatedBasket));
  };

  return (
    <Container>
      <Typography variant="h5" sx={{ my: 3 }}>
        Panier
      </Typography>
      {basket.length === 0 ? (
        <Typography variant="body1">Le panier est vide.</Typography>
      ) : (
        <Grid container spacing={2}>
          {basket.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                    {item.nom}
                  </Typography>
                  <Typography color="textSecondary">{item.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => removeFromBasket(item._id)}
                  >
                    Supprimer
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        component={Link}
        to="/products"
      >
        Retour à la Liste des Produits
      </Button>
    </Container>
  );
};

export default Basket;
