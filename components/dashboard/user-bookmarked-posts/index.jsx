"use client";
import Loading from "@/app/loading";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const UserBookmarkedPosts = ({ pagination_url, goalId }) => {
  const token = Cookies.get("token");
  const [all_user_posts, setall_user_posts] = useState(-1);
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
    const url = `/api/dashboard/user/user-bookmarked-posts/${goalId}?paginate=${paginate}&page_number=${page_number}`;
    axios
      .get(url, { headers: { token: token } })
      .then((data) => {
        setall_user_posts(data.data.all_user_posts);
        const theNumber = Math.ceil(data.data.all_user_posts_num / paginate);
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
        setall_user_posts(-2);
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
      <>
        <title>پست‌های بوکمارک شده‌ی این کاربر</title>
      </>
      <div className="flex items-center justify-between gap-2 ">
        <div className="text-xl pt-12 md:pt-0">
          پست‌های بوکمارک شده‌ی این کاربر
        </div>
      </div>
      <div className="my-12 flex justify-center items-center">
        {all_user_posts == -1 ? (
          <Loading />
        ) : all_user_posts == -2 ? (
          <div>خطا در بارگذاری اطلاعات</div>
        ) : all_user_posts.length < 1 ? (
          <div>پستی موجود نیست</div>
        ) : (
          <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-col gap-8 w-full">
              {all_user_posts.map((item, i) => (
                <Link
                  href={`/dashboard/posts/${item._id}`}
                  key={i}
                  className=" w-full relative flex flex-col gap-4 bg-white dark:bg-zinc-700 border-2 border-zinc-200 hover:border-blue-600  rounded-md p-4 transition-all duration-300 hover:bg-zinc-200 "
                >
                  <div>{item.title}</div>
                  <div className="flex justify-center md:justify-start items-center gap-2 ">
                    <div className="w-48 h-32 md:w-32 md:h-20 rounded-md relative ">
                      <Image
                      sizes="256px"
                        fill
                        src={item.image}
                        alt="image"
                        className="object-cover rounded"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center items-center flex-wrap gap-2">
                    <div className="text-sm bg-blue-500 text-white rounded-md px-2 md:px-0 w-auto md:w-20 h-8 flex justify-center items-center static md:absolute top-2 left-2 ">
                      {item.published == true ? "منتشر شده" : "منتشر نشده"}
                    </div>
                    <div className="text-sm bg-blue-500 text-white rounded-md px-2 md:px-0 w-auto md:w-20 h-8 flex justify-center items-center static md:absolute top-2 left-24 ">
                      {item.manager_accept == false
                        ? "تایید نشده"
                        : "تایید شده"}
                    </div>
                    <div className="text-sm bg-blue-500 text-white rounded-md px-2 md:px-0 w-auto md:w-20 h-8 flex justify-center items-center static md:absolute bottom-2 left-2 ">
                      {item.view_num} بازدید
                    </div>
                    <div className="text-sm bg-blue-500 text-white rounded-md px-2 md:px-0 w-auto md:w-20 h-8 flex justify-center items-center static md:absolute bottom-2 left-24 ">
                      {item.likes_num} لایک
                    </div>
                    <div className="text-sm bg-blue-500 text-white rounded-md w-32 md:w-36 h-8 flex justify-center items-center static md:absolute top-2 md:top-16 lg:top-2 md:left-2 lg:left-[184px] ">
                      {item.updatedAt}
                    </div>
                    <div className="text-sm bg-blue-500 text-white rounded-md px-2 md:px-0 w-auto md:w-20 h-8 flex justify-center items-center static md:absolute bottom-2 left-[184px]">
                      {item.time} دقیقه{" "}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center items-center gap-4">
        {all_user_posts.length == 0 ? (
          <div></div>
        ) : (
          btns != -1 &&
          btns.map((btn, i) => (
            <Link
              onClick={() => {
                setall_user_posts(-1);
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
          ))
        )}
      </div>
    </div>
  );
};

export default UserBookmarkedPosts;
