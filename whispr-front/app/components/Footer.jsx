const Footer = () => {
  return (
    <footer className="border-t max-w-6xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-5">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-5 text-sm sm:text-base">
          <p>Copyright © 2025 Whispr</p>
          <p className="hidden sm:block">|</p>
          <p>
            Built by{" "}
            <a
              href="https://github.com/MarsNunez"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-700 font-medium hover:text-indigo-800 transition-colors"
            >
              MarsNunez
            </a>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-5 text-sm sm:text-base">
          <p className="hover:text-indigo-700 cursor-pointer transition-colors">
            Terms of Use
          </p>
          <p className="hidden sm:block">|</p>
          <p className="hover:text-indigo-700 cursor-pointer transition-colors">
            Privacy Policy
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
