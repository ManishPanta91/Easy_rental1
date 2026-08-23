import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import Explore from "../Components/Explore";

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1" />
      <Hero />
      <Explore/>
      <Footer />
    </div>
  );
};

export default Layout;
