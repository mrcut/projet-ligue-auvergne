import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const userStored = localStorage.getItem("user");
    const token = userStored ? JSON.parse(userStored).token : null;

    if (token) {
      axios
        .get(`http://localhost:5003/ProduitsListe/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error("Error fetching product details:", error.message);
        });
    } else {
      console.error("Token not found");
    }
  }, [id]);

  return (
    <Container>
      <Typography variant="h5" sx={{ marginTop: 3, marginBottom: 3 }}>
        Détails du Produit
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h6" component="div" sx={{ marginBottom: 1 }}>
            Nom: {product.nom}
          </Typography>
          <Typography color="textSecondary">
            Quantité: {product.quantite}
          </Typography>
        </CardContent>
      </Card>

      <Button
        component={Link}
        to="/products"
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
      >
        Retour à la liste des produits
      </Button>
    </Container>
  );
};

export default ProductDetail;
