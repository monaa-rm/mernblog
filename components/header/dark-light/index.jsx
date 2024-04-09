"use client";

import { useEffect, useState } from "react";
import { BsSun } from "react-icons/bs";
import { FiMoon } from "react-icons/fi";

const DarkLightTheme = () => {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme == "dark") setDarkMode(true);
  }, []);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  return (
    <div
      onClick={() => setDarkMode(!darkMode)}
      className="relative cursor-pointer  flex justify-center items-center gap-1 border-2 border-blue-500 w-[54px] h-[28px] bg-white  rounded-full"
    >
      <FiMoon />
      <BsSun className=" w-4 h-4 dark:text-black " />
      <span
        className={
          darkMode == true
            ? " w-[26px] h-[26px] bg-blue-500 rounded-full absolute -top-[1px] -right-[1px] transition-all duration-300"
            : " w-[26px] h-[26px] bg-blue-500 rounded-full absolute -top-[1px] right-[24px] transition-all duration-300"
        }
      ></span>
    </div>
  );
};

export default DarkLightTheme;
