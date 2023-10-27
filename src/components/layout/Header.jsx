import { AccountCircleRounded } from "@mui/icons-material";
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
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useBasket } from "../contexts/BasketContext";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, setUser } = useAuth();
  const { basket } = useBasket();
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
    handleClose();
  };

  const adminMenuItems = [
    { label: "Liste des Produits", path: "/products" },
    { label: "Liste des Users", path: "/users" },
  ];

  return (
    <AppBar position="fixed" color="info">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box>
          {user && (
            <>
              <Button color="inherit" component={RouterLink} to="/products">
                Foot
              </Button>
              <Button color="inherit" component={RouterLink} to="/products">
                Tennis
              </Button>
              <Button color="inherit" component={RouterLink} to="/products">
                Natation
              </Button>
            </>
          )}
        </Box>
        <Toolbar>
          <Box sx={{ textAlign: "center", flexGrow: 1 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "white",
                textShadow: "4px 2px 6px #000",
                textDecoration: "none",
              }}
              component={RouterLink}
              to="/"
            >
              Projet Ligue Auvergne
            </Typography>
          </Box>
        </Toolbar>
        <Box>
          {user && basket.length > 0 && (
            <Button color="inherit" component={RouterLink} to="/basket">
              Basket ({basket.length})
            </Button>
          )}
        </Box>

        <Box>
          {user && (
            <>
              <Button color="inherit" onClick={handleMenu}>
                <AccountCircleRounded sx={{ fontSize: "large" }} />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={handleClose}
                  component={RouterLink}
                  to="/profile"
                >
                  Account
                </MenuItem>
                {user.role === "admin" &&
                  adminMenuItems.map((item) => (
                    <MenuItem
                      key={item.label}
                      onClick={handleClose}
                      component={RouterLink}
                      to={item.path}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
