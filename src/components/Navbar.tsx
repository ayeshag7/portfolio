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
      className="absolute -inset-x-4 top-14 hidden flex-col items-end gap-y-4 rounded-md bg-bgColor/[.85] py-4 text-white text-xl shadow backdrop-blur group-[.menu-open]:z-50 group-[.menu-open]:flex sm:static sm:z-auto sm:-ms-4 sm:mt-1 sm:flex sm:flex-row sm:items-center sm:divide-x sm:divide-dashed sm:divide-white sm:rounded-none sm:bg-transparent sm:py-0 sm:shadow-none sm:backdrop-blur-none"
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
