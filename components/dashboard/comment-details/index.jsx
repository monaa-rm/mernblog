"use client";
import Loading from "@/app/loading";
import axios from "axios";
import Cookies from "js-cookie";
import { BsArrowBarLeft } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import RemoveModal from "@/components/modals/remove";
import Link from "next/link";

const CommentsDetails = ({ goalId }) => {
  const [commentData, setcommentData] = useState(-1);
  const [showRemoveModal, setShowRemoveModal] = useState(-1);
  const removeUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/dashboard/comment/comment-remove/${goalId}`;

  const phoneRef = useRef();
  const messageRef = useRef();
  const displaynameRef = useRef();
  const createdAtRef = useRef();
  const viewedRef = useRef();

  const token = Cookies.get("token");
  const router = useRouter();
  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/dashboard/comment/comment-details/${goalId}`;
    axios
      .get(url, { headers: { token: token } })
      .then((data) => {
        setcommentData(data.data.data);
      })
      .catch((err) => {
        console.log(err);
        setcommentData(-2);
      });
  }, []);

  const formSubmiter = (e) => {
    e.preventDefault();
    const formData = {
      goalId: goalId,
      message:
        messageRef.current.value == "" ? undefined : messageRef.current.value,
      phone: phoneRef.current.value == "" ? undefined : phoneRef.current.value,
      displayname:
        displaynameRef.current.value == ""
          ? undefined
          : displaynameRef.current.value,
      createdAt:
        createdAtRef.current.value == ""
          ? undefined
          : createdAtRef.current.value,
      viewed: viewedRef.current.value == "true" ? true : false,
    };
    axios
      .post(`/api/dashboard/comment/update`, formData, {
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

        router.back();
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

  const commentPublisher = (e) => {
    const formData = {
      goalId: goalId,
      published: true,
      viewed: true,
      notif: true,
    };
    axios
      .post(`/api/dashboard/comment/update`, formData, {
        headers: { token: token },
      })
      .then((data) => {
        toast.success("دیدگاه با موفقیت منتشر شد", {
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
          : "خطا درانتشار دیدگاه ";
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
        <title>جزئیات دیدگاه</title>
      </>
      <div className="flex pt-12 md:pt-0 items-center justify-between gap-2 ">
        <div className="text-xl">جزئیات دیدگاه</div>
        <div className="static sm:fixed top-[8.7rem] md:top-[8.3rem]  left-24 sm:left-28 md:left-[8.3rem] lg:left-24 flex justify-end items-center gap-2 ">
          <button
            onClick={() => commentPublisher()}
            type="button"
            className="px-6 py-2 rounded-lg bg-green-500 transition-all duration-500 text-white hover:bg-green-600"
          >
            انتشار
          </button>
          <button
            type="submit"
            className="px-6 py-2 z-10 rounded-lg  bg-blue-500 transition-all duration-500 text-white hover:bg-blue-600  "
          >
            ذخیره
          </button>
          <button
            onClick={() => setShowRemoveModal(1)}
            type="button"
            className="px-6 py-2 z-10  rounded-lg bg-rose-600 transition-all duration-500 text-white hover:bg-rose-700  "
          >
            حذف
          </button>
        </div>
        <div
          className="w-10 h-10 fixed top-[8.7rem] md:top-[8.3rem] left-5 sm:left-16 md:left-20 lg:left-12 cursor-pointer"
          onClick={() => router.back()}
        >
          <BsArrowBarLeft className=" p-2 w-10 h-10 bg-zinc-200 dark:text-black rounded-md hover:bg-zinc-300 transition-all duration-500 " />
        </div>
      </div>
      <div className="my-12 flex justify-center items-center w-full ">
        {commentData == -1 ? (
          <Loading />
        ) : commentData == -2 ? (
          <div>خطا در بارگذاری اطلاعات</div>
        ) : commentData.length < 1 ? (
          <div>دیدگاهی موجود نیست</div>
        ) : (
          <div className="w-full flex flex-col gap-4">
            {commentData.parent_data != "no-parent" ? (
              <div className="flex flex-col gap-4 p-3 border border-zinc-200 bg-zinc-100 dark:bg-zinc-700 rounded-md  ">
                <h1 className="mb-2">دیدگاه والد</h1>
                <div>
                  <div className="flex justify-between items-center gap-2 ">
                    <span className="bg-zinc-300 dark:text-black px-3 py-1 rounded-md  ">
                      {commentData.parent_data.displayname}
                    </span>
                    <span className="bg-zinc-300 dark:text-black px-3 py-1 rounded-md  ">
                      {commentData.parent_data.createdAt}
                    </span>
                  </div>
                  <p className="leading-9">{commentData.parent_data.message}</p>
                </div>
                <div className="flex justify-end items-center gap-4">
                  <Link
                    target="_blank"
                    rel="noreferrer"
                    href={`/dashboard/comments/${commentData.parent_data._id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md transition-all duration-500 hover:bg-blue-600"
                  >
                    جزئیات دیدگاه
                  </Link>
                </div>
              </div>
            ) : null}

            <form
              onKeyDown={onKeyDownNotSubmit}
              onSubmit={formSubmiter}
              className="flex flex-col gap-4 w-full mt-4 "
            >
              <div className="flex flex-col gap-2">
                <h4>نام نمایشی</h4>
                <input
                  required
                  ref={displaynameRef}
                  defaultValue={commentData.displayname}
                  autoComplete="off"
                  type="text"
                  className=" border-2 border-zinc-200 dark:bg-zinc-800 rounded-md p-2 outline-none focus:border-blue-500 w-full "
                />
              </div>
              <div className="flex flex-col gap-2">
                <h4>پیام</h4>
                <textarea
                  required
                  rows={5}
                  ref={messageRef}
                  defaultValue={commentData.message}
                  autoComplete="off"
                  type="text"
                  className=" border-2 border-zinc-200 dark:bg-zinc-800 rounded-md p-2 outline-none focus:border-blue-500 w-full "
                />
              </div>
              <div className="flex flex-col gap-2">
                <h4>شماره همراه</h4>
                <input
                  required
                  ref={phoneRef}
                  defaultValue={commentData.phone}
                  autoComplete="off"
                  type="text"
                  className="ltr_dir border-2 border-zinc-200 dark:bg-zinc-800 rounded-md p-2 outline-none focus:border-blue-500 w-full "
                />
              </div>
              <div className="flex flex-col gap-2">
                <h4>تاریخ ایجاد</h4>
                <input
                  required
                  ref={createdAtRef}
                  defaultValue={commentData.createdAt}
                  autoComplete="off"
                  type="text"
                  className=" border-2 border-zinc-200 dark:bg-zinc-800 rounded-md p-2 outline-none focus:border-blue-500 w-full "
                />
              </div>
              <div className="flex flex-col gap-2">
                <h4>دیده شده</h4>
                <select
                  ref={viewedRef}
                  defaultValue={commentData.viewed}
                  className=" border-2 cursor-pointer border-zinc-200 dark:bg-zinc-800 rounded-md p-2 outline-none focus:border-blue-500 w-full "
                >
                  <option value={true}>دیده شده</option>
                  <option value={false}>دیده نشده</option>
                </select>
              </div>
              <div className="flex justify-start w-full items-center gap-1 flex-wrap md:gap-4 text-white">
                <div className="flex justify-center items-center">
                  <Link
                    target="_blank"
                    rel="noreferrer"
                    href={`/dashboard/posts/${commentData.post_data._id}`}
                    className="bg-blue-500 text-white rounded-md px-3 break-words py-1 transition-all duration-500 hover:bg-blue-600 "
                  >
                    جزئیات پست : {commentData.post_data.title}
                  </Link>
                </div>
                <div className="flex justify-center items-center">
                  <Link
                    target="_blank"
                    rel="noreferrer"
                    href={`/blog/${commentData.blog_data.username}/${commentData.post_data.slug}`}
                    className="bg-blue-500 text-white rounded-md px-3 py-1 transition-all duration-500 hover:bg-blue-600 "
                  >
                    صفحه پست در وبلاگ : {commentData.post_data.title}
                  </Link>
                </div>
              </div>
              <div className="flex justify-start items-center flex-wrap gap-1 md:gap-4 text-white">
                <Link
                  target="_blank"
                  rel="noreferrer"
                  href={`/dashboard/users/${commentData.blog_data._id}`}
                  className="bg-blue-500 text-white rounded-md px-3 py-1 transition-all duration-500 hover:bg-blue-600 "
                >
                  جزئیات کاربر : {commentData.blog_data.blog_name}
                </Link>
                <Link
                  target="_blank"
                  rel="noreferrer"
                  href={`/blog/${commentData.blog_data.username}`}
                  className="bg-blue-500 text-white rounded-md px-3 py-1 transition-all duration-500 hover:bg-blue-600 "
                >
                  صفحه وبلاگ کاربر
                </Link>
              </div>
            </form>
            {commentData.children_data != "no-child" ? (
              <div className="flex flex-col gap-4">
                {commentData.children_data.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col gap-4 p-3 border border-zinc-200 bg-zinc-100 dark:bg-zinc-700 rounded-md  "
                  >
                    <div>
                      <h1 className="mb-2">دیدگاه فرزند</h1>
                      <div className="flex justify-between items-center gap-2 ">
                        <span className="bg-zinc-300 dark:text-black px-3 py-1 rounded-md  ">
                          {item.displayname}
                        </span>
                        <span className="bg-zinc-300 dark:text-black px-3 py-1 rounded-md  ">
                          {item.createdAt}
                        </span>
                      </div>
                      <p className="leading-9">{item.message}</p>
                    </div>
                    <div className="flex justify-end items-center gap-4">
                      <Link
                        target="_blank"
                        rel="noreferrer"
                        href={`/dashboard/comments/${item._id}`}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md transition-all duration-500 hover:bg-blue-600"
                      >
                        جزئیات دیدگاه
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
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

export default CommentsDetails;
