import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import InputMail, { regEXEmail } from "../components/forms/InputMail";
import UserContext from "../components/contexts/UserContext";

const Login = () => {
  const { setUser } = useContext(UserContext);

  const [userLog, setUserLog] = useState({ email: "", mdp: "" });
  const [isValidEmail, setIsValidEmail] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setUserLog((prevUserLog) => ({
      ...prevUserLog,
      [fieldName]: value,
    }));

    if (fieldName === "email") {
      setIsValidEmail(regEXEmail.test(value));
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5003/Login",

        userLog,
        { withCredentials: true }
      );
      console.log(response.data);
      if (response.data.message === "Utilisateur connecté avec succès") {
        console.log(response.data);
        console.log(response.data.user);
        setUser({ ...response.data.user, token: response.data.token });
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...response.data.user,
            token: response.data.token,
          })
        );
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <Container maxWidth="sm">
        <form onSubmit={submit}>
          <InputMail
            label="Login"
            placeholder="Votre Login"
            onChange={(e) => handleInputChange(e, "email")}
            value={userLog.email}
          />
          <TextField
            fullWidth
            name="mdp"
            type="password"
            variant="outlined"
            label="Mot de passe"
            placeholder="Votre Mot de passe"
            onChange={(e) => handleInputChange(e, "mdp")}
            value={userLog.mdp}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isValidEmail}
          >
            Login
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default Login;
