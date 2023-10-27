import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardActions,
  CardContent,
  Checkbox,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
const ProduitsListe = () => {
  const [produits, setProduits] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

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

  const addToBasket = () => {
    // Récupérer le panier depuis le local storage
    const storedBasket = localStorage.getItem("basket");
    const basket = storedBasket ? JSON.parse(storedBasket) : [];

    // Ajouter les produits sélectionnés au panier
    const updatedBasket = [...basket, ...selectedProducts];

    // Mettre à jour le local storage
    localStorage.setItem("basket", JSON.stringify(updatedBasket));
    navigate("/Basket");
  };

  const handleCheckboxChange = (product) => {
    // Fonction pour gérer le changement d'état de la checkbox
    setSelectedProducts((prevSelected) => {
      const isProductSelected = prevSelected.some((p) => p._id === product._id);

      if (isProductSelected) {
        return prevSelected.filter((p) => p._id !== product._id);
      } else {
        return [...prevSelected, product];
      }
    });
  };

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
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 3 }}
        onClick={addToBasket}
      >
        Ajouter au panier
      </Button>
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
                <Checkbox
                  checked={selectedProducts.some((p) => p._id === produit._id)}
                  onChange={() => handleCheckboxChange(produit)}
                  color="primary"
                />
                {["Detail", "Modifier", "Delete"].map((action, index) => (
                  <Link
                    key={index}
                    to={`/${action.toLowerCase()}Product/${produit._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      size="small"
                      color={action === "Delete" ? "secondary" : "primary"}
                    >
                      {action}
                    </Button>
                  </Link>
                ))}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProduitsListe;
