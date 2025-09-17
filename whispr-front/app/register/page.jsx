"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { apiUrl } from "@/app/lib/api";

const RegisterView = () => {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [formError, setFormError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setFormError("");

    if (!displayName || !email || !password || !confirmPassword) {
      setFormError("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(apiUrl("/users/create"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data?.error?.toLowerCase().includes("email")) {
          setEmailError(data.error);
        } else {
          setFormError(data.error || "Registration failed");
        }
        return;
      }

      toast.success("Account created! Please log in.");
      router.push("/login");
    } catch (err) {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Image Section - Hidden on mobile, visible on large screens */}
        <div className="relative hidden lg:block">
          <figure className="h-full w-full">
            <img
              src="/img/login-image.jpg"
              alt="register-image"
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
              <span className="text-indigo-700">Create</span> an account
            </h2>

            {/* Form */}
            <form className="flex flex-col space-y-4 sm:space-y-6" onSubmit={onSubmit}>
              <div className="space-y-2">
                <label
                  htmlFor="displayedName"
                  className="text-sm font-medium text-gray-700"
                >
                  Displayed name
                </label>
                <input
                  type="text"
                  id="displayedName"
                  placeholder="JohnDoe"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full border-2 border-indigo-700 px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg rounded-xl shadow-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  {emailError && (
                    <div className="text-xs sm:text-sm bg-red-500 text-white px-2 py-1 rounded-lg">
                      {emailError}
                    </div>
                  )}
                </div>
                <input
                  placeholder="hallo@email.com"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-gray-700"
                >
                  Confirm password
                </label>
                <input
                  placeholder="******"
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border-2 border-indigo-700 px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg rounded-xl shadow-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {formError && (
                <div className="text-sm bg-red-500 text-white px-3 py-2 rounded-lg">
                  {formError}
                </div>
              )}

              <button
                disabled={loading}
                type="submit"
                className="mt-4 sm:mt-6 bg-indigo-600 hover:bg-indigo-800 disabled:opacity-60 duration-150 text-white rounded-2xl px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium w-full"
              >
                Let's Start <span className="font-bold">→</span>
              </button>
            </form>

            {/* Additional Links */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default RegisterView;

// Nombre de usuario.
// email
// Password y confirm password

// El @usuario se genera automatico
