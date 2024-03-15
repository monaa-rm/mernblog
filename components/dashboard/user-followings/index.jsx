"use client";
import Loading from "@/app/loading";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";

const UserFollowings = ({ goalId }) => {
  const token = Cookies.get("token");
  const [all_followings, setall_followings] = useState(-1);


  useEffect(() => {
    const url = `/api/dashboard/user/user-follow/${goalId}?followings=1`;
    axios
      .get(url, { headers: { token: token } })
      .then((data) => {
        setall_followings(data.data.all_followings);
      })
      .catch((err) => {
        console.log(err);
        setall_followings(-2);
      });
  }, []);

  return (
    <div className=" flex flex-col gap-12 ">
            <>
        <title>دنبال شونده های کاربر</title>
      </>
      <div className="text-xl pt-12 md:pt-0">دنبال شونده های کاربر</div>
      <div className=" flex flex-col gap-12 ">
        {all_followings == -1 ? (
          <Loading />
        ) : all_followings == -2 ? (
          <div>خطا در بارگذاری اطلاعات</div>
        ) : all_followings.length < 1 ? (
          <div>هیچ دنبال شونده ای وجود ندارد</div>
        ) : (
          <div className="flex flex-col gap-4 min-h-[10rem]">
            {all_followings.map((item) => (
              <Link
                href={`/blog/${item.username}`}
                key={item._id}
                className=" w-full relative flex flex-col gap-4 bg-zinc-200 dark:bg-zinc-700  border-2 border-zinc-300 hover:border-blue-600  rounded-md px-4 py-2 transition-all duration-300 hover:bg-zinc-200 "
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

export default UserFollowings;
