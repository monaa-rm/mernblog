import Image from "next/image";
import Link from "next/link";
import LoginNotifTheme from "./login-notif-theme";
import ReduxVarsDefaultValueSetter from "./redux-vars-setter";
import { cookies } from "next/headers";

const getData = async (token) => {
   const data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/token-to-user`, {
      cache: "no-store", headers: {
         token: token
      }
   });
   return data.json();
}

const Header = async () => {
   const cookieStore = cookies();
   const token = cookieStore.get("token") ? cookieStore.get("token").value : undefined;
   const data = await getData(token);
   return (
      <header className=" flex justify-between items-center py-2 px-2 sm:px-8 shadow-[0px_4px_5px_rgba(0,0,0,0.25)] z-50 backdrop-blur-md bg-[#ffffffdd] dark:bg-zinc-800 sticky top-0 left-0 right-0">
         <Link href={"/"}>
            <Image priority={true} src={"/logo-70.png"} sizes="64px" alt="logo" width={60} height={60} />
         </Link>
         <div className=" flex justify-end items-center">
            <LoginNotifTheme />
            <ReduxVarsDefaultValueSetter data={data} />
         </div>
      </header>
   );
}

export default Header;