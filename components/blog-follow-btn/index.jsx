"use client";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const BlogFollowBtn = ({ user_slug, btn_situation }) => {
  const token = Cookies.get("token");
  const [btnLoader, setBtnLoader] = useState(false);

  const followerHandler = () => {
    setBtnLoader(true);
    axios
      .get(`/api/user/follow/add-follower/${user_slug}`, {
        headers: { token: token },
      })
      .then((data) => {
        toast.success(data.data.data || "کاربر دنبال شد", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setBtnLoader(false);

      })
      .catch((error) => {
        console.log(error);
        setBtnLoader(false);

        const message = error.response.data
          ? error.response.data.data
          : "خطا در فرایند دنبال کردن ";
        toast.error(message, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  const unfollowerHandler = () => {
    setBtnLoader(true);
    axios
      .get(`/api/user/follow/unfollow/${user_slug}`, {
        headers: { token: token },
      })
      .then((data) => {
        toast.success(data.data.data || "کاربر دنبال نمیشود", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setBtnLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setBtnLoader(false);

        const message = error.response.data
          ? error.response.data.data
          : "خطا در فرایند  ";
        toast.error(message, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div>
      {btnLoader == true ? (
        <div className="rounded-md bg-blue-500 transition-all duration-500 hover:bg-blue-600 text-white w-60 h-10 flex justify-center items-center">
          <Image
            width="20"
            height="20"
            alt="loading"
            src="/button-reloader.svg"
          />
        </div>
      ) : btn_situation == "not_logged" && btnLoader == false ? (
        <Link
          href={"/sign-in"}
          className=" rounded-md bg-blue-500 transition-all duration-500 hover:bg-blue-600 text-white w-60 h-10 flex justify-center items-center"
        >
          دنبال کردن
        </Link>
      ) : null}
      {btn_situation == "setting" && btnLoader == false ? (
        <Link
          href={"/setting"}
          className=" rounded-md bg-blue-300 transition-all duration-500 hover:bg-blue-400 text-white w-60 h-10 flex justify-center items-center"
        >
          تنظیمات
        </Link>
      ) : null}
      {btn_situation == "not_followed" && btnLoader == false ? (
        <button
          onClick={() => followerHandler()}
          className=" rounded-md bg-blue-500 transition-all duration-500 hover:bg-blue-600 text-white w-60 h-10 flex justify-center items-center"
        >
          دنبال کردن
        </button>
      ) : null}
      {btn_situation == "followed" && btnLoader == false ? (
        <button
          onClick={() => unfollowerHandler()}
          className=" rounded-md bg-blue-500 transition-all duration-500 hover:bg-blue-600 text-white w-60 h-10 flex justify-center items-center"
        >
          دنبال شده
        </button>
      ) : null}
    </div>
  );
};

export default BlogFollowBtn;
