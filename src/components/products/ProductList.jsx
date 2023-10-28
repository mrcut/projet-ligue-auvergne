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
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useBasket } from "../contexts/BasketContext";

const ProductList = ({ type }) => {
  const [produits, setProduits] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { basket, addToBasket, removeFromBasket } = useBasket();
  const params = useParams();
  useEffect(() => {
    const fetchProduits = async () => {
      try {
        if (user) {
          const storedBasket = localStorage.getItem("basket");
          const basket = storedBasket ? JSON.parse(storedBasket) : [];

          const response = await fetch("http://localhost:5003/ProduitsListe", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            },
          });

          if (!response.ok) {
            throw new Error(
              "Network response was not ok " + response.statusText
            );
          }
          const data = await response.json();

          let filteredProducts = data.filter(
            (product) => !basket.includes(product._id)
          );

          if (type) {
            filteredProducts = filteredProducts.filter(
              (product) => product.type === type
            );
          }

          setProduits(filteredProducts);
        }
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    fetchProduits();
  }, [user, type]);

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
