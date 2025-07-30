"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // Cargar el tema desde localStorage solo en el cliente
    const savedTheme =
      typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (savedTheme) {
      setIsDarkTheme(savedTheme === "dark");
    }
    // Aplicar el tema inicial al body
    if (typeof window !== "undefined") {
      document.body.classList.toggle("dark-theme", savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newIsDarkTheme = !isDarkTheme;
    setIsDarkTheme(newIsDarkTheme);
    if (typeof window !== "undefined") {
      document.body.classList.toggle("dark-theme", newIsDarkTheme);
      localStorage.setItem("theme", newIsDarkTheme ? "dark" : "light");
    }
  };

  return (
    <nav className="flex items-center justify-between text-sm px-8 pt-2 pb-1">
      <div className="flex items-center gap-18">
        <Link href="/">
          <h1 className="text-2xl font-semibold pb-1 jost">Whispr .</h1>
        </Link>
        <ul className="flex gap-x-7">
          <li className="pb-1 jost">Home</li>
          <li className="pb-1 jost">Categories</li>
          <li className="pb-1 jost">Creators</li>
        </ul>
      </div>
      <ul className="flex gap-x-7 font-semibold">
        {isAuthenticated ? (
          <div className="flex items-center gap-7">
            <div
              className={`p-3 rounded-full border cursor-pointer ${
                isDarkTheme ? "dark-theme" : "light-theme"
              } hover:opacity-80 transition-opacity duration-300`}
              onClick={toggleTheme}
            />
            <Link
              href={`/${user.userName}/audios`}
              className="font-normal bg-indigo-600 text-white h-fit px-3 py-1 rounded-lg"
            >
              My Audios
            </Link>
            <div className="mx-1 font-normal">|</div>
            <button
              onClick={handleLogout}
              className="bg-gray-800 text-white h-fit px-3 py-1 rounded-lg cursor-pointer"
            >
              Log out
            </button>
            <Link href={`/profile/${user.userName}`}>
              <figure className="h-10">
                <img
                  src={user.profilePicture}
                  alt="profilePicture"
                  className="h-full rounded-lg"
                />
              </figure>
            </Link>
          </div>
        ) : (
          <>
            <Link href="/login" className="jost">
              Log in
            </Link>
            <Link href="/register" className="jost">
              Register
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
