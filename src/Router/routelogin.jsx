import { Route, Routes } from "react-router-dom";
import Hero from "../Components/Hero";
import Login from "../Components/login";

const RouteLogin = () => {
  return (
    <Routes>
      <Route path="/" element={<Hero/>} />
      
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default RouteLogin;
