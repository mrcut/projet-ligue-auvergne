import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import UserCard from "./UserCard";

const UsersList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userStored = localStorage.getItem("user");
        if (!userStored) return console.error("User not found in localStorage");

        const { token } = JSON.parse(userStored);
        if (!token)
          return console.error(
            "Token not found in user object from localStorage"
          );

        const response = await fetch("http://localhost:5003/UsersList", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok)
          throw new Error("Network response was not ok " + response.statusText);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Container>
      <Typography variant="h5" sx={{ my: 3 }}>
        Liste des Utilisateurs
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 3 }}
        onClick={() => navigate("/addUser")}
      >
        Ajouter un Utilisateur
      </Button>
      <Grid container spacing={2}>
        {users.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </Grid>
    </Container>
  );
};

export default UsersList;
