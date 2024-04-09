"use client";
import Loading from "@/app/loading";
import { setnotifValue } from "@/store/slices/notifSlice";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const NotifsComp = ({ token }) => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [all_notifs, setAll_notifs] = useState(-1);
  const [paginate, setPaginate] = useState(10);
  const [page_number, setPage_number] = useState(1);
  const [btns, setBtns] = useState([]);
  const [detaReloader, setDataReloader] = useState(-1);
  const [buttonLoader, setButtonLoader] = useState(false);
  const userBlogSlug = useSelector((store) => store.usernameSlice.value);
  const notif_number = useSelector((store) => store.notifSlice.value);

  useEffect(() => {
    setPaginate(
      searchParams.get("paginate") == undefined
        ? 10
        : searchParams.get("paginate")
    );
    setPage_number(
      searchParams.get("page_number") == undefined
        ? 1
        : searchParams.get("page_number")
    );
  }, [searchParams.get("page_number"), searchParams.get("paginate")]);

  useEffect(() => {
    const url = `/api/user/user-notifs?paginate=${paginate}&page_number=${page_number}`;
    axios
      .get(url, { headers: { token: token } })
      .then((data) => {
        setAll_notifs(data.data.allNotifs);
        const theNumber = Math.ceil(data.data.all_notifs_number / paginate);
        const myArray = Array.from(Array(theNumber).keys());
        let goalArray = [];
        myArray.map((item) => {
          if (
            item == 0 ||
            item == theNumber - 1 ||
            (item > Number(page_number) - 4 && item < Number(page_number) + 2)
          ) {
            goalArray.push(item);
          }
        });
        setBtns(goalArray);
      })
      .catch((err) => {
        console.log(err);
        setAll_notifs(-2);
      });
  }, [paginate, page_number, detaReloader]);
  const goTopCtrl = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const notifChecker = (goalId) => {
    setButtonLoader(goalId);
    const url = `/api/user/notif-checker/${goalId}`;
    axios
      .get(url, { headers: { token: token } })
      .then((data) => {
        setButtonLoader(false);
        setDataReloader(detaReloader * -1);
        dispatch(setnotifValue(notif_number - 1));
      })
      .catch((err) => {
        console.log(err);
        setButtonLoader(false);
        toast.error("خطا در فرایند بررسی نوتیفیکیشن", {
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
    <div className=" flex flex-col gap-12 mx-1">
      <h2 className=" title_style dark:text-white">نوتیفیکیشن ها</h2>
      <div className=" flex flex-col gap-12 ">
        {all_notifs == -1 ? (
          <Loading />
        ) : all_notifs == -2 ? (
          <div>خطا در بارگذاری اطلاعات</div>
        ) : all_notifs.length < 1 ? (
          <div>هیچ نوتیفیکیشنی وجود ندارد</div>
        ) : (
          <div className="flex flex-col gap-4">
            {all_notifs.length > 0 &&
              all_notifs.map((item) => (
                <div
                  key={item._id}
                  className="border-2 border-zinc-200 rounded-md text-sm p-6 flex flex-col gap-4 "
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="hidden sm:flex h-8 dark:text-black justify-center items-center px-2 py-1 rounded-md bg-zinc-200  ">
                      {item.createdAt}
                    </div>
                    <div className="flex flex-wrap justify-start sm:justify-end items-center gap-4">
                      {item.post_slug ? (
                        <div className="w-full sm:w-auto">
                          <Link
                            href={`/blog/${userBlogSlug}/${item.post_slug}`}
                            className=" text-white max-w-fit bg-blue-500 rounded-md px-3 flex items-center h-8 "
                          >
                            {item.post_title}
                          </Link>
                        </div>
                      ) : null}
                      {item.viewed == true ? (
                        <div className="text-white bg-green-500 rounded-md  w-20 h-8 flex justify-center items-center ">
                          دیده شده
                        </div>
                      ) : buttonLoader == item._id ? (
                        <div className="w-20 h-8  bg-rose-500  cursor-wait rounded-md flex justify-center items-center">
                          <Image
                            width="20"
                            height="20"
                            sizes="50px"
                            alt="loading"
                            src="/button-reloader.svg"
                          />
                        </div>
                      ) : (
                        <button
                          onClick={() => notifChecker(item._id)}
                          className=" w-20 h-8 flex justify-center items-center text-white  bg-rose-500  hover:bg-rose-600 rounded-md "
                        >
                          دیده نشده
                        </button>
                      )}
                      <div className="px-2 py-1 h-8 justify-center items-center  dark:text-black sm:hidden rounded-md bg-zinc-200  ">
                        {item.createdAt}
                      </div>
                    </div>
                  </div>
                  <p>پیام: {item.text}</p>
                </div>
              ))}
          </div>
        )}
      </div>
      <div className="flex justify-center items-center gap-4">
        {btns != -1 &&
          btns.map((btn, i) => (
            <Link
              onClick={() => {
                setAll_notifs(-1);
                goTopCtrl();
              }}
              key={i}
              className={
                page_number == btn + 1
                  ? "bg-orange-500 text-white w-7 h-7 hover:bg-orange-600 rounded-full flex justify-center items-center transition-all duration-300 "
                  : "bg-blue-500 text-white w-7 h-7 hover:bg-blue-600 rounded-full flex justify-center items-center transition-all duration-300 "
              }
              href={`/notifications?paginate=${paginate}&page_number=${
                btn + 1
              }`}
            >
              {btn + 1}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default NotifsComp;
