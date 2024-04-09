"use client";
import { useSelector } from "react-redux";
import DashboardLinkItem from "./link-item";
import { useEffect, useState } from "react";

const DashboardCntrl = () => {
  // const [isEthereumAvailable, setIsEthereumAvailable] = useState(false);

  const user_role = useSelector((store) => store.roleSlice.value) ?? 2;
  // useEffect(() => {
  //   if (typeof window !== "undefined" && "ethereum" in window) {
  //     setIsEthereumAvailable(true);
  //   }
  // }, []);

  return (
    <div className=" w-[260px] z-40 min-w-[260px] backdrop-blur-md bg-zinc-50 dark:bg-zinc-800 dark:border-2 dark:border-zinc-200 dark:sm:border-0 rounded-md sticky top-24 flex justify-center items-center ">
      <div className="flex flex-col p-4 gap-4 ">
        <DashboardLinkItem title="پیشخوان" link="/dashboard/default" />
        <DashboardLinkItem title="تبلیغات" link="/dashboard/ads" />
        { user_role === 1 && (
          <>
            <DashboardLinkItem title="کاربران" link="/dashboard/users" />
            <DashboardLinkItem title="دسته ها" link="/dashboard/categories" />
            <DashboardLinkItem title="پست ها" link="/dashboard/not-accepted" />
            <DashboardLinkItem
              title="نوتیفیکیشن ها"
              link="/dashboard/notifications"
            />
            <DashboardLinkItem title="دیدگاه ها" link="/dashboard/comments" />
            <DashboardLinkItem
              title="پیشنهاد سردبیر"
              link="/dashboard/chief-editor"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardCntrl;
