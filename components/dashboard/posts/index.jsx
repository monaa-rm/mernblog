"use client";
import Loading from "@/app/loading";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PostsMain = ({ pagination_url }) => {
  const token = Cookies.get("token");
  const [allPosts, setallPosts] = useState(-1);
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
    setallPosts(-1);
    const url = `/api/dashboard/post/all?paginate=${paginate}&page_number=${page_number}`;
    axios
      .get(url, { headers: { token: token } })
      .then((data) => {
        setallPosts(data.data.posts);
        const theNumber = Math.ceil(data.data.all_posts_number / paginate);
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
        setallPosts(-2);
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
        <title>همه پست ها</title>
      </>
      <div className="flex items-center justify-between gap-2 ">
        <div className="text-xl pt-12 md:pt-0">همه پست ها</div>
        <Link
          className="px-3 py-2 z-10 fixed top-[8.7rem] md:top-[8.3rem] text-white rounded-md left-12 bg-blue-500 hover:bg-blue-600 transition-all duration-500 "
          href={"/dashboard/not-accepted"}
        >
          پست های در انتظار انتشار
        </Link>
      </div>
      <div className="my-12 flex justify-center items-center">
        {allPosts == -1 ? (
          <Loading />
        ) : allPosts == -2 ? (
          <div>خطا در بارگذاری اطلاعات</div>
        ) : allPosts.length < 1 ? (
          <div>پستی موجود نیست</div>
        ) : (
          <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-col gap-4 w-full">
              {allPosts.map((item, i) => (
                <div
                  key={i}
                  className=" w-full relative flex flex-col gap-4 bg-white dark:bg-zinc-700  border-2 border-zinc-200 hover:border-blue-600  rounded-md p-4 transition-all duration-300 hover:bg-zinc-200 "
                >
                  <Link href={`/dashboard/posts/${item._id}`}>
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
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center items-center gap-4">
        {allPosts.length == 0 ? (
          <div></div>
        ) : (
          btns != -1 &&
          btns.map((btn, i) => (
            <div
              key={i}
              className={
                page_number == btn + 1
                  ? "bg-orange-500 text-white w-7 h-7 hover:bg-orange-600 rounded-full flex justify-center items-center transition-all duration-300 "
                  : "bg-blue-500 text-white w-7 h-7 hover:bg-blue-600 rounded-full flex justify-center items-center transition-all duration-300 "
              }
            >
              <Link
                onClick={() => {
                  setallPosts(-1);
                  goTopCtrl();
                }}
                href={`/dashboard/${pagination_url}?paginate=${paginate}&page_number=${
                  btn + 1
                }`}
              >
                {btn + 1}
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PostsMain;
