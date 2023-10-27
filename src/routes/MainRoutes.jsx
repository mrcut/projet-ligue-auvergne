import { Navigate, Route, Routes } from "react-router";
import { useAuth } from "../components/contexts/AuthProvider";
import ProductAdd from "../components/products/ProductAdd";
import ProductDelete from "../components/products/ProductDelete";
import ProductDetail from "../components/products/ProductDetail";
import ProductEdit from "../components/products/ProductEdit";
import ProductList from "../components/products/ProductList";
import UserDelete from "../components/users/UserDelete";
import UserEdit from "../components/users/UserEdit";
import UsersList from "../components/users/UserList";
import UserProfile from "../components/users/UserProfile";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

const MainRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/" />}
      />

      {user && (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/detailProduct/:id" element={<ProductDetail />} />
          <Route path="/profile/" element={<UserProfile />} />

          {user.role === "admin" && (
            <>
              <Route path="/addProduct" element={<ProductAdd />} />
              <Route path="/modifierProduct/:id" element={<ProductEdit />} />
              <Route path="/deleteProduct/:id" element={<ProductDelete />} />
              <Route path="/users" element={<UsersList />} />
              <Route path="/modifierUser/:id" element={<UserEdit />} />
              <Route path="/deleteUser/:id" element={<UserDelete />} />
            </>
          )}
        </>
      )}

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default MainRoutes;
