const Footer = () => {
  return (
    <footer className="border-t max-w-6xl mx-auto py-4 flex justify-between">
      <div className="flex gap-5">
        <p>Copyright © 2025 Whispr</p>
        <p>|</p>
        <p>
          Built by{" "}
          <a
            rel="stylesheet"
            href="https://github.com/MarsNunez"
            about="_blank"
            className="text-indigo-700 font-medium"
          >
            MarsNunez
          </a>
        </p>
      </div>
      <div className="flex gap-5">
        <p>Terms of Use</p>
        <p>|</p>
        <p>Privacy Policy</p>
      </div>
    </footer>
  );
};

export default Footer;
