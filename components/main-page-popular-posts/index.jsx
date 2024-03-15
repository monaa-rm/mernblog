"use client";
import Link from "next/link";
import BlogMainBox from "../boxes/blog-main-box";
import BlogBigBox from "../boxes/big-blog-box";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import axios from "axios";
import TopButton from "./topButton";
import PopularSkeleton from "./skeleton/popular-skeleton";

const MainPagePopularPosts = () => {
  const [posts, setPosts] = useState(-1);
  const [buttonContent, setButtonContent] = useState("top_view_number");

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/dashboard/main-page/new-and-best-posts?${buttonContent}=1`;
    axios
      .get(url)
      .then((data) => {
        setPosts(data.data.posts);
      })
      .catch((err) => {
        console.log(err);
        setPosts(-2);
      });
  }, [buttonContent]);

  return (
    <section className=" p-4 bg-zinc-100 dark:bg-zinc-700 rounded-lg flex flex-col gap-2 sm:gap-6 ">
      <header className="flex justify-between items-center w-full relative">
        <div className=" flex flex-wrap sm:flex-nowrap justify-start items-center gap-2 sm:gap-6">
          <h2 className="title_style dark:text-white">پرمخاطب ترین ها</h2>
          <div className=" flex justify-start items-center gap-1 sm:gap-4  ">
            <TopButton
              buttonContent={buttonContent}
              setButtonContent={setButtonContent}
              setPosts={setPosts}
              content="top_view_number"
              title="پربازدید ها"
            />
            <TopButton
              buttonContent={buttonContent}
              setButtonContent={setButtonContent}
              setPosts={setPosts}
              content="top_like_number"
              title="مفید ها"
            />
            <TopButton
              buttonContent={buttonContent}
              setButtonContent={setButtonContent}
              setPosts={setPosts}
              content="top_comment_number"
              title="پردیدگاه‌ ها"
            />
          </div>
        </div>
        <div className="w-20 bg-red-500">
          <Link
            href={"/"}
            className=" absolute left-0 top-0 px-3 py-1 rounded bg-blue-500 transition-all duration-500 hover:bg-blue-600 text-white"
          >
            همه
          </Link>
        </div>
      </header>
      {posts.length == 0 ? (
        <div>پستی برای این قسمت تعریف نشده است</div>
      ) : posts == -1 ? (
        <div className="">
          <PopularSkeleton />
        </div>
      ) : posts == -2 ? (
        <div>خطا در بارگذاری اطلاعات</div>
      ) : (
        <div className=" flex flex-wrap justify-center items-center gap-4 ">
          <div className="hidden sm:flex  gap-4">
            <BlogBigBox data={posts[0]} />
          </div>
          <div className="flex sm:hidden">
            <BlogMainBox data={posts[0]} />
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <BlogMainBox data={posts[1]} />
            <BlogMainBox data={posts[2]} />
          </div>
        </div>
      )}
    </section>
  );
};

export default MainPagePopularPosts;
