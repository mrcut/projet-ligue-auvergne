import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/contexts/AuthProvider";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import MainRoutes from "./routes/MainRoutes";
import { BasketProvider } from "./components/contexts/BasketContext";

function App() {
  return (
    <AuthProvider>
      <BasketProvider>
        <BrowserRouter>
          <Header />
          <MainRoutes />
          <Footer />
        </BrowserRouter>
      </BasketProvider>
    </AuthProvider>
  );
}

export default App;
