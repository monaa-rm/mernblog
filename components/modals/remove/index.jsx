"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";

const RemoveModal = ({
  removeUrl,
  showRemoveModal,
  setShowRemoveModal,
  dataReloader,
  setDataReloader
}) => {
  const router = useRouter();
  const token = Cookies.get("token");

  useEffect(() => {
    if (showRemoveModal == 1) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showRemoveModal]);

  const removeHandler = (e) => {
    e.preventDefault();
    axios
      .get(removeUrl, { headers: { token: token } })
      .then((data) => {
        toast.success("حذف با موفقیت انجام شد", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        if (dataReloader == undefined) {
          router.back();
        }else {
          setDataReloader(dataReloader * -1)
        }
      })
      .catch((error) => {
        console.log(error);
        const message = error.response.data
          ? error.response.data.data
          : "خطا درفرایند حذف ";
        toast.error(message, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    setShowRemoveModal(-1);
  };

  return (
    <div
      className={
        showRemoveModal == 1
          ? " bg-[#000000cc] z-[60] flex justify-center items-center fixed top-0 left-0 right-0 bottom-0   transition-all duration-500 "
          : " bg-[#ffffff] -z-10  flex justify-center  items-center fixed top-0 left-0 right-0 bottom-0   transition-all duration-500 "
      }
    >
      <div
        className={
          showRemoveModal == 1
            ? "w-64 h-64 bg-zinc-200 dark:bg-zinc-600 rounded-lg  p-4  flex justify-center items-center relative   transition-all duration-500"
            : "w-0 h-0  bg-none rounded-lg  p-4  flex justify-center items-center relative   transition-all duration-500"
        }
      >
        <IoMdClose
          onClick={() => setShowRemoveModal(-1)}
          className={
            showRemoveModal == 1
              ? "absolute left-2 top-2 w-7 h-7 text-black dark:text-white dark:hover:text-blue-500 cursor-pointer  transition-all duration-1000 hover:text-blue-600 "
              : "absolute left-2 top-2 w-0 h-0 hidden text-transparent cursor-pointer  transition-all duration-1000 hover:text-blue-600 "
          }
        />
        <button
          onClick={removeHandler}
          className={
            showRemoveModal == 1
              ? "bg-green-600 w-20 h-8 rounded-md text-white transition-all duration-500 hover:bg-green-700 "
              : "bg-zinc-200 dark:bg-zinc-600  w-20 h-0 rounded-md text-white transition-all duration-500 hover:bg-green-700 "
          }
        >
          {showRemoveModal == 1 ? " تایید حذف" : ""}
        </button>
      </div>
    </div>
  );
};

export default RemoveModal;
