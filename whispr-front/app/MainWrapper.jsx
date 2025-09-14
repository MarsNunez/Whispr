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
      <div className="min-h-screen flex flex-col">
        {!shouldHideNavbar && <Navbar />}
        <main
          className={`${
            !shouldHideNavbar && "max-w-7xl"
          } mx-auto flex-1 w-full px-4 sm:px-6 lg:px-8`}
        >
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
          theme="light"
          className="text-sm sm:text-base"
        />
      </div>
    </AuthProvider>
  );
};

export default MainWrapper;
