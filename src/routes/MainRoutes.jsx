import { Route, Routes } from "react-router";
import Home from "../pages/Home";


const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>} />
    </Routes>
  );
};

export default MainRoutes;