import React, { useState } from "react";
import { Container, Paper, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router";
import validator from "validator";

const Register = () => {
  const [userRegister, setUserRegister] = useState({
    email: "",
    nom: "",
    prenom: "",
    mdp: "",
    tel: "",
  });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    // Validation de l'email avec validator
    if (!validator.isEmail(userRegister.email)) {
      console.error("Email invalide");
      return;
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5003/Register",
          userRegister,
          { withCredentials: true }
        );
        if (response.data.message === "Utilisateur enregistré avec succès") {
          navigate("/");
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.error("Error during registration:", error.message);
      }
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
              error={!validator.isEmail(userRegister.email)}
              helperText={
                !validator.isEmail(userRegister.email)
                  ? "Veuillez entrer une adresse email valide"
                  : ""
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="prenom"
              label="prenom"
              type="string"
              id="prenom"
              autoComplete="new-prenom"
              value={userRegister.prenom}
              onChange={(e) =>
                setUserRegister((prevUserRegister) => ({
                  ...prevUserRegister,
                  prenom: e.target.value,
                }))
              }
              required
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="nom"
              label="nom"
              type="string"
              id="nom"
              autoComplete="new-nom"
              value={userRegister.nom}
              onChange={(e) =>
                setUserRegister((prevUserRegister) => ({
                  ...prevUserRegister,
                  nom: e.target.value,
                }))
              }
              required
            />

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="mdp"
              label="Mot de passe"
              type="password"
              id="mdp"
              autoComplete="new-password"
              value={userRegister.mdp}
              onChange={(e) =>
                setUserRegister((prevUserRegister) => ({
                  ...prevUserRegister,
                  mdp: e.target.value,
                }))
              }
              required
            />

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="tel"
              label="tel"
              type="string"
              id="tel"
              autoComplete="new-telephone"
              value={userRegister.tel}
              onChange={(e) =>
                setUserRegister((prevUserRegister) => ({
                  ...prevUserRegister,
                  tel: e.target.value,
                }))
              }
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
