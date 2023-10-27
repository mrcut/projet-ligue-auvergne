import { Box, Container, Typography } from "@mui/material";
import { useAuth } from "../components/contexts/AuthProvider";
const Home = () => {
  const { user } = useAuth();
  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="80vh"
        textAlign="center"
      >
        <Typography variant="h2" color="textPrimary" gutterBottom>
          Site Projet Ligue Auvergne
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Bievenue sur notre site {user.prenom} {user.nom} !
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
