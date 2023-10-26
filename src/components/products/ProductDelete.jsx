import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import axios from "axios";

const ProductDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteProduct = async () => {
      try {
        await axios.delete(`http://localhost:5003/ProduitSuprimmer/${id}`);
        navigate("/products");
      } catch (error) {
        console.error("Error deleting product:", error.message);
      }
    };

    deleteProduct();
  }, [id, navigate]);

  return (
    <Container>
      <Typography variant="h5" sx={{ marginTop: 3, marginBottom: 3 }}>
        Suppression du Produit
      </Typography>
      <Typography variant="body1">
        Le produit a été supprimé avec succès.
      </Typography>
      <Button component={Link} to="/products" variant="contained" color="primary" sx={{ marginTop: 2 }}>
        Retour à la Liste des Produits
      </Button>
    </Container>
  );
};

export default ProductDelete;
