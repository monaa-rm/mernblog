"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { BsArrowBarLeft } from "react-icons/bs";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const NewCategory = () => {
  const titleRef = useRef();
  const slugRef = useRef();

  const token = Cookies.get("token");
  const router = useRouter();

  const formSubmiter = (e) => {
    e.preventDefault();
    const formData = {
      title: titleRef.current.value,
      slug: slugRef.current.value,
    };
    axios
      .post(`/api/dashboard/category/new-category`, formData, {
        headers: { token: token },
      })
      .then((data) => {
        toast.success("اطلاعات ذخیره شد", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        router.push("/dashboard/categories");
      })
      .catch((error) => {
        const message = error.response.data
          ? error.response.data.data
          : "خطا در ذخیره ";
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
        <title>ایجاد دسته</title>
      </>
      <div className="flex items-center justify-between gap-2 ">
        <div className="text-xl px-12 md:px-0">ایجاد دسته</div>
        <div
          className="w-10 h-10 fixed top-[8.7rem] md:top-[8.3rem]  left-5 sm:left-12 cursor-pointer"
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
            className="px-6 py-2 rounded-lg bg-blue-500 transition-all duration-500 text-white hover:bg-blue-600 fixed top-[8.7rem] md:top-[8.3rem] left-16 sm:left-24 "
          >
            ذخیره
          </button>

          <div className="flex flex-col gap-2">
            <h4>نام دسته</h4>
            <input
              required
              ref={titleRef}
              autoComplete="off"
              type="text"
              className=" border-2 border-zinc-200 dark:bg-transparent rounded-md p-2 outline-none focus:border-blue-500 w-full "
            />
          </div>
          <div className="flex flex-col gap-2">
            <h4>اسلاگ دسته</h4>
            <input
              required
              ref={slugRef}
              autoComplete="off"
              type="text"
              className="ltr_dir border-2 border-zinc-200 dark:bg-transparent rounded-md p-2 outline-none focus:border-blue-500 w-full "
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCategory;
