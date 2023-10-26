import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const ProduitCard = ({ produit }) => {
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
          {["Detail", "Modifier", "Supprimer"].map((action, index) => (
            <Link
              key={index}
              to={`/${action.toLowerCase()}Product/${produit._id}`}
              style={{ textDecoration: "none" }}
            >
              <Button
                size="small"
                color={action === "Supprimer" ? "secondary" : "primary"}
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
