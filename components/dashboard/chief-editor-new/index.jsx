"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { BsArrowBarLeft } from "react-icons/bs";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const NewChiefEditor = () => {
  const blog_slugRef = useRef();
  const post_slugRef = useRef();
  const numberRef = useRef();
  const situationRef = useRef();

  const token = Cookies.get("token");
  const router = useRouter();

  const formSubmiter = (e) => {
    e.preventDefault();
    const formData = {
      blog_slug: blog_slugRef.current.value,
      post_slug: post_slugRef.current.value,
      number: Number(numberRef.current.value),
      situation: situationRef.current.value == "true" ? true : false,
    };
    axios
      .post(`/api/dashboard/chief-editor/new-chief-editor`, formData, {
        headers: { token: token },
      })
      .then((data) => {
        axios
          .post(`/api/dashboard/user/chief-editor-notif-create`, {postSlug :post_slugRef.current.value }, {
            headers: { token: token },
          })
          .then((data) => {
            toast.success("نوتیفیکیشن ارسال شد", {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          
          })
          .catch((error) => {
            console.log(error);
            const message =
              error.response && error.response.data
                ? error.response.data.data
                : "خطا در ارسال نوتیفیکیشن ";
            toast.error(message, {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
        toast.success("پیشنهاد جدید ایجاد شد", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        router.back();
      })
      .catch((error) => {
        const message = error.response.data
          ? error.response.data.data
          : "خطا در ایجاد پیشنهاد ";
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

  const onKeyDownNotSubmit = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
            <>
        <title>ایجاد پیشنهاد سردبیر</title>
      </>
      <div className="flex items-center justify-between gap-2 ">
        <div className="text-xl pt-12 md:pt-0">ایجاد پیشنهاد سردبیر</div>
        <div
          className="w-10 h-10 fixed top-[8.7rem] md:top-[8.3rem] left-12 cursor-pointer"
          onClick={() => router.back()}
        >
          <BsArrowBarLeft className=" p-2 w-10 h-10 bg-zinc-200 rounded-md hover:bg-zinc-300 transition-all duration-500 " />
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <form
          onKeyDown={onKeyDownNotSubmit}
          onSubmit={formSubmiter}
          className="flex flex-col gap-4 w-full "
        >
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-blue-500 transition-all duration-500 text-white hover:bg-blue-600 fixed  top-[8.7rem] md:top-[8.3rem] left-24 "
          >
            ذخیره
          </button>

          <div className="flex flex-col gap-2">
            <h4>اسلاگ وبلاگ هدف</h4>
            <input
              required
              ref={blog_slugRef}
              autoComplete="off"
              type="text"
              className="ltr_dir border-2 border-zinc-200 dark:bg-zinc-800 rounded-md p-2 outline-none focus:border-blue-500 w-full "
            />
          </div>
          <div className="flex flex-col gap-2">
            <h4>اسلاگ پست هدف</h4>
            <input
              required
              ref={post_slugRef}
              autoComplete="off"
              type="text"
              className="ltr_dir border-2 border-zinc-200 dark:bg-zinc-800 rounded-md p-2 outline-none focus:border-blue-500 w-full "
            />
          </div>
          <div className="flex flex-col gap-2">
            <h4>شماره پیشنهاد (1 تا 5)</h4>
            <input
              required
              ref={numberRef}
              autoComplete="off"
              min={1}
              max={5}
              type="number"
              className="ltr_dir border-2 border-zinc-200 dark:bg-zinc-800 rounded-md p-2 outline-none focus:border-blue-500 w-full "
            />
          </div>
          <div className="flex flex-col gap-2">
            <select
              ref={situationRef}
              className=" border-2 cursor-pointer border-zinc-200 dark:bg-zinc-800 rounded-md p-2 outline-none focus:border-blue-500 w-full "
            >
              <option value={false}>خاموش</option>
              <option value={true}>روشن</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewChiefEditor;
