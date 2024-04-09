
import HeaderSearch from "../header-search";

import LoginAndUserImage from "../login-and-user-image";
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
