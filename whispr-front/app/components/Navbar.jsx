import Link from "next/link";

const Navbar = () => {
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
        <li>Log in</li>
        <Link href={"/register"}>Register</Link>
      </ul>
    </nav>
  );
};

export default Navbar;
