"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const LoginView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Call login function to update AuthContext
      login(data.user, data.token);

      // Redirect to dashboard
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="h-dvh min-h-dvh grid grid-cols-2 bg-gray-100">
      <div className="relative">
        <figure className="h-full w-full max-h-dvh">
          <img
            src="/img/login-image.jpg"
            alt="register-image"
            className="h-full max-h-dvh w-full object-cover"
          />
        </figure>
        <figure className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <img src="/img/black-logo.png" alt="logo" className="h-15" />
        </figure>
      </div>
      <div className="pt-15">
        <div className="mx-auto max-w-lg flex justify-center">
          <Link
            href={"/"}
            className="bg-indigo-600 hover:bg-indigo-800 text-sm font-bold duration-150 text-white rounded-2xl px-4 py-3 mb-5"
          >
            ←
          </Link>
        </div>
        <h2 className="text-5xl font-semibold text-center mb-5">
          <span className="text-indigo-700">Login</span> into your account
        </h2>
        <form
          className="flex flex-col p-5 max-w-lg mx-auto"
          onSubmit={(e) => handleLogin(e)}
        >
          <div className="mt-3 flex justify-between">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <div className="text-sm bg-red-500 text-white px-2 rounded-lg">
              Email or password don't match
            </div>
          </div>
          <input
            placeholder="hallo@email.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            className="border-2 border-indigo-700 px-3 py-2 text-lg rounded-xl mt-2 shadow-lg bg-gray-50"
          />
          <label htmlFor="password" className="text-sm mt-5">
            Password
          </label>
          <input
            placeholder="******"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-indigo-700 px-3 py-2 text-lg rounded-xl mt-2 shadow-lg bg-gray-50"
          />

          <button
            type="submit"
            className="mt-10 bg-indigo-600 hover:bg-indigo-800 duration-150 text-white rounded-2xl px-8 py-4 text-lg font-medium"
          >
            Login <span className="font-bold">→</span>
          </button>
        </form>
      </div>
    </section>
  );
};
export default LoginView;
