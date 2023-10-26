import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import ProductList from "../components/products/ProducList";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>} />
      <Route path="/productsList" element={<ProductList></ProductList>} />

    </Routes>
  );
};

export default MainRoutes;