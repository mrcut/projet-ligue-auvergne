import React, { useState } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductAdd = () => {
  const [newProduct, setNewProduct] = useState({
    nom: "",
    quantite: 0,
    // Ajoutez d'autres champs pour les nouvelles valeurs si nécessaire
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5003/ProduitAjouter", newProduct);
      navigate("/products");
    } catch (error) {
      console.error("Error adding product:", error.message);
    }
  };

  return (
    <Container>
      <Typography variant="h5" sx={{ marginTop: 3, marginBottom: 3 }}>
        Ajouter un Nouveau Produit
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="nom"
          label="Nom"
          name="nom"
          value={newProduct.nom}
          onChange={handleInputChange}
          required
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="quantite"
          label="Quantité"
          name="quantite"
          type="number"
          value={newProduct.quantite}
          onChange={handleInputChange}
          required
        />
        {/* Ajoutez d'autres champs d'entrée pour les nouvelles valeurs si nécessaire */}
        
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Ajouter le Produit
        </Button>
      </form>
    </Container>
  );
};

export default ProductAdd;
