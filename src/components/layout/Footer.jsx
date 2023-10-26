import { AppBar, Toolbar, Typography, Box } from "@mui/material";

const Footbar = () => {
  return (
    <AppBar position="fixed" color="info" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar>
        <Box sx={{ textAlign: "center", flexGrow: 1 }}>
          <Typography variant="body1" color="inherit">
            Projet Ligue Auvergne © 2023
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Footbar;
