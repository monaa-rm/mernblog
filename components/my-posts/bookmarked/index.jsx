"use client";
import Loading from "@/app/loading";
import NewBlogBox from "@/components/boxes/new-blog-box";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";

const MyBookMarkedPosts = ({ pagination_url }) => {
  const token = Cookies.get("token");
  const [bookmarkedPosts, setbookmarkedPosts] = useState(-1);
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
    const url = `/api/post/all-posts?paginate=${paginate}&page_number=${page_number}&bookmarked=1`;
    axios
      .get(url, { headers: { token: token } })
      .then((data) => {
        setbookmarkedPosts(data.data.posts);
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
        setbookmarkedPosts(-2);
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
      <><title>پست های بوکمارک شده</title></>
      <div className="flex items-center justify-between gap-2 ">
        <div className="text-xl">پست های بوکمارک شده</div>
      </div>
      <div className="my-12 flex justify-center items-center">
        {bookmarkedPosts == -1 ? (
          <Loading />
        ) : bookmarkedPosts == -2 ? (
          <div>خطا در بارگذاری اطلاعات</div>
        ) : bookmarkedPosts.length < 1 ? (
          <div> پستی موجود نیست</div>
        ) : (
          <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-col gap-8 flex-wrap w-full">
              {bookmarkedPosts.map((item, i) => (
 
                 <NewBlogBox key={i} data={item} blog_url={item.username} /> 
   
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center items-center gap-4">
        {btns != -1 &&
          btns.map((btn, i) => (
            <Link
              onClick={() => {
                setbookmarkedPosts(-1);
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
          ))}
      </div>
    </div> 
  );
};

export default MyBookMarkedPosts;
