import { FiMoon } from "react-icons/fi";
import { BsSun } from "react-icons/bs";
import HeaderSearch from "../header-search";

import LoginAndUserImage from "../login-and-user-image";
import Link from "next/link";
import NotifNumber from "./notifNumber";
import DarkLightTheme from "../dark-light";

const LoginNotifTheme = () => {
  return (
    <div className=" flex justify-end items-center gap-4">

      <HeaderSearch />
      <DarkLightTheme />

      <NotifNumber />
      <LoginAndUserImage />
    </div>
  );
};

export default LoginNotifTheme;
