"use client";
import Loading from "@/app/loading";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";

const MyAllPosts = ({ pagination_url }) => {
  const token = Cookies.get("token");
  const [all_posts, setall_posts] = useState(-1);
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
    const url = `/api/post/all-posts?paginate=${paginate}&page_number=${page_number}`;
    axios
      .get(url, { headers: { token: token } })
      .then((data) => {
        setall_posts(data.data.posts);
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
        setall_posts(-2);
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
        <title>همه پست های من</title>
      </>
      <div className="flex items-center justify-between gap-2 ">
        <div className="text-xl">همه پست های من</div>
      </div>
      <div className="my-12 flex justify-center items-center">
        {all_posts == -1 ? (
          <Loading />
        ) : all_posts == -2 ? (
          <div>خطا در بارگذاری اطلاعات</div>
        ) : all_posts.length < 1 ? (
          <div>مقاله ای موجود نیست</div>
        ) : (
          <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-col gap-8 w-full">
              {all_posts.map((item, i) => (
                <Link
                  href={`/my-posts/all/${item._id}`}
                  key={i}
                  className=" w-full relative flex flex-col gap-4 bg-white dark:bg-zinc-800 border-2 border-zinc-200 rounded-md p-2 transition-all duration-300 hover:bg-zinc-50 hover:border-blue-500 "
                >
                  <div>عنوان مقاله : {item.title}</div>
                  <div className="w-full flex justify-center items-center gap-2 sm:justify-start">
                    <div className=" relative w-56 h-32 sm:w-52 sm:h-28 flex justify-center items-center">
                      <Image
                        alt={item.image}
                        sizes="256px"
                        fill
                        src={item.image}
                        className=" rounded-md object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-1 flex-wrap">
                    <div className="flex items-center justify-center gap-1 flex-wrap">
                      <div className=" sm:absolute top-2 left-2 bg-blue-600 text-white rounded-md  flex items-center justify-center gap-1 w-[120px] sm:w-28 h-8">
                        {item.createdAt}
                      </div>
                      <div className=" sm:absolute top-2 left-36 bg-blue-600 text-white rounded-md flex items-center justify-center gap-1 w-[120px] sm:w-28 h-8">
                        {item.published == true ? "منتشر شده" : "منتشر نشده"}
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-1 flex-wrap">
                      <div className=" sm:absolute bottom-2 left-2 bg-blue-600 text-white rounded-md px-3 py-1  flex items-center justify-center gap-1 w-auto sm:w-28 sm:h-8">
                        <span>{item.view_num}</span>
                        <FaEye />
                      </div>
                      <div className=" sm:absolute bottom-2 left-36 bg-blue-600 text-white rounded-md px-3 py-1 flex items-center justify-center gap-1 w-auto sm:w-28 sm:h-8">
                        <span>{item.likes_num} </span>
                        <FaHeart />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center items-center gap-4">
        {all_posts.length == 0 ? (
          <div></div>
        ) : (
          btns != -1 &&
          btns.map((btn, i) => (
            <Link
              onClick={() => {
                setall_posts(-1);
                goTopCtrl();
              }}
              key={i}
              className={
                page_number == btn + 1
                  ? "bg-orange-500 text-white w-7 h-7 hover:bg-orange-600 rounded-full flex justify-center items-center transition-all duration-300 "
                  : "bg-blue-500 text-white w-7 h-7 hover:bg-blue-600 rounded-full flex justify-center items-center transition-all duration-300 "
              }
              href={`/my-posts/${pagination_url}?paginate=${paginate}&page_number=${
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

export default MyAllPosts;
