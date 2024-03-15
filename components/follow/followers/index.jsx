"use client";
import Loading from "@/app/loading";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Followers = () => {
  const token = Cookies.get("token");
  const [all_followers, setall_followers] = useState(-1);

  useEffect(() => {
    const url = `/api/user/follow/my-followers`;
    axios
      .get(url, { headers: { token: token } })
      .then((data) => {
        setall_followers(data.data.data);
      })
      .catch((err) => {
        console.log(err);
        setall_followers(-2);
      });
  }, []);

  const goTopCtrl = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col gap-8 w-full mx-1">
      <><title>دنبال کننده ها</title></>
      <div className="flex items-center justify-between gap-2 ">
        <div className="text-xl">دنبال کننده ها</div>
      </div>
      <div className="my-12 flex justify-center items-center">
        {all_followers == -1 ? (
          <Loading />
        ) : all_followers == -2 ? (
          <div>خطا در بارگذاری اطلاعات</div>
        ) : all_followers.length < 1 ? (
          <div>دنبال کننده ای موجود نیست</div>
        ) : (
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-4 w-full min-h-[10rem]">
              {all_followers.map((item, i) => (
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

export default Followers;
