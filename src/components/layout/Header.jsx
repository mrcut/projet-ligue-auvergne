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
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, setUser } = useAuth();

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
  };

  return (
    <AppBar position="fixed" color="info">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box>
          {user?.role && (
            <>
              <Button color="inherit" component={Link} to="/products">
                Foot
              </Button>
              <Button color="inherit" component={Link} to="/products">
                Tennis
              </Button>
              <Button color="inherit" component={Link} to="/products">
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
              }}
              component={Link}
              to="/"
            >
              Projet Ligue Auvergne
            </Typography>
          </Box>
        </Toolbar>

        <Box>
          {user?.role && (
            <>
              {user?.role === "commercant" && (
                <>
                  <Button
                    color="inherit"
                    component={Link}
                    to={`/basket`}
                  >
                    Panier
                  </Button>
                </>
              )}
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
                  component={Link}
                  to={`/detailUser/${user._id}`}
                >
                  Account
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                {user?.role === "admin" && (
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
