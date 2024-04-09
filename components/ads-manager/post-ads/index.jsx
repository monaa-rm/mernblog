"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { useRef } from "react";
import { toast } from "react-toastify";


const PostAds = ({setAd_situation}) => {
  const linkRef = useRef();
  const durationRef = useRef();

  const token = Cookies.get("token");
 

  const formSubmiter = (e) => {
    e.preventDefault();
    const formData = {
      type: "post",
      image: "no-img",
      image_alt: "no-img",
      link: linkRef.current.value,
      duration: durationRef.current.value,
    };

    axios
      .post(`/api/user/advertise/new-ads`, formData, {
        headers: { token: token },
      })
      .then((data) => {
        toast.success(data.data.data, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setAd_situation("my-ads")
      })
      .catch((error) => {
        console.log(error);
        const message = 
        error.response.data
          ? error.response.data.data
          : 
          "خطا در ایجاد تبلیغ... ";
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
    <div className="flex flex-col gap-4 w-full">
      <><title>ایجاد تبلیغ پست</title></>
      <div className="flex items-center justify-between gap-2 ">
        <div className="text-xl">ایجاد تبلیغ پست</div>
      </div>

      <form
        onKeyDown={onKeyDownNotSubmit}
        onSubmit={formSubmiter}
        className="flex flex-col gap-4 w-full "
      >
        <div className="flex flex-col gap-2">
          <h4>آدرس پست</h4>
          <input
            required
            ref={linkRef}
            autoComplete="off"
            placeholder={`${process.env.NEXT_PUBLIC_SERVER_URL}/blog/mona-1995/photoshop-for-photography`}
            type="text"
            className="ltr_dir border-2 placeholder:text-zinc-300 dark:placeholder:text-zinc-700 border-zinc-200 dark:bg-zinc-900 rounded-md p-2 outline-none focus:border-blue-500 w-full "
          />
        </div>
        <div className="flex flex-col gap-2">
          <h4>مدت زمان نمایش تبلیغ (بر مبنای روز)</h4>
          <input
            required
            ref={durationRef}
            autoComplete="off"
            type="number"
            className="ltr_dir border-2 border-zinc-200 dark:bg-zinc-900 rounded-md p-2 outline-none focus:border-blue-500 w-full "
          />
        </div>
        <button
          className=" bg-blue-500 transition-all duration-500 hover:bg-blue-600 text-white flex justify-center items-center h-10 w-full rounded-md"
          type="submit"
        >
          ایجاد تبلیغ
        </button>
      </form>
    </div>
  );
};

export default PostAds;
