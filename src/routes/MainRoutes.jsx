import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProductList from "../components/products/ProductList";
import ProductDetail from "../components/products/ProductDetail";
import ProductAdd from "../components/products/ProductAdd";
import ProductEdit from "../components/products/ProductEdit";
import ProductDelete from "../components/products/ProductDelete";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/addProduct" element={<ProductAdd />} />
      <Route path="/editProduct/:id" element={<ProductEdit />} />
      <Route path="/deleteProduct/:id" element={<ProductDelete />} />

    </Routes>
  );
};

export default MainRoutes;
