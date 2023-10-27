import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/contexts/AuthProvider";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import MainRoutes from "./routes/MainRoutes";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <MainRoutes />
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
