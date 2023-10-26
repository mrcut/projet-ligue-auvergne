import { BrowserRouter } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import MainRoutes from "./routes/MainRoutes";
import UserContext from "./components/contexts/UserContext";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || {}
  );

  const contextValue = { user, setUser };

  return (
    <UserContext.Provider value={contextValue}>
      <BrowserRouter>
        <Header />
        <MainRoutes />
        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
