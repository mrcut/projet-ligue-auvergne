import { Button, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard";
import { useAuth } from "../contexts/AuthProvider";

const UsersList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5003/UsersList", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        });

        const data = await response.json();
        setUserList(data);
        console.log(setUserList);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (user) {
      fetchUsers();
    } else {
      navigate("/login");
    }
  }, [user, navigate, setUserList]);

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
        {userList.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </Grid>
    </Container>
  );
};

export default UsersList;
