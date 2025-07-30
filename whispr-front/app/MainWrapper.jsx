"use client";

import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainWrapper = ({ children }) => {
  const pathname = usePathname();
  const hideNavbarRoutes = ["/register", "/login"];

  const shouldHideNavbar = hideNavbarRoutes.includes(pathname);

  return (
    <AuthProvider>
      <div>
        {!shouldHideNavbar && <Navbar />}
        <main className={`${!shouldHideNavbar && "max-w-7xl"} mx-auto`}>
          {children}
          {!shouldHideNavbar && <Footer />}
        </main>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light" // Nota: Considera usar theme="colored" o manejar el tema dinámicamente
        />
      </div>
    </AuthProvider>
  );
};

export default MainWrapper;
