"use client";
import { useState } from "react";
import Link from "next/link";

const HotNews = ({ posts_ads }) => {
  const newsList = posts_ads
    ? posts_ads.map((ads, i) => ({ ...ads, value: i }))
    : [];

  const [activeNews, setactiveNews] = useState(newsList[0] || "");
  if (posts_ads) {
    if (posts_ads.length) {
      setTimeout(() => {
        let item = activeNews.value;
        if (item == newsList.length - 1) {
          setactiveNews(newsList[0]);
        } else {
          setactiveNews(newsList[item + 1]);
        }
      }, 3000);
    }
  }

  return (
    <div className=" flex justify-start items-center gap-1">
      {posts_ads && posts_ads.length > 0 ? (
        <>
          <span className="title_style w-24 min-w-[96px] dark:text-white  xl:w-24 xl:min-w-[96px] ">
            داغ ترین ها :{" "}
          </span>
          <Link
            target="_blank"
            rel="noreferrer"
            href={activeNews.link}
            className=" w-full text-base sm:text-sm line-clamp-1"
          >
            {activeNews.post_title}
          </Link>
        </>
      ) : null}
    </div>
  );
};

export default HotNews;
