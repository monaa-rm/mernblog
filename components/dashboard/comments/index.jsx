"use client";
import Loading from "@/app/loading";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CommentsMain = ({ pagination_url }) => {
  const token = Cookies.get("token");
  const [all_comments, setall_comments] = useState(-1);
  const searchParams = useSearchParams();
  const [paginate, setPaginate] = useState(10);
  const [page_number, setPage_number] = useState(1);
  const [btns, setBtns] = useState([]);

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
    const url = `/api/dashboard/comment/all?paginate=${paginate}&page_number=${page_number}`;
    axios
      .get(url, { headers: { token: token } })
      .then((data) => {
        setall_comments(data.data.comments);
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
  }, [paginate, page_number]);

  const goTopCtrl = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex items-center justify-between gap-2 ">
        <div className="text-xl px-12 md:px-0">همه دیدگاه ها</div>
      </div>
      <div className="my-12 flex justify-center items-center">
        {all_comments == -1 ? (
          <Loading />
        ) : all_comments == -2 ? (
          <div>خطا در بارگذاری اطلاعات</div>
        ) : all_comments.length < 1 ? (
          <div>دیدگاهی موجود نیست</div>
        ) : (
          <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-col gap-4 w-full">
              {all_comments.map((item, i) => (
                <Link
                  href={`/dashboard/comments/${item._id}`}
                  key={i}
                  className=" w-full  flex flex-col gap-4 bg-white dark:bg-zinc-700 border-2 border-zinc-200 hover:border-blue-600   rounded-md p-4 transition-all duration-300 hover:bg-zinc-200 "
                >
                  <div className=" flex flex-col-reverse lg:flex-row justify-start lg:justify-between items-start lg:items-center gap-4 ">
                    <div>شماره تماس: {`0${item.phone}`}</div>
                    <div className="flex flex-wrap items-center justify-end gap-1 sm:gap-2">
                      {item.published == true ? (
                        <div className="text-sm bg-green-500 text-white rounded-md w-auto px-[2px] md:px-0 md:w-20 h-8 flex justify-center items-center ">
                          منتشر شده
                        </div>
                      ) : (
                        <div className="text-sm bg-rose-500 text-white rounded-md w-auto px-[2px] md:px-0 md:w-20 h-8 flex justify-center items-center ">
                          منتشر نشده
                        </div>
                      )}

                      {item.viewed == true ? (
                        <div className="text-sm bg-green-500 text-white rounded-md w-auto px-[2px] md:px-0 md:w-20 h-8 flex justify-center items-center ">
                          دیده شده
                        </div>
                      ) : (
                        <div className="text-sm bg-rose-500 text-white rounded-md w-auto px-[2px] md:px-0 md:w-20 h-8 flex justify-center items-center ">
                          دیده نشده
                        </div>
                      )}
                      <div className="text-sm bg-blue-500 text-white rounded-md w-auto px-[2px] md:px-0 md:w-24 h-8 flex justify-center items-center ">
                        {item.createdAt}
                      </div>
                    </div>
                  </div>
                  <span className="w-full text-zinc-700 dark:text-zinc-200 font-[vazirregular] line-clamp-1">{item.message}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center items-center gap-4">
        {all_comments.length == 0 ? (
          <div></div>
        ) : (
          btns != -1 &&
          btns.map((btn, i) => (
            <Link
              onClick={() => {
                setall_comments(-1);
                goTopCtrl();
              }}
              key={i}
              className={
                page_number == btn + 1
                  ? "bg-orange-500 text-white w-7 h-7 hover:bg-orange-600 rounded-full flex justify-center items-center transition-all duration-300 "
                  : "bg-blue-500 text-white w-7 h-7 hover:bg-blue-600 rounded-full flex justify-center items-center transition-all duration-300 "
              }
              href={`/dashboard/${pagination_url}?paginate=${paginate}&page_number=${
                btn + 1
              }`}
            >
              {btn + 1}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentsMain;
