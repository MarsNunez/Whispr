"use client";
import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const MainWrapper = ({ children }) => {
  const pathname = usePathname();
  const hideNavbarRoutes = ["/register", "/login"];

  const shouldHideNavbar = hideNavbarRoutes.includes(pathname);

  return (
    <div>
      {!shouldHideNavbar && <Navbar />}
      <main className={`${!shouldHideNavbar && "max-w-7xl"} mx-auto`}>
        {children}
        {!shouldHideNavbar && <Footer />}
      </main>
    </div>
  );
};

export default MainWrapper;
