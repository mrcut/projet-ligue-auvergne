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
import { Link, useNavigate } from "react-router-dom";
import ProduitCard from "./ProductCard";

const ProduitsListe = () => {
  const navigate = useNavigate();
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const userStored = localStorage.getItem("user");
        if (!userStored) return console.error("User not found in localStorage");

        const { token } = JSON.parse(userStored);
        if (!token)
          return console.error(
            "Token not found in user object from localStorage"
          );

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
        setProduits(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProduits();
  }, []);

  return (
    <Container>
      <Typography variant="h5" sx={{ my: 3 }}>
        Liste des Produits
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 3 }}
        onClick={() => navigate("/addProduct")}
      >
        Ajouter un Produit
      </Button>
      <Grid container spacing={2}>
        {produits.map((produit) => (
          <ProduitCard key={produit._id} produit={produit} />
        ))}
      </Grid>
    </Container>
  );
};

export default ProduitsListe;
