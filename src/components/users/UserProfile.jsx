import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import { useAuth } from "../contexts/AuthProvider";

const UserProfile = () => {
  const { id } = useParams();
  const { user, setUser } = useAuth();
  const [newValues, setNewValues] = useState({
    nom: "",
    prenom: "",
    tel: "",
    email: "",
    role: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5003/UsersList/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
          setNewValues((prevValues) => ({
            ...prevValues,
            nom: response.data.nom || "",
            prenom: response.data.prenom || "",
            tel: response.data.tel || "",
            email: response.data.email || "",
            role: response.data.role || "",
          }));
        })
        .catch((error) => {
          console.error("Error fetching user details:", error.message);
        });
    } else {
      console.error("Token not found");
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userStored = localStorage.getItem("user");
      const token = userStored ? JSON.parse(userStored).token : null;

      if (!token) {
        console.error("Token not found");
        return;
      }

      await axios.put(`http://localhost:5003/UserModifier/${id}`, newValues, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/users");
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "80vh",
        p: 2,
        mt: "5%",
      }}
      maxWidth="sm"
    >
      <Typography component="h1" variant="h5">
        Mes Infos
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container sx={{ pt: 5 }} spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="email"
              name="email"
              label="email"
              type="mail"
              value={user.prenom}
              variant="outlined"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="nom"
              name="nom"
              label="nom"
              value={user.nom}
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="prenom"
              name="prenom"
              label="prenom"
              value={user.prenom}
              variant="outlined"
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="tel"
              name="tel"
              label="tel"
              value={user.tel}
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" endIcon={<SendIcon />} fullWidth>
              Send
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default UserProfile;
