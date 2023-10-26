import React, { useState, useEffect } from "react";
import {
  CardActions,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ProduitsListe = () => {
  const navigate = useNavigate();

  const [produits, setProduits] = useState([]);

  useEffect(() => {
    // Effectuer la requête GET pour obtenir la liste des produits
    axios
      .get("http://localhost:5003/ProduitsListe")
      .then((response) => {
        setProduits(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error.message);
      });
  }, []);
  useEffect(() => {
    // Cette fonction sera appelée chaque fois que produits change
    console.log(produits);
  }, [produits]); // produits est maintenant une dépendance de ce useEffect

  return (
    <Container>
      <Typography variant="h5" sx={{ marginTop: 3, marginBottom: 3 }}>
        Liste des Produits
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: 3 }}
        onClick={() => navigate("/addProduct")}
      >
        Ajouter un Produit
      </Button>
      <Grid container spacing={2}>
        {produits.map((produit) => (
          <Grid item key={produit.id} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardContent style={{ flex: 1 }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ marginBottom: 1 }}
                >
                  {produit.nom}
                </Typography>
                <Typography color="textSecondary">
                  {produit.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Link
                  to={`/product/${produit._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button size="small" color="primary">
                    Detail
                  </Button>
                </Link>

                <Link
                  to={`/editProduct/${produit._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button size="small" color="primary">
                    Modifier
                  </Button>
                </Link>

                <Link
                  to={`/deleteProduct/${produit._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button size="small" color="secondary">
                    Supprimer
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProduitsListe;
