"use client";
import Loading from "@/app/loading";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const NotifsMain = ({ pagination_url }) => {
  const token = Cookies.get("token");
  const [allNotifs, setAllNotifs] = useState(-1);
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
    const url = `/api/dashboard/notifs/all?paginate=${paginate}&page_number=${page_number}`;
    axios
      .get(url, { headers: { token: token } })
      .then((data) => {
        setAllNotifs(data.data.notifs);
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
        setAllNotifs(-2);
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
        <div className="text-xl px-12 md:px-0">همه نوتیفیکیشن ها</div>
      </div>
      <div className="my-12 flex justify-center items-center">
        {allNotifs == -1 ? (
          <Loading />
        ) : allNotifs == -2 ? (
          <div>خطا در بارگذاری اطلاعات</div>
        ) : allNotifs.length < 1 ? (
          <div>نوتیفیکیشنی موجود نیست</div>
        ) : (
          <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-col gap-8 w-full">
              {allNotifs.map((item, i) => (
                <div
                  key={i}
                  className=" w-full relative flex flex-col gap-4 bg-white dark:bg-zinc-700 border-2 border-zinc-200 hover:border-blue-600   rounded-md p-4 transition-all duration-300 hover:bg-zinc-200 "
                >
                  <div className="flex justify-start md:justify-between flex-wrap  items-center gap-4">
                  <div className="text-sm bg-blue-500 text-white rounded-md px-1 lg:px-3 py-2 flex justify-center items-center">
                      {item.createdAt}
                    </div>
                    {item.post_id == item.user_id ||
                    item.post_id == 0 ? null : (
                      <Link
                        href={`/dashboard/posts/${item.post_id}`}
                        target="_blank"
                        className="px-1 lg:px-3  py-2 text-sm flex justify-center items-center rounded-lg bg-blue-500 transition-all duration-500 text-white hover:bg-blue-600 "
                      >
                        لینک جزئیات پست
                      </Link>
                    )}
                    <Link
                      href={`/dashboard/users/${item.user_id}`}
                      target="_blank"
                      className="px-1 lg:px-3  py-2 text-sm flex justify-center items-center rounded-lg bg-blue-500 transition-all duration-500 text-white hover:bg-blue-600 "
                    >
                      لینک جزئیات کاربر
                    </Link>


                    {item.viewed == true ? (
                      <div className="text-sm bg-blue-500 text-white rounded-md px-1 lg:px-3  py-2 flex justify-center items-center">
                        دیده شده در {item.updatedAt}
                      </div>
                    ) : (
                      <div className="text-sm bg-blue-500 text-white rounded-md px-1 lg:px-3  py-2 flex justify-center items-center">
                        دیده نشده
                      </div>
                    )}
                  </div>
                  <div className="">متن : {item.text}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center items-center gap-4">
        {allNotifs.length == 0 ? (
          <div></div>
        ) : (
          btns != -1 &&
          btns.map((btn, i) => (
            <Link
              onClick={() => {
                setAllNotifs(-1);
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

export default NotifsMain;
