import Link from "next/link";

const RegisterView = () => {
  return (
    <section className="h-dvh min-h-dvh grid grid-cols-2 bg-gray-100">
      <div className="relative">
        {/* Añadir relative al contenedor padre */}
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
          <span className="text-indigo-700">Create</span> an account
        </h2>
        <form className="flex flex-col p-5 max-w-lg mx-auto">
          <label htmlFor="username" className="text-sm">
            User name
          </label>
          <input
            type="text"
            id="username"
            className="border-2 border-indigo-700 px-3 py-2 text-lg rounded-xl mt-2 shadow-lg bg-gray-50"
          />
          <label htmlFor="email" className="text-sm mt-5">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border-2 border-indigo-700 px-3 py-2 text-lg rounded-xl mt-2 shadow-lg bg-gray-50"
          />
          <label htmlFor="password" className="text-sm mt-5">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border-2 border-indigo-700 px-3 py-2 text-lg rounded-xl mt-2 shadow-lg bg-gray-50"
          />
          <label htmlFor="confirmPassword" className="text-sm mt-5">
            Confirm password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="border-2 border-indigo-700 px-3 py-2 text-lg rounded-xl mt-2 shadow-lg bg-gray-50"
          />
          <button className="mt-10 bg-indigo-600 hover:bg-indigo-800 duration-150 text-white rounded-2xl px-8 py-4 text-lg font-medium">
            Let's Start <span className="font-bold">→</span>
          </button>
        </form>
      </div>
    </section>
  );
};
export default RegisterView;

// Nombre de usuario.
// email
// Password y confirm password

// El @usuario se genera automatico
