import { Route, Routes } from "react-router";
import Home from "../pages/Home";


const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/product/:productId" element={<ProductDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/addProduct" element={<ProductAdd />} />
      <Route path="/editProduct" element={<ProductEdit />} />
    </Routes>
  );
};

export default MainRoutes;
