"use client";
import Loading from "@/app/loading";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { BsArrowBarLeft } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import RemoveModal from "@/components/modals/remove";

const UserDetails = ({ goalId }) => {
  const [imagename, setimagename] = useState("");
  const [defaultDataReloader, setDefaultDataReloader] = useState(-1);
  const [showRemoveModal, setShowRemoveModal] = useState(-1);
  const removeUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/dashboard/user/remove-user/${goalId}`;

  const [userData, setuserData] = useState(-1);

  const viewedRef = useRef();
  const user_is_activeRef = useRef();
  const blog_nameRef = useRef();
  const usernameRef = useRef();
  const displaynameRef = useRef();
  const roleRef = useRef();
  const phoneRef = useRef();
  const detailsRef = useRef();
  const default_imageRef = useRef();
  const active_code_numberRef = useRef();
  const passwordRef = useRef();

  const token = Cookies.get("token");
  const router = useRouter();
  useEffect(() => {
    const url = `/api/dashboard/user/user-details/${goalId}`;
    axios
      .get(url, { headers: { token: token } })
      .then((data) => {
        setuserData(data.data.data);
      })
      .catch((err) => {
        console.log(err);
        setuserData(-2);
      });
  }, [defaultDataReloader]);

  const formSubmiter = (e) => {
    e.preventDefault();
    toast.info("لطفا صبر کنید", {
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    const formData = {
      goalId: goalId,
      viewed: viewedRef.current.value == "false" ? false : true,
      user_is_active: user_is_activeRef.current.value == "false" ? false : true,
      blog_name: blog_nameRef.current.value,
      username: usernameRef.current.value,
      displayname: displaynameRef.current.value,
      role:
        roleRef.current.value == "1" ? 1 : roleRef.current.value == "2" ? 2 : 3,
      phone: phoneRef.current.value,
      details:
        detailsRef.current.value == "" ? undefined : detailsRef.current.value,
      default_image: default_imageRef.current.value,
      active_code_number: Number(active_code_numberRef.current.value),
      password:
        passwordRef.current.value == "" ? undefined : passwordRef.current.value,
    };
    axios
      .post(`/api/dashboard/user/update-user-data`, formData, {
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

  const imageupdater = (e) => {
    e.preventDefault();
    axios
      .post("/api/dashboard/user/update-user-image", e.target, {
        headers: { token: token, goal_user_id: userData._id },
      })
      .then((d) => {
        setDefaultDataReloader(defaultDataReloader * -1);
        toast.success("تصویر جدید کاربر ذخیره شد.", {
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
          : "خطا در فرایند به روزرسانی";
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
    <div className="flex flex-col gap-2 w-full">
      <>
        <title>جزئیات کاربر</title>
      </>
      <div className="flex items-center justify-between gap-2 ">
        <div className="text-xl pt-12 md:pt-0">جزئیات کاربر</div>
        <div
          className="w-10 h-10 dark:text-black z-10 fixed top-[8.7rem] md:top-[8.3rem] left-5 sm:left-12 md:left-20 lg:left-12 cursor-pointer"
          onClick={() => router.back()}
        >
          <BsArrowBarLeft className=" p-2 w-10 h-10 bg-zinc-200 rounded-md hover:bg-zinc-300 transition-all duration-500 " />
        </div>
      </div>
      <div className="my-12 flex justify-center items-center w-full ">
        {userData == -1 ? (
          <Loading />
        ) : userData == -2 ? (
          <div>خطا در بارگذاری اطلاعات</div>
        ) : userData.length < 1 ? (
          <div>کاربری موجود نیست</div>
        ) : (
          <div className="w-full flex flex-col gap-2">
            <div
              dir="ltr"
              className="flex static flex-wrap xl:fixed   md:top-[8.3rem] items-center left-24 gap-1 xl:gap-2"
            >
              <button
                onClick={formSubmiter}
                className="px-6 py-2 z-10 rounded-lg fixed lg:static top-[8.7rem] md:top-[8.3rem] left-16 sm:left-24 md:left-32 lg: bg-blue-500 transition-all duration-500 text-white hover:bg-blue-600  "
              >
                ذخیره
              </button>
              <button
                onClick={() => setShowRemoveModal(1)}
                type="button"
                className="px-6 py-2 z-10 fixed lg:static top-[8.7rem] md:top-[8.3rem] left-[153px] sm:left-[11.6rem] md:left-[13.6rem] lg:left-[153px]  rounded-lg bg-rose-600 transition-all duration-500 text-white hover:bg-rose-700  "
              >
                حذف
              </button>
              <Link
                target="_blank"
                className="px-3 py-2 rounded-lg bg-blue-300 transition-all duration-500 text-white hover:bg-blue-400 "
                href={`/dashboard/user-posts/${goalId}`}
              >
                پست
              </Link>
              <Link
                target="_blank"
                className="px-3 py-2 rounded-lg bg-blue-300 transition-all duration-500 text-white hover:bg-blue-400 "
                href={`/dashboard/user-bookmarks/${goalId}`}
              >
                بوکمارک
              </Link>
              <Link
                target="_blank"
                href={`/dashboard/user-notifications/${goalId}`}
                className="px-3 py-2 flex justify-center items-center rounded-lg bg-blue-300 transition-all duration-500 text-white hover:bg-blue-400 "
              >
                نوتیفیکیشن
              </Link>
              <Link
                target="_blank"
                href={`/dashboard/user-followers/${goalId}`}
                className="px-3 py-2 flex justify-center items-center rounded-lg bg-blue-300 transition-all duration-500 text-white hover:bg-blue-400 "
              >
                دنبال کننده
              </Link>
              <Link
                target="_blank"
                href={`/dashboard/user-followings/${goalId}`}
                className="px-3 py-2 flex justify-center items-center rounded-lg bg-blue-300 transition-all duration-500 text-white hover:bg-blue-400 "
              >
                دنبال شونده
              </Link>
              <Link
                target="_blank"
                href={`/dashboard/user-comments/${goalId}`}
                className="px-3 py-2 flex justify-center items-center rounded-lg bg-blue-300 transition-all duration-500 text-white hover:bg-blue-400 "
              >
                دیدگاه
              </Link>
              <Link
                target="_blank"
                href={`/dashboard/user-ads/${goalId}`}
                className="px-3 py-2 flex justify-center items-center rounded-lg bg-blue-300 transition-all duration-500 text-white hover:bg-blue-400 "
              >
                تبلیغ
              </Link>
            </div>
            <div className="flex items-center justify-between gap-2 ">
              <div className="flex items-center justify-start gap-2 flex-wrap">
                <div className="py-1 px-3 text-sm rounded-sm dark:text-black bg-zinc-200">
                  شناسه: {userData._id}
                </div>
                <div className="py-1 px-3 text-sm rounded-sm dark:text-black bg-zinc-200">
                  تاریخ ایجاد: {userData.createdAt}
                </div>
                {userData.updatedAt != "" ? (
                  <div className="py-1 px-3 text-sm rounded-sm dark:text-black bg-zinc-200">
                    آخرین بروز رسانی: {userData.updatedAt}
                  </div>
                ) : null}
              </div>
              <Image
                src={userData.default_image}
                width={40}
                height={40}
                sizes="40px"
                alt="default_image"
                className="rounded-full"
              />
            </div>
            <div className=" flex flex-col gap-1 my-4">
              <div>تصویر وبلاگ</div>
              <div className=" flex  justify-between items-center gap-2">
                <form
                  onSubmit={imageupdater}
                  className=" w-full  flex flex-col sm:flex-row justify-center sm:justify-start items-center gap-4"
                >
                  <div className=" flex flex-wrap sm:flex-nowrap justify-center sm:justify-start w-full  gap-2 items-center">
                    <div className=" relative w-40 h-32 flex justify-center items-center">

                        <Image
                          alt="user image"
                          fill
                          sizes="160px"
                          src={
                            userData.image != ""
                              ? userData.image
                              : userData.default_image
                          }
                          className=" rounded-md object-cover"
                        />
         
                    </div>
                    <div>
                      <div className=" w-40 h-12 sm:h-24 flex justify-center items-center">
                        <input
                          onChange={(e) => {
                            setimagename(e.target.files[0].name);
                          }}
                          id="file"
                          type="file"
                          name="file"
                        />
                        <div className="w-40 h-12 sm:h-24 flex justify-center items-center gap-2">
                          <label
                            className=" w-40 min-w-40 cursor-pointer  h-10 flex justify-center items-center rounded-md bg-blue-500 text-white transition-all duration-300 hover:bg-blue-600"
                            htmlFor="file"
                          >
                            {imagename == "" ? "انتخاب عکس جدید" : imagename}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className=" flex flex-col items-center sm:items-start gap-2 text-base text-zinc-600 sm:text-xs">
                      <div>حجم باید کمتر از 2 مگ باشد.</div>
                      <div>فقط PNG، JPG و JPEG</div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className=" w-24 min-w-24  h-10 flex justify-center items-center rounded-md bg-blue-500 text-white transition-all duration-300 hover:bg-blue-600"
                  >
                    آپلود عکس
                  </button>
                </form>
              </div>
            </div>
            <form
              onKeyDown={onKeyDownNotSubmit}
              onSubmit={formSubmiter}
              className="flex flex-col gap-4 w-full "
            >
              <div className="flex flex-col gap-2">
                <h4>نام وبلاگ</h4>
                <input
                  required
                  ref={blog_nameRef}
                  defaultValue={userData.blog_name}
                  autoComplete="off"
                  type="text"
                  className=" border-2 border-zinc-200 dark:bg-zinc-800 rounded-md p-2 outline-none focus:border-blue-500 w-full "
                />
              </div>
              <div className="flex flex-col gap-2">
                <h4>نام کاربری</h4>
                <input
                  required
                  ref={usernameRef}
                  defaultValue={userData.username}
                  autoComplete="off"
                  type="text"
                  className="ltr_dir border-2 border-zinc-200 dark:bg-zinc-800 rounded-md p-2 outline-none focus:border-blue-500 w-full "
                />
              </div>
              <div className="flex flex-col gap-2">
                <h4>نام نمایشی</h4>
                <input
                  required
                  ref={displaynameRef}
                  defaultValue={userData.displayname}
                  autoComplete="off"
                  type="text"
                  className=" border-2 border-zinc-200 dark:bg-zinc-800 rounded-md p-2 outline-none focus:border-blue-500 w-full "
                />
              </div>
              <div className="flex flex-col gap-2">
                <h4>نقش کاربر</h4>
                <select
                  ref={roleRef}
                  defaultValue={userData.role}
                  className=" border-2 cursor-pointer border-zinc-200 dark:bg-zinc-800 rounded-md p-2 outline-none focus:border-blue-500 w-full "
                >
                  <option value={3}>کاربر معمولی</option>
                  <option value={2}>ادیتور</option>
                  <option value={1}>ادمین</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <h4>شماره همراه</h4>
                <input
                  required
                  ref={phoneRef}
                  defaultValue={userData.phone}
                  autoComplete="off"
                  type="text"
                  className=" border-2 border-zinc-200 dark:bg-zinc-800 rounded-md p-2 outline-none focus:border-blue-500 w-full "
                />
              </div>
              <div className="flex flex-col gap-2">
                <h4>توضیحات کوتاه وبلاگ</h4>
                <input
                  ref={detailsRef}
                  defaultValue={userData.details}
                  autoComplete="off"
                  type="text"
                  className=" border-2 border-zinc-200 dark:bg-zinc-800 rounded-md p-2 outline-none focus:border-blue-500 w-full "
                />
              </div>
              <div className="flex flex-col gap-2">
                <h4>دیده شده</h4>
                <select
                  ref={viewedRef}
                  defaultValue={userData.viewed}
                  className=" border-2 cursor-pointer border-zinc-200 dark:bg-zinc-800 rounded-md p-2 outline-none focus:border-blue-500 w-full "
                >
                  <option value={true}>دیده شده</option>
                  <option value={false}>دیده نشده</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <h4>کاربر فعال</h4>
                <select
                  ref={user_is_activeRef}
                  defaultValue={userData.user_is_active}
                  className=" border-2 cursor-pointer border-zinc-200 dark:bg-zinc-800 rounded-md p-2 outline-none focus:border-blue-500 w-full "
                >
                  <option value={true}>فعال</option>
                  <option value={false}>غیرفعال</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <h4>عکس پیش فرض</h4>
                <input
                  required
                  ref={default_imageRef}
                  defaultValue={userData.default_image}
                  autoComplete="off"
                  type="text"
                  className="ltr_dir border-2 border-zinc-200 dark:bg-zinc-800 rounded-md p-2 outline-none focus:border-blue-500 w-full "
                />
              </div>
              <div className="flex flex-col gap-2">
                <h4>تعداد پیامک باقی مانده</h4>
                <input
                  required
                  ref={active_code_numberRef}
                  defaultValue={userData.active_code_number}
                  autoComplete="off"
                  type="text"
                  className="ltr_dir border-2 border-zinc-200 dark:bg-zinc-800 rounded-md p-2 outline-none focus:border-blue-500 w-full "
                />
              </div>
              <div className="flex flex-col gap-2">
                <h4>رمز عبور جدید</h4>
                <input
                  ref={passwordRef}
                  defaultValue={userData.password}
                  autoComplete="off"
                  type="text"
                  className="ltr_dir border-2 border-zinc-200 dark:bg-zinc-800 rounded-md p-2 outline-none focus:border-blue-500 w-full "
                />
              </div>
              <RemoveModal
                removeUrl={removeUrl}
                showRemoveModal={showRemoveModal}
                setShowRemoveModal={setShowRemoveModal}
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
