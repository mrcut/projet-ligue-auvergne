import {
  Avatar,
  Button,
  Container,
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const ProductAdd = () => {
  const [newProduct, setNewProduct] = useState({
    nom: "",
    quantite: 0,
    type: "foot",
    price: "",
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
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <ShoppingCartIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Ajouter un Nouveau Produit
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="nom"
            autoFocus
            label="Nom"
            name="nom"
            value={newProduct.nom}
            onChange={handleInputChange}
            required
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="quantite"
            label="Quantité"
            name="quantite"
            type="number"
            value={newProduct.quantite}
            onChange={handleInputChange}
          />

          <FormControl fullWidth>
            <InputLabel id="product-label">Type de Produit</InputLabel>
            <Select
              labelId="product-label"
              id="type"
              name="type"
              value={newProduct.type}
              onChange={handleInputChange}
            >
              <MenuItem value="foot">Foot</MenuItem>
              <MenuItem value="tennis">Tennis</MenuItem>
              <MenuItem value="natation">Natation</MenuItem>
            </Select>
          </FormControl>
          <OutlinedInput
            variant="outlined"
            margin="normal"
            fullWidth
            id="price"
            label="Nouveau Prix"
            name="price"
            type="number"
            value={newProduct.price}
            onChange={handleInputChange}
            endAdornment={<InputAdornment position="end">€</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Ajouter
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductAdd;
