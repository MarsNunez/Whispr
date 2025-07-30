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
      <ul className="flex gap-x-7 font-semibold items-center">
        {isAuthenticated ? (
          <div className="flex items-center gap-7">
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
              <figure className="h-10 w-10">
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
