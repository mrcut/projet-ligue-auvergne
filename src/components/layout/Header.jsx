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
  const storedUser = localStorage.getItem("user");
  const userRole = storedUser ? JSON.parse(storedUser).role : null;

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
          {userRole && (
            <>
              <Button color="inherit" component={Link} to="/products">
                Produits Foot
              </Button>
            </>
          )}
        </Box>

        <Box>
          {!userRole && (
            <>
              <Button color="inherit" component={Link} to="/login">
                Se connecter
              </Button>
            </>
          )}

          {userRole && (
            <>
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
                {userRole === "admin" && (
                  <>
                    <MenuItem
                      onClick={handleClose}
                      component={Link}
                      to="/products"
                    >
                      Liste des Produits
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      component={Link}
                      to="/users"
                    >
                      List Users
                    </MenuItem>
                  </>
                )}
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
