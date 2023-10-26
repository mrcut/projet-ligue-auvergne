import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" color="info">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/products">
            Produits Foot
          </Button>
          <Button color="inherit" component={Link} to="/products">
            Produits Natation
          </Button>
        </Box>

        <Box sx={{ textAlign: "center", flexGrow: 1 }}>
          <Typography variant="h6" color="inherit">
            Projet Ligue Auvergne
          </Typography>
        </Box>

        <Box>
          <Button color="inherit" onClick={handleMenu}>
            Menu
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} component={Link} to="/account">
              Account
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/products">
              Liste des Produits
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/users">
              List Users
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
