import { useState } from "react";
import { Container, Paper, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router";

const Login = () => {
  const [userLog, setUserLog] = useState({ email: "", mdp: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.post("http://localhost:5003/Login", userLog, { withCredentials: true });
      console.log(response.data)
      if(response.data.message === 'Utilisateur connecté avec succès'){
        navigate('/')
      }

    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Paper elevation={3}>
          <Typography variant="h5">Connexion</Typography>
          <form onSubmit={submit}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              value={userLog.email}
              onChange={(e) =>
                setUserLog((prevUserLog) => ({
                  ...prevUserLog,
                  email: e.target.value,
                }))
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="mdp"
              label="Mot de passe"
              type="password"
              id="mdp"
              autoComplete="current-password"
              value={userLog.mdp}
              onChange={(e) =>
                setUserLog((prevUserLog) => ({
                  ...prevUserLog,
                  mdp: e.target.value,
                }))
              }
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Connexion
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default Login;
