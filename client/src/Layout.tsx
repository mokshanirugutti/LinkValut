import React from "react";
import { Outlet } from "react-router";
import Navbar from "@/components/nav/NavBar";
import Footer from "@/components/footer/Footer";

const Layout : React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;