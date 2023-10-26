import { Route, Routes, Navigate } from "react-router";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProductList from "../components/products/ProductList";
import ProductDetail from "../components/products/ProductDetail";
import ProductAdd from "../components/products/ProductAdd";
import ProductEdit from "../components/products/ProductEdit";
import ProductDelete from "../components/products/ProductDelete";

const MainRoutes = () => {
  const storedUser = localStorage.getItem("user");
  const userRole = storedUser ? JSON.parse(storedUser).role : null;
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {userRole === "admin" && (
        <>
          <Route path="/products" element={<ProductList />} />
          <Route path="/detailProduct/:id" element={<ProductDetail />} />
          <Route path="/addProduct" element={<ProductAdd />} />
          <Route path="/modifierProduct/:id" element={<ProductEdit />} />
          <Route path="/deleteProduct/:id" element={<ProductDelete />} />
        </>
      )}

      {(userRole === "Adhérant" || userRole) && (
        <>
          <Route path="/products" element={<ProductList />} />
          <Route path="/detailProduct/:id" element={<ProductDetail />} />
        </>
      )}

      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default MainRoutes;
