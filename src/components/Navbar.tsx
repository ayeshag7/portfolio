import React, { useEffect, useState } from "react";
import { menuLinks } from "@/site-config";

const Navbar: React.FC = () => {
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    // Safe access to `window` after the component has mounted
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <nav
      aria-label="Main menu"
      className="static z-auto -ms-4 mt-1 flex flex-row items-center divide-x divide-dashed divide-white rounded-none bg-transparent py-0 shadow-none backdrop-blur-none"
    >
      {menuLinks.map((link) => (
        <a
          key={link.path}
          href={`/portfolio${link.path}`}
          className={`px-4 py-4 underline-offset-2 sm:py-0 sm:hover:underline ${
            currentPath === `/portfolio${link.path}` ? "font-bold" : ""
          }`}
          aria-current={currentPath === `/portfolio${link.path}` ? "page" : undefined}
        >
          {link.title}
        </a>
      ))}
    </nav>
  );
};

export default Navbar;
