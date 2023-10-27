import { Button, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import ProduitCard from "./ProductCard";

const ProduitsListe = () => {
  const [produits, setProduits] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        if (user) {
          const response = await fetch("http://localhost:5003/ProduitsListe", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          });

          if (!response.ok) {
            throw new Error(
              "Erreur lors de la requête... " + response.statusText
            );
          }
          const data = await response.json();
          setProduits(data);
        }
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    fetchProduits();
  }, [user]);

  return (
    <Container>
      <Typography variant="h5" sx={{ my: 3 }}>
        Liste des Produits
      </Typography>
      {user.role === "admin" ? (
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 3 }}
          onClick={() => navigate("/addProduct")}
        >
          Ajouter un Produit
        </Button>
      ) : null}
      <Grid container spacing={2}>
        {produits.map((produit) => (
          <ProduitCard key={produit._id} produit={produit} />
        ))}
      </Grid>
    </Container>
  );
};

export default ProduitsListe;
