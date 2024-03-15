"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { setuserImageValue } from "@/store/slices/userImageSlice";
import { useDispatch } from "react-redux";
import { userIsActiveToTrue } from "@/store/slices/user_is_active";

const UpdateUserData = ({ token }) => {
  const [imagename, setimagename] = useState("");

  const dispatch = useDispatch();

  const usernameRef = useRef();
  const blog_nameRef = useRef();
  const displaynameRef = useRef();
  const detailsRef = useRef();
  const passwordRef = useRef();
  const phoneRef = useRef();

  const [userDefValues, setuserDefValues] = useState(-1);

  const [userdefvaluesReloader, setuserdefvaluesReloader] = useState(-1);
  useEffect(() => {
    axios
      .get("/api/user/user-setting-default-items", {
        headers: { token: token },
      })
      .then((d) => {
        dispatch(
          setuserImageValue(
            d.data.data.image != ""
              ? d.data.data.image
              : d.data.data.default_image
          )
        );
        setuserDefValues(d.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, [userdefvaluesReloader]);

  const updater = async (e, input_name, inputRef) => {
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
      [input_name]:
        inputRef.current.value == "" ? undefined : inputRef.current.value,
    };

    axios
      .post("/api/user/update", formData, { headers: { token: token } })
      .then((data) => {
        toast.success(data.data.data, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        toast.error(err.response.data ?? "خطا در فرایند بروز رسانی", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  const imageupdater = (e) => {
    e.preventDefault();
    axios
      .post("/api/user/update-user-image", e.target, {
        headers: { token: token },
      })
      .then((d) => {
        setuserdefvaluesReloader(userdefvaluesReloader * -1);
        toast.success("به روزرسانی با موفقیت انجام شد.", {
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

  const smsSender = () => {
    toast.info("لطفا صبر کنید", {
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    axios
      .get("/api/user/sms/send-phone-confirm-sms", {
        headers: { token: token },
      })
      .then((data) => {
        setuserdefvaluesReloader(userdefvaluesReloader * -1);
        toast.success(data.data.data, {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        toast.error(err.response.data.data ?? "خطا در فرایند ارسال پیامک ", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  const phoneConfirmer = () => {
    toast.info("لطفا صبر کنید", {
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    const formdata = {
      code: phoneRef.current.value,
    };
    axios
      .post("/api/user/sms/confirm-phone-number-sms", formdata, {
        headers: { token: token },
      })
      .then((data) => {
        setuserdefvaluesReloader(userdefvaluesReloader * -1);
        dispatch(userIsActiveToTrue());
        toast.success(data.data.data ?? "حساب کاربری با موفقیت فعال شد", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        toast.error(err.response.data.data ?? "کد تایید اشتباه است", {
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
    <div className=" flex justify-center items-center">
      <div className="flex flex-col gap-12 p-4 w-[800px]">
        {userDefValues == -1 ? (
          <div className=" my-12 flex justify-center items-center">
            <Image sizes="120px" width={120} height={120} alt="loding" src={"/loading.svg"} />
          </div>
        ) : (
          <div className="flex flex-col gap-20">
            {userDefValues.user_is_active == false ? (
              <div className=" flex flex-col gap-4">
                <div className=" flex justify-between items-center gap-2">
                  <div>تایید شماره همراه</div>
                  <button
                    onClick={smsSender}
                    className=" w-32 min-w-32  h-10 flex justify-center items-center rounded-md bg-blue-500 text-white transition-all duration-300 hover:bg-blue-600"
                  >
                    ارسال پیامک (
                    {userDefValues == -1
                      ? ""
                      : userDefValues.active_code_number}
                    )
                  </button>
                </div>
                <div className=" flex justify-between items-center gap-2">
                  <input
                    ref={phoneRef}
                    type="text"
                    className="border-b-2 border-zinc-200 dark:bg-zinc-900 p-2 outline-none focus:border-blue-500 w-full "
                  />
                  <button
                    onClick={phoneConfirmer}
                    className=" w-20 min-w-20  h-10 flex justify-center items-center rounded-md bg-blue-500 text-white transition-all duration-300 hover:bg-blue-600"
                  >
                    بررسی کد
                  </button>
                </div>
              </div>
            ) : (
              <div>کاربر فعال با شماره تماس: {"0" + userDefValues.phone}</div>
            )}

            <div className=" flex flex-col gap-1">
              <div>تصویر وبلاگ</div>

              <div className=" flex  justify-between items-center gap-2">
                <form
                  onSubmit={imageupdater}
                  className=" w-full  flex flex-col sm:flex-row justify-center sm:justify-start items-center gap-4"
                >
                  <div className=" flex flex-wrap sm:flex-nowrap justify-center sm:justify-start w-full  gap-2 items-center">
                    <div className=" relative w-40 h-40 flex justify-center items-center">
                    <Image
                        alt="user image"
                        sizes="256px"
                        fill
                        src={
                          userDefValues.image != ""
                            ? userDefValues.image
                            : userDefValues.default_image
                        }
                        className=" rounded-full object-cover"
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
            <div className=" flex flex-col gap-1">
              <div>نام کاربری</div>
              <div className=" flex justify-between items-center gap-2">
                <input
                  defaultValue={userDefValues.username}
                  ref={usernameRef}
                  type="text"
                  placeholder="نام کاربری جدید"
                  className="border-b-2 border-zinc-200 dark:bg-zinc-900 p-2 outline-none focus:border-blue-500 w-full "
                />
                <button
                  onClick={(e) => updater(e, "username", usernameRef)}
                  className=" w-20 min-w-20  h-10 flex justify-center items-center rounded-md bg-blue-500 text-white transition-all duration-300 hover:bg-blue-600"
                >
                  ذخیره
                </button>
              </div>
            </div>
            <div className=" flex flex-col gap-1">
              <div>نام وبلاگ</div>
              <div className=" flex justify-between items-center gap-2">
                <input
                  defaultValue={userDefValues.blog_name}
                  ref={blog_nameRef}
                  type="text"
                  placeholder="نام وبلاگ جدید"
                  className="border-b-2 border-zinc-200 dark:bg-zinc-900 p-2 outline-none focus:border-blue-500 w-full "
                />
                <button
                  onClick={(e) => updater(e, "blog_name", blog_nameRef)}
                  className=" w-20 min-w-20  h-10 flex justify-center items-center rounded-md bg-blue-500 text-white transition-all duration-300 hover:bg-blue-600"
                >
                  ذخیره
                </button>
              </div>
            </div>
            <div className=" flex flex-col gap-1">
              <div>نام نمایشی</div>
              <div className=" flex justify-between items-center gap-2">
                <input
                  defaultValue={userDefValues.displayname}
                  ref={displaynameRef}
                  type="text"
                  placeholder="نام نمایشی جدید"
                  className="border-b-2 border-zinc-200 dark:bg-zinc-900  p-2 outline-none focus:border-blue-500 w-full "
                />
                <button
                  onClick={(e) => updater(e, "displayname", displaynameRef)}
                  className=" w-20 min-w-20  h-10 flex justify-center items-center rounded-md bg-blue-500 text-white transition-all duration-300 hover:bg-blue-600"
                >
                  ذخیره
                </button>
              </div>
            </div>
            <div className=" flex flex-col gap-1">
              <div>درباره وبلاگ</div>
              <div className=" flex justify-between items-center gap-2">
                <input
                  defaultValue={userDefValues.details}
                  ref={detailsRef}
                  type="text"
                  placeholder="درباره وبلاگ جدید"
                  className="border-b-2 border-zinc-200 dark:bg-zinc-900  p-2 outline-none focus:border-blue-500 w-full "
                />
                <button
                  onClick={(e) => updater(e, "details", detailsRef)}
                  className=" w-20 min-w-20  h-10 flex justify-center items-center rounded-md bg-blue-500 text-white transition-all duration-300 hover:bg-blue-600"
                >
                  ذخیره
                </button>
              </div>
            </div>
            <div className=" flex flex-col gap-1">
              <div>رمز عبور </div>
              <div className=" flex justify-between items-center gap-2">
                <input
                  ref={passwordRef}
                  type="password"
                  placeholder="رمز عبور جدید"
                  className="border-b-2 border-zinc-200 dark:bg-zinc-900 p-2 outline-none focus:border-blue-500 w-full "
                />
                <button
                  onClick={(e) => updater(e, "password", passwordRef)}
                  className=" w-20 min-w-20  h-10 flex justify-center items-center rounded-md bg-blue-500 text-white transition-all duration-300 hover:bg-blue-600"
                >
                  ذخیره
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateUserData;
