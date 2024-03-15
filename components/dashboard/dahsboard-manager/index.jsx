"use client";
import { useEffect, useState } from "react";
import UserMain from "../users";
import PostsMain from "../posts";
import AdsMain from "../ads";
import CommentsMain from "../comments";
import DashboardDefault from "../dashboard-default";
import CategoryMain from "../categories";
import PostsNotAccepted from "../posts-not-accepted";
import ChiefEditorsMain from "../chief-editor";
import NotifsMain from "../notifs";
import UserDetails from "../user-details";
import CategoryDetails from "../category-details";
import PostDetailsInDashboard from "../post-details-in-dashboard";
import UserBookmarkedPosts from "../user-bookmarked-posts";
import PostsNotAcceptedDetails from "../post-not-accepted-details";
import NewUsers from "../users-new";
import NewCategory from "../category-new";
import NewChiefEditor from "../chief-editor-new";
import UserPostsMain from "../user-posts";
import UserNotifications from "../user-notifications";
import DashboardCntrl from "../dashboard-cntrl";
import UserFollowers from "../user-followers";
import UserFollowings from "../user-followings";
import CommentsDetails from "../comment-details";
import UserComments from "../user-comments";
import AdsIsOn from "../ads-is-on";
import UserAds from "../user-ads";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DahsboardManager = ({ params, role }) => {
  const [details, setDetails] = useState(<DashboardDefault />);
  const [showMenu, setShowmenu] = useState(-1);
  const router = useRouter();
  useEffect(() => {
    if (role == 2) {
      if (params.slug[0] != "default" && params.slug[0] != "ads"  ) {
        toast.info("دسترسی فقط برای ادمین آزاد است", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        router.push("/dashboard/default");

      }
    }
    if (params.slug[0] == "users" && params.slug[1] == undefined) {
      setDetails(<UserMain pagination_url="users" />);
    } else if (params.slug[0] == "posts" && params.slug[1] == undefined) {
      setDetails(<PostsMain pagination_url="posts" />);
    } else if (params.slug[0] == "ads" && params.slug[1] == undefined) {
      setDetails(<AdsMain pagination_url="ads" />);
    } else if (params.slug[0] == "comments" && params.slug[1] == undefined) {
      setDetails(<CommentsMain pagination_url="comments" />);
    } else if (params.slug[0] == "categories" && params.slug[1] == undefined) {
      setDetails(<CategoryMain pagination_url="categories" />);
    } else if (params.slug[0] == "default" && params.slug[1] == undefined) {
      setDetails(<DashboardDefault />);
    } else if (
      params.slug[0] == "not-accepted" &&
      params.slug[1] == undefined
    ) {
      setDetails(<PostsNotAccepted pagination_url="not-accepted" />);
    } else if (
      params.slug[0] == "chief-editor" &&
      params.slug[1] == undefined
    ) {
      setDetails(<ChiefEditorsMain pagination_url="chief-editor" />);
    } else if (params.slug[0] == "comments" && params.slug[1] == undefined) {
      setDetails(<CommentsMain pagination_url="comments" />);
    } else if (
      params.slug[0] == "notifications" &&
      params.slug[1] == undefined
    ) {
      setDetails(<NotifsMain pagination_url="notifications" />);
    } else if (params.slug[0] == "ads" && params.slug[1] == undefined) {
      setDetails(<AdsMain pagination_url="ads" />);

      //DETAILS COMPONENTS
    } else if (params.slug[0] == "users" && params.slug[1] != undefined) {
      setDetails(<UserDetails goalId={params.slug[1]} />);
    } else if (params.slug[0] == "categories" && params.slug[1] != undefined) {
      setDetails(<CategoryDetails goalId={params.slug[1]} />);
    } else if (params.slug[0] == "posts" && params.slug[1] != undefined) {
      setDetails(<PostDetailsInDashboard goalId={params.slug[1]} />);
    } else if (
      params.slug[0] == "user-bookmarks" &&
      params.slug[1] != undefined
    ) {
      setDetails(
        <UserBookmarkedPosts
          pagination_url="user-bookmarks"
          goalId={params.slug[1]}
        />
      );
    } else if (params.slug[0] == "comments" && params.slug[1] != undefined) {
      setDetails(
        <CommentsDetails pagination_url="comments" goalId={params.slug[1]} />
      );
    } else if (
      params.slug[0] == "not-accepted" &&
      params.slug[1] != undefined
    ) {
      setDetails(<PostsNotAcceptedDetails goalId={params.slug[1]} />);
      //NEW COMPONENTS
    } else if (params.slug[0] == "new-users") {
      setDetails(<NewUsers pagination_url="new-users" />);
    } else if (params.slug[0] == "on-ads") {
      setDetails(<AdsIsOn pagination_url="on-ads" />);
    } else if (params.slug[0] == "new-category") {
      setDetails(<NewCategory />);
    } else if (params.slug[0] == "new-chief-editor") {
      setDetails(<NewChiefEditor />);
    }
    //USER ALL DETAILS
    else if (params.slug[0] == "user-posts" && params.slug[1] != undefined) {
      setDetails(
        <UserPostsMain pagination_url="user-posts" goalId={params.slug[1]} />
      );
    } else if (
      params.slug[0] == "user-notifications" &&
      params.slug[1] != undefined
    ) {
      setDetails(
        <UserNotifications
          pagination_url="user-notifications"
          goalId={params.slug[1]}
        />
      );
    } else if (
      params.slug[0] == "user-followers" &&
      params.slug[1] != undefined
    ) {
      setDetails(<UserFollowers goalId={params.slug[1]} />);
    } else if (
      params.slug[0] == "user-comments" &&
      params.slug[1] != undefined
    ) {
      setDetails(
        <UserComments goalId={params.slug[1]} pagination_url="user-comments" />
      );
    } else if (
      params.slug[0] == "user-followings" &&
      params.slug[1] != undefined
    ) {
      setDetails(<UserFollowings goalId={params.slug[1]} />);
    } else if (params.slug[0] == "user-ads" && params.slug[1] != undefined) {
      setDetails(<UserAds goalId={params.slug[1]} pagination_url="user-ads" />);
    }
  }, [params.slug[0]]);

  return (
    <div className="flex relative flex-col px-4 md:px-0 md:flex-row justify-between items-start gap-2">
      <div className="relative ">
        <IoMdMenu
          onClick={() => setShowmenu(1)}
          className={
            showMenu == 1
              ? "hidden bg-zinc-200 absolute  w-9 h-9 top-4 right-2 rounded-md cursor-pointer  text-blue-500 hover:text-blue-600 dark:hover:text-blue-600"
              : "flex bg-zinc-200 absolute  w-9 h-9 top-4 right-2 rounded-md cursor-pointer  text-blue-500 hover:text-blue-600 dark:hover:text-blue-600"
          }
        />

        <IoClose
          onClick={() => setShowmenu(-1)}
          className={
            showMenu == 1
              ? "flex bg-zinc-200 absolute w-9 h-9 top-4 right-2 rounded-md cursor-pointer  text-blue-500 hover:text-blue-600 dark:hover:text-blue-600"
              : "hidden bg-zinc-200 absolute w-9 h-9 top-4 right-2 rounded-md cursor-pointer  text-blue-500 hover:text-blue-600 dark:hover:text-blue-600"
          }
        />
      </div>

      <div
        className={
          showMenu == 1
            ? "flex z-10 absolute top-14 right-5  transition-all duration-300 md:hidden"
            : "md:hidden absolute z-10 top-14  -right-96 transition-all duration-300"
        }
      >
        <DashboardCntrl />
      </div>
      <div className="hidden md:flex">
        <DashboardCntrl />
      </div>
      <div className="w-full bg-zinc-50 dark:bg-zinc-800 rounded-md p-3">
        {details}
      </div>
    </div>
  );
};

export default DahsboardManager;
