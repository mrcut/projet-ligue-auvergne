import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h6" component="div" sx={{ mb: 1 }}>
            {`${user.nom} ${user.prenom}`}
          </Typography>
          <Typography color="textSecondary">{`Email: ${user.email}`}</Typography>
          <Typography color="textSecondary">{`Téléphone: ${user.tel}`}</Typography>
        </CardContent>
        <CardActions>
          {["Detail", "Modifier", "Delete"].map((action, index) => (
            <Link
              key={index}
              to={`/${action.toLowerCase()}User/${user._id}`}
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

export default UserCard;
