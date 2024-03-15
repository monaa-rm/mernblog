"use client";
import Loading from "@/app/loading";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";

const UserFollowers = ({ goalId }) => {
  const token = Cookies.get("token");
  const [all_followers, setall_followers] = useState(-1);


  useEffect(() => {
    const url = `/api/dashboard/user/user-follow/${goalId}?followers=1`;
    axios
      .get(url, { headers: { token: token } })
      .then((data) => {
        setall_followers(data.data.all_followers);
      })
      .catch((err) => {
        console.log(err);
        setall_followers(-2);
      });
  }, []);

  return (
    <div className=" flex flex-col gap-12 ">
            <>
        <title>دنبال کننده های کاربر</title>
      </>
      <div className="text-xl pt-12 md:pt-0">دنبال کننده های کاربر</div>
      <div className=" flex flex-col gap-12 ">
        {all_followers == -1 ? (
          <Loading />
        ) : all_followers == -2 ? (
          <div>خطا در بارگذاری اطلاعات</div>
        ) : all_followers.length < 1 ? (
          <div>هیچ دنبال کننده ای وجود ندارد</div>
        ) : (
          <div className="flex flex-col gap-4 min-h-[10rem]">
            {all_followers.map((item) => (
              <Link
                href={`/blog/${item.username}`}
                key={item._id}
                className=" w-full relative flex flex-col gap-4 bg-zinc-200  dark:bg-zinc-700  border-2 border-zinc-300 hover:border-blue-600  rounded-md px-4 py-2 transition-all duration-300 hover:bg-zinc-200 "
              >
                <div> {item.blog_name} </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserFollowers;
