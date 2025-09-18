"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiUrl, withBypassHeaders } from "@/app/lib/api";

const LoginView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(apiUrl("/auth/login"), {
        method: "POST",
        headers: withBypassHeaders({
          "Content-Type": "application/json",
        }),
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
    <section className="min-h-screen bg-gray-100 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Image Section - Hidden on mobile, visible on large screens */}
        <div className="relative hidden lg:block">
          <figure className="h-full w-full">
            <img
              src="/img/login-image.jpg"
              alt="login-image"
              className="h-full w-full object-cover"
            />
          </figure>
          <figure className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <img
              src="/img/black-logo.png"
              alt="logo"
              className="h-12 sm:h-15"
            />
          </figure>
        </div>

        {/* Form Section */}
        <div className="flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="mx-auto w-full max-w-md">
            {/* Back Button */}
            <div className="flex justify-start mb-6">
              <Link
                href={"/"}
                className="bg-indigo-600 hover:bg-indigo-800 text-sm font-bold duration-150 text-white rounded-2xl px-4 py-2 sm:px-4 sm:py-3"
              >
                ←
              </Link>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-center mb-6 sm:mb-8">
              <span className="text-indigo-700">Login</span> into your account
            </h2>

            {/* Form */}
            <form
              className="flex flex-col space-y-4 sm:space-y-6"
              onSubmit={(e) => handleLogin(e)}
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  {error && (
                    <div className="text-xs sm:text-sm bg-red-500 text-white px-2 py-1 rounded-lg">
                      {error}
                    </div>
                  )}
                </div>
                <input
                  placeholder="hallo@email.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  className="w-full border-2 border-indigo-700 px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg rounded-xl shadow-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  placeholder="******"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-2 border-indigo-700 px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg rounded-xl shadow-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="mt-6 sm:mt-8 bg-indigo-600 hover:bg-indigo-800 duration-150 text-white rounded-2xl px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium w-full"
              >
                Login <span className="font-bold">→</span>
              </button>
            </form>

            {/* Additional Links */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default LoginView;
