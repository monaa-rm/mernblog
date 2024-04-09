"use client";

import NewBlogBox from "@/components/boxes/new-blog-box";
import { useState } from "react";
import SkeletonBox from "./skeleton-box";
import BlogMainBox from "@/components/boxes/blog-main-box";

const SkeletonManagement = ({ posts }) => {
  const [postsData, setPostsData] = useState(-1);
  setTimeout(() => {
    setPostsData(posts);
  }, 2000);
  return (
    <div className="flex flex-col gap-4">
      {postsData == -1 ? (
        <div className="flex flex-wrap md:flex-nowrap justify-center md:flex-col gap-4">
          <SkeletonBox />
          <SkeletonBox />
          <SkeletonBox />
          <SkeletonBox />
          <SkeletonBox />
          <SkeletonBox />
          <SkeletonBox />
          <SkeletonBox />
        </div>
      ) : (
        <div>
          <div className="hidden md:flex md:flex-col gap-4">
            {posts &&
              posts.map((da, i) => (
                <NewBlogBox blog_url={da.user} key={i} data={da} />
              ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:hidden">
            {posts &&
              posts.map((da, i) => (
                <BlogMainBox blog_url={da.user} key={i} data={da} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkeletonManagement;
