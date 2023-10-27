import { Route, Routes, Navigate } from "react-router";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProductList from "../components/products/ProductList";
import ProductDetail from "../components/products/ProductDetail";
import ProductAdd from "../components/products/ProductAdd";
import ProductEdit from "../components/products/ProductEdit";
import ProductDelete from "../components/products/ProductDelete";
import { useAuth } from "../components/contexts/AuthProvider";
import UsersList from "../components/users/UserList";
import UserEdit from "../components/users/UserEdit";
import UserDetail from "../components/users/UserDetails";
import UserDelete from "../components/users/UserDelete";

const MainRoutes = () => {
  const { user, setUser } = useAuth();

  return (
    <Routes>
      <Route path="/" element={!user?.role ? <Login /> : <Home />} />

      {user?.role === "admin" && (
        <>
          <Route path="/products" element={<ProductList />} />
          <Route path="/detailProduct/:id" element={<ProductDetail />} />
          <Route path="/addProduct" element={<ProductAdd />} />
          <Route path="/modifierProduct/:id" element={<ProductEdit />} />
          <Route path="/deleteProduct/:id" element={<ProductDelete />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/modifierUser/:id" element={<UserEdit />} />
          <Route path="/deleteUser/:id" element={<UserDelete />} />

        </>
      )}

      {(user?.role === "Adhérant" || user?.role) && (
        <>
          <Route path="/products" element={<ProductList />} />
          <Route path="/detailProduct/:id" element={<ProductDetail />} />

        </>
      )}
      
      <Route path="/detailUser/:id" element={<UserDetail />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default MainRoutes;
