import React from "react";
import Header from "../../components/navigation/header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../components/navigation/footer/Footer";

const MainPage = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainPage;
