"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="flex items-center justify-between text-sm px-4 sm:px-6 lg:px-8 pt-2 pb-1">
      <div className="flex items-center gap-4 sm:gap-8 lg:gap-18">
        <Link href="/">
          <h1 className="text-xl sm:text-2xl font-semibold pb-1 jost">
            Whispr .
          </h1>
        </Link>
        <ul className="hidden sm:flex gap-x-4 lg:gap-x-7">
          <Link
            href={"/home"}
            className="pb-1 jost hover:text-indigo-600 transition-colors"
          >
            Home
          </Link>
          <Link
            href={"/categories"}
            className="pb-1 jost hover:text-indigo-600 transition-colors"
          >
            Categories
          </Link>
          <Link
            href={"/creators"}
            className="pb-1 jost hover:text-indigo-600 transition-colors"
          >
            Creators
          </Link>
        </ul>
      </div>
      <ul className="flex gap-x-2 sm:gap-x-4 lg:gap-x-7 font-semibold items-center">
        {isAuthenticated ? (
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-7">
            <Link
              href={`/audios`}
              className="font-normal bg-indigo-600 text-white h-fit px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm hover:bg-indigo-700 transition-colors"
            >
              <span className="hidden sm:inline">Audios</span>
              <span className="sm:hidden">Audios</span>
            </Link>
            <div className="hidden sm:block mx-1 font-normal">|</div>
            <button
              onClick={handleLogout}
              className="bg-gray-800 text-white h-fit px-2 sm:px-3 py-1 rounded-lg cursor-pointer text-xs sm:text-sm hover:bg-gray-700 transition-colors"
            >
              <span className="hidden sm:inline">Log out</span>
              <span className="sm:hidden">Out</span>
            </button>
            <Link href={`/profile/${user.userName}`}>
              <figure className="h-8 w-8 sm:h-10 sm:w-10">
                <img
                  src={user.profilePicture}
                  alt="profilePicture"
                  className="h-full w-full rounded-lg object-cover border border-blue-200"
                />
              </figure>
            </Link>
          </div>
        ) : (
          <>
            <Link
              href="/login"
              className="jost hover:text-indigo-600 transition-colors text-xs sm:text-sm"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="jost hover:text-indigo-600 transition-colors text-xs sm:text-sm"
            >
              Register
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
