"use client";
import { useEffect, useState } from "react";

import MyAllPosts from "@/components/my-posts/all";
import MyDraftPosts from "@/components/my-posts/draft";
import MyPublishedPosts from "@/components/my-posts/published";
import MyWaitingForManagerPosts from "@/components/my-posts/waiting-for-manager";
import MyBookMarkedPosts from "@/components/my-posts/bookmarked";
import MyAcceptedPosts from "@/components/my-posts/accepted-posts";
import PostDetails from "@/components/my-posts/post-details";

const Posts = ({ params }) => {
  const [details, setdetails] = useState(<MyAllPosts />);

  useEffect(() => {
    if (params.slug[0] == "all" && params.slug[1] == undefined) {
      setdetails(<MyAllPosts pagination_url="all" />);
    } else if (params.slug[0] == "drafts" && params.slug[1] == undefined) {
      setdetails(<MyDraftPosts pagination_url="drafts" />);
    } else if (params.slug[0] == "published" && params.slug[1] == undefined) {
      setdetails(<MyPublishedPosts pagination_url="published" />);
    } else if (params.slug[0] == "waiting" && params.slug[1] == undefined) {
      setdetails(<MyWaitingForManagerPosts pagination_url="waiting" />);
    } else if (params.slug[0] == "accepted" && params.slug[1] == undefined) {
      setdetails(<MyAcceptedPosts pagination_url="accepted" />);
    } else if (params.slug[0] == "bookmarked" && params.slug[1] == undefined) {
      setdetails(<MyBookMarkedPosts pagination_url="bookmarked" />);
    } else if (params.slug[0] == "all" && params.slug[1] != undefined) {
      setdetails(<PostDetails goalId={params.slug[1]} />);
    }
  }, [params.slug[0]]);

  return <div className="mx-1">{details}</div>;
};

export default Posts;
