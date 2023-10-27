import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardActions,
  CardContent,
  IconButton,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useBasket } from "../contexts/BasketContext";

const ProductList = () => {
  const [produits, setProduits] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { basket, addToBasket, removeFromBasket } = useBasket();

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const userStored = localStorage.getItem("user");
        if (!userStored) return console.error("User not found in localStorage");

        const { token } = JSON.parse(userStored);
        if (!token)
          return console.error(
            "Token not found in the user object from localStorage"
          );

        // Récupérer le panier depuis le local storage
        const storedBasket = localStorage.getItem("basket");
        const basket = storedBasket ? JSON.parse(storedBasket) : [];

        const response = await fetch("http://localhost:5003/ProduitsListe", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok)
          throw new Error("Network response was not ok " + response.statusText);
        const data = await response.json();

        // Filtrer les produits qui ne sont pas dans le panier
        const filteredProducts = data.filter(
          (product) => !basket.some((p) => p._id === product._id)
        );

        setProduits(filteredProducts);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProduits();
  }, []);

  const getQuantity = (productId) => {
    const product = basket.find((p) => p._id === productId);
    return product ? product.quantity : 0;
  };

  return (
    <Container>
      <Typography variant="h5" sx={{ my: 3 }}>
        Liste des Produits
      </Typography>
      {user?.role === "admin" && (
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 3 }}
          onClick={() => navigate("/addProduct")}
        >
          Ajouter un Produit
        </Button>
      )}
      <Grid container spacing={2}>
        {produits.map((produit) => (
          <Grid item xs={12} sm={6} md={4} key={produit._id}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                  {produit.nom}
                </Typography>
                <Typography color="textSecondary">
                  {produit.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() => addToBasket(produit)}
                  startIcon={<AddCircleOutlineIcon />}
                  sx={{ mx: 1 }}
                />
                <Typography>{getQuantity(produit._id)}</Typography>
                <Button
                  onClick={() => removeFromBasket(produit._id)}
                  startIcon={<RemoveCircleOutlineIcon />}
                  sx={{ mx: 1 }}
                />
                <Link
                  to={`/detailProduct/${produit._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <IconButton color="primary" aria-label="view details">
                    <InfoIcon />
                  </IconButton>
                </Link>
                {user?.role === "admin" && (
                  <>
                    <Link
                      to={`/editProduct/${produit._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <IconButton color="primary" aria-label="edit product">
                        <EditIcon />
                      </IconButton>
                    </Link>
                    <Link
                      to={`/deleteProduct/${produit._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <IconButton color="secondary" aria-label="delete product">
                        <DeleteIcon />
                      </IconButton>
                    </Link>
                  </>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
