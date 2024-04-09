"use client";
import Loading from "@/app/loading";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";

const Followings = () => {
  const token = Cookies.get("token");
  const [all_followings, setall_followings] = useState(-1);

  useEffect(() => {
    const url = `/api/user/follow/my-followings`;
    axios
      .get(url, { headers: { token: token } })
      .then((data) => {
        setall_followings(data.data.data);
      })
      .catch((err) => {
        console.log(err);
        setall_followings(-2);
      });
  }, []);



  return (
    <div className="flex flex-col gap-8 w-full mx-1">
      <><title>دنبال شونده ها</title></>
      <div className="flex items-center justify-between gap-2 ">
        <div className="text-xl">دنبال شونده ها</div>
      </div>
      <div className="my-12 flex justify-center items-center">
        {all_followings == -1 ? (
          <Loading />
        ) : all_followings == -2 ? (
          <div>خطا در بارگذاری اطلاعات</div>
        ) : all_followings.length < 1 ? (
          <div>دنبال شونده ای موجود نیست</div>
        ) : (
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-4 w-full min-h-[10rem]">
              {all_followings.map((item, i) => (
                <Link
                  target="_blank"
                  rel="noreferrer"
                  href={`/blog/${item.username}`}
                  key={i}
                  className=" w-full relative flex flex-col gap-4 bg-zinc-200 dark:bg-zinc-800 border-2 border-zinc-300 hover:border-blue-600  rounded-md px-4 py-2 transition-all duration-300 hover:bg-zinc-200 "
                >
                  <div>{item.blog_name}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Followings;
