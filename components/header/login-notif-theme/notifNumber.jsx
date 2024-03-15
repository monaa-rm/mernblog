"use client";

import Link from "next/link";
import { IoNotificationsOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const NotifNumber = () => {
  const notif_number = useSelector((store) => store.notifSlice.value) || 0;
  return (
    <div className=" relative w-8 h-8 flex justify-center items-center ">
      <span className=" absolute -top-1 -right-[3px]">
        {notif_number}
      </span>
      <Link href={"/notifications"}>
        <IoNotificationsOutline className="w-6 h-6 text-blue-600 " />
      </Link>
    </div>
  );
};

export default NotifNumber;
