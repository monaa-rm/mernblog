"use client";
import Loading from "@/app/loading";
import axios from "axios";
import Cookies from "js-cookie";
import { BsArrowBarLeft } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import RemoveModal from "@/components/modals/remove";

const CategoryDetails = ({ goalId }) => {
  const [categoryData, setcategoryData] = useState(-1);
  const [showRemoveModal, setShowRemoveModal] = useState(-1);
  const removeUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/dashboard/category/category-remove/${goalId}`;

  const titleRef = useRef();
  const slugRef = useRef();

  const token = Cookies.get("token");
  const router = useRouter();
  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/dashboard/category/category-details/${goalId}`;
    axios
      .get(url, { headers: { token: token } })
      .then((data) => {
        setcategoryData(data.data.data);
      })
      .catch((err) => {
        console.log(err);
        setcategoryData(-2);
      });
  }, []);

  const formSubmiter = (e) => {
    e.preventDefault();
    const formData = {
      goalId: goalId,
      title: titleRef.current.value == "" ? undefined : titleRef.current.value,
      slug: slugRef.current.value == "" ? undefined : slugRef.current.value,
    };
    axios
      .post(`/api/dashboard/category/update`, formData, {
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

      })
      .catch((error) => {
        const message = error.response.data
          ? error.response.data.data
          : "خطا در ذخیره اطلاعات جدید ";
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
        <title>جزئیات دسته</title>
      </>
      <div className="flex items-center justify-between gap-2 ">
        <div className="text-xl">جزئیات دسته</div>
        <div
          className="w-10 h-10 fixed top-[8.3rem] left-12 cursor-pointer"
          onClick={() => router.back()}
        >
          <BsArrowBarLeft className=" p-2 w-10 h-10 bg-zinc-200 rounded-md hover:bg-zinc-300 transition-all duration-500 " />
        </div>
      </div>
      <div className="my-12 flex justify-center items-center w-full ">
        {categoryData == -1 ? (
          <Loading />
        ) : categoryData == -2 ? (
          <div>خطا در بارگذاری اطلاعات</div>
        ) : categoryData.length < 1 ? (
          <div>کاربری موجود نیست</div>
        ) : (
          <div className="w-full flex flex-col gap-2">
            <div className="flex items-center justify-start gap-2 flex-wrap">
              <div className="py-1 px-3 text-sm rounded-sm  bg-zinc-200">
                شناسه: {categoryData._id}
              </div>
              <div className="py-1 px-3 text-sm rounded-sm  bg-zinc-200">
                تاریخ ایجاد: {categoryData.createdAt}
              </div>
            </div>
            <form
              onKeyDown={onKeyDownNotSubmit}
              onSubmit={formSubmiter}
              className="flex flex-col gap-4 w-full "
            >
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-blue-500 transition-all duration-500 text-white hover:bg-blue-600 fixed top-[8.3rem] left-24 "
              >
                ذخیره
              </button>
              <button
                onClick={() => setShowRemoveModal(1)}
                type="button"
                className="px-6 py-2 rounded-lg bg-rose-600 transition-all duration-500 text-white hover:bg-rose-700 fixed top-[8.3rem] left-48 "
              >
                حذف
              </button>
              <div className="flex flex-col gap-2">
                <h4>نام دسته</h4>
                <input
                  required
                  ref={titleRef}
                  defaultValue={categoryData.title}
                  autoComplete="off"
                  type="text"
                  className=" border-2 border-zinc-200 rounded-md p-2 outline-none focus:border-blue-500 w-full "
                />
              </div>
              <div className="flex flex-col gap-2">
                <h4>اسلاگ دسته</h4>
                <input
                  required
                  ref={slugRef}
                  defaultValue={categoryData.slug}
                  autoComplete="off"
                  type="text"
                  className="ltr_dir border-2 border-zinc-200 rounded-md p-2 outline-none focus:border-blue-500 w-full "
                />
              </div>
            </form>
          </div>
        )}
      </div>
      <RemoveModal
        removeUrl={removeUrl}
        showRemoveModal={showRemoveModal}
        setShowRemoveModal={setShowRemoveModal}
      />
    </div>
  );
};

export default CategoryDetails;
