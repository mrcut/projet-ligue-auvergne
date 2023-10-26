import React, { useState } from "react";
import { Container, Paper, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router";

const Register = () => {
  const [userRegister, setUserRegister] = useState({ email: "", mdp: "" }); // Ajuste ici le nom du champ pour le mot de passe
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5003/Register",
        userRegister,
        { withCredentials: true }
      );
      console.log(response.data); // Gérer la réponse si nécessaire
    } catch (error) {
      console.error("Error during registration:", error.message);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Paper elevation={3}>
          <Typography variant="h5">Inscription</Typography>
          <form onSubmit={submit}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              value={userRegister.email}
              onChange={(e) =>
                setUserRegister((prevUserRegister) => ({
                  ...prevUserRegister,
                  email: e.target.value,
                }))
              }
              required
              inputProps={{
                pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}"
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="mdp" // Ajuste ici le nom du champ pour le mot de passe
              label="Mot de passe"
              type="password"
              id="mdp" // Ajuste ici le nom du champ pour le mot de passe
              autoComplete="new-password"
              value={userRegister.mdp} // Ajuste ici le nom du champ pour le mot de passe
              onChange={(e) =>
                setUserRegister((prevUserRegister) => ({
                  ...prevUserRegister,
                  mdp: e.target.value, // Ajuste ici le nom du champ pour le mot de passe
                }))
              }
              required
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              S'inscrire
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default Register;
