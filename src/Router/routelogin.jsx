import { Route, Routes } from "react-router-dom";
import Hero from "../Components/Hero";
import Login from "../Components/login";
import Contact from "../Pages/Contact";
import About from "../Pages/About";

const RouteLogin = () => {
  return (
    <Routes>
      <Route path="/" element={<Hero/>} />
      
      <Route path="/login" element={<Login />} />
      <Route path="/contact" element={<Contact />} />
     
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default RouteLogin;
