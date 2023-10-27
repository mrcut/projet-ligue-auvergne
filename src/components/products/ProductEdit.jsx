import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../contexts/AuthProvider";

const ProductEdit = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [newValues, setNewValues] = useState({
    nom: "",
    quantite: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5003/ProduitsListe/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          setProduct(response.data);
          setNewValues((prevValues) => ({
            ...prevValues,
            nom: response.data.nom,
            quantite: response.data.quantite,
          }));
        })
        .catch((error) => {
          console.error("Error fetching product details:", error.message);
        });
    } else {
      console.error("User not found");
    }
  }, [id, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5003/ProduitModifier/${id}`, newValues);
      navigate("/products");
    } catch (error) {
      console.error("Error updating product:", error.message);
    }
  };

  return (
    <Container>
      <Typography variant="h5" sx={{ marginTop: 3, marginBottom: 3 }}>
        Modifier le Produit
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ marginBottom: 1 }}
                >
                  Ancien Nom: {product.nom}
                </Typography>
                <Typography color="textSecondary">
                  Ancienne Quantité: {product.quantite}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="nom"
                  label="Nouveau Nom"
                  name="nom"
                  value={newValues.nom}
                  onChange={handleInputChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="quantite"
                  label="Nouvelle Quantité"
                  name="quantite"
                  type="number"
                  value={newValues.quantite}
                  onChange={handleInputChange}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Enregistrer les modifications
        </Button>
      </form>
    </Container>
  );
};

export default ProductEdit;
