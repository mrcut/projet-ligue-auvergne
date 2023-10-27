// ProduitCard.jsx
import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  Checkbox,
} from "@mui/material";
import { Link } from "react-router-dom";

const ProduitCard = ({ produit, addToBasket }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(prevState => !prevState);
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h6" component="div" sx={{ mb: 1 }}>
            {produit.nom}
          </Typography>
          <Typography color="textSecondary">{produit.description}</Typography>
        </CardContent>
        <CardActions>
          <Checkbox
            checked={isChecked}
            onChange={handleCheckboxChange}
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
  );
};

export default ProduitCard;
