"use client";
import Loading from "@/app/loading";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DashboardDefault = () => {
  const [allData, setallData] = useState(-1);
  const user_role = useSelector((store) => store.roleSlice.value);
  useEffect(() => {
    const url = `/api/dashboard/default`;
    axios
      .get(url)
      .then((data) => {
        setallData(data.data.data);
      })

      .catch((err) => {
        console.log(err);
        setallData(-2);
      });
  }, []);

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex items-center justify-between gap-2 ">
        <div className="text-xl px-12 md:px-0">پیشخوان</div>
      </div>
      <div className="my-12 flex justify-center items-center">
        {allData == -1 ? (
          <Loading />
        ) : allData == -2 ? (
          <div>خطا در بارگذاری اطلاعات</div>
        ) : allData.length < 1 ? (
          <div>اطلاعاتی موجود نیست</div>
        ) : (
          <div className="flex flex-col gap-8 w-full">
            {user_role == 1 ? (
              <div className="flex flex-col gap-3 w-full">
                <Link
                  className="w-full px-2 py-1 bg-zinc-200 dark:bg-zinc-500 rounded-md transition-all duration-300 hover:bg-zinc-300 dark:hover:bg-zinc-600"
                  href={"/dashboard/new-users"}
                >
                  {allData.new_users} کاربر جدید
                </Link>
                <Link
                  className="w-full px-2 py-1 bg-zinc-200 dark:bg-zinc-500 rounded-md transition-all duration-300 hover:bg-zinc-300 dark:hover:bg-zinc-600"
                  href={"/dashboard/not-accepted"}
                >
                  {allData.new_not_accepted_posts} پست در انتظار تایید
                </Link>
                <Link
                  className="w-full px-2 py-1 bg-zinc-200 dark:bg-zinc-500 rounded-md transition-all duration-300 hover:bg-zinc-300 dark:hover:bg-zinc-600"
                  href={"/dashboard/comments"}
                >
                  {allData.new_comments}دیدگاه تایید نشده
                </Link>
                <Link
                  className="w-full px-2 py-1 bg-zinc-200 dark:bg-zinc-500 rounded-md transition-all duration-300 hover:bg-zinc-300 dark:hover:bg-zinc-600"
                  href={"/dashboard/ads"}
                >
                  {allData.new_ads} تبلیغ دیده نشده
                </Link>
              </div>
            ) : user_role == 2 ? (
              <div className="flex flex-col gap-3 w-full">
                <Link
                  className="w-full px-2 py-1 bg-zinc-200 dark:bg-zinc-500 rounded-md transition-all duration-300 hover:bg-zinc-300 dark:hover:bg-zinc-600"
                  href={"/dashboard/ads"}
                >
                  {allData.new_ads} تبلیغ دیده نشده
                </Link>
              </div>
            ) : (
              <div>نمایش این قسمت برای شما امکان پذیر نیست</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardDefault;
