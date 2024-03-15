"use client";
import Loading from "@/app/loading";
import { setnotifValue } from "@/store/slices/notifSlice";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const UserComments = ({ goalId, pagination_url }) => {
  const token = Cookies.get("token");
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [all_comments, setall_comments] = useState(-1);
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
    const url = `/api/dashboard/user/user-comments/${goalId}?paginate=${paginate}&page_number=${page_number}`;
    axios
      .get(url, { headers: { token: token } })
      .then((data) => {
        setall_comments(data.data.all_comments);
        const theNumber = Math.ceil(data.data.all_comments_number / paginate);
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
        setall_comments(-2);
      });
  }, [paginate, page_number, detaReloader]);

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
  const goTopCtrl = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className=" flex flex-col gap-12 ">
            <>
        <title>دیدگاه های کاربر</title>
      </>
      <div className="text-xl pt-12 md:pt-0">دیدگاه های کاربر</div>
      <div className=" flex flex-col gap-12 ">
        {all_comments == -1 ? (
          <Loading />
        ) : all_comments == -2 ? (
          <div>خطا در بارگذاری اطلاعات</div>
        ) : all_comments.length < 1 ? (
          <div>هیچ دیدگاهی وجود ندارد</div>
        ) : (
          <div className="flex flex-col gap-4">
            {all_comments.map((item,i) => (
              <Link
                href={`/dashboard/comments/${item._id}`}
                key={i}
                className=" w-full  flex flex-col gap-4 bg-white dark:bg-zinc-800 border-2 border-zinc-200 hover:border-blue-600   rounded-md p-4 transition-all duration-300 hover:bg-zinc-200 "
              >
                <div className=" flex justify-between items-center gap-4 ">
                  <div className="flex items-center justify-end gap-2">
                    <div className="text-sm bg-blue-500 text-white rounded-md w-24 h-8 flex justify-center items-center ">
                      {item.createdAt}
                    </div>
                  </div>
                </div>
                <span className="w-full text-zinc-700 dark:text-zinc-200 font-[vazirregular] line-clamp-1">
                  {item.message}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-center items-center gap-4">
        {btns != -1 &&
          btns.map((btn, i) => (
            <Link
              onClick={() => {
                goTopCtrl();
              }}
              key={i}
              className={
                page_number == btn + 1
                  ? "bg-orange-500 text-white w-7 h-7 hover:bg-orange-600 rounded-full flex justify-center items-center transition-all duration-300 "
                  : "bg-blue-500 text-white w-7 h-7 hover:bg-blue-600 rounded-full flex justify-center items-center transition-all duration-300 "
              }
              href={`/dashboard/${pagination_url}/${goalId}?paginate=${paginate}&page_number=${
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

export default UserComments;
