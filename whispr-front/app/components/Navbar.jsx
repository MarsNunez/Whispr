"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.push("/login");
  };
  return (
    <nav className="flex items-center justify-between text-sm px-8 pt-2 pb-1">
      <div className="flex items-center gap-18">
        <h1 className="text-2xl font-semibold pb-1">Whispr .</h1>
        <ul className="flex gap-x-7">
          <li className="pb-1">What's New</li>
          <li className="pb-1">Categories</li>
          <li className="pb-1">Creators</li>
        </ul>
      </div>
      <ul className="flex gap-x-7 font-semibold">
        {isAuthenticated ? (
          <button onClick={handleLogout}>Log out</button>
        ) : (
          <Link href={"/login"}>Log in</Link>
        )}
        <Link href={"/register"}>Register</Link>
      </ul>
    </nav>
  );
};

export default Navbar;
