export const dynamic = 'force-dynamic'

import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const path = req.nextUrl.pathname;
  // NORMAL USER MIDDLEWARE
  if (
    path == "/api/user/user-setting-default-items" ||
    path == "/api/user/update" ||
    path == "/api/user/update-user-image" ||
    path == "/api/user/sms/send-phone-confirm-sms" ||
    path == "/api/user/sms/confirm-phone-number-sms" ||
    path == "/api/post/new-post/upload-image" ||
    path == "/api/post/new-post/create-post" ||
    path == "/api/post/all-posts" ||
    path == "/api/post/update-post" ||
    path == "/api/user/user-notifs" ||
    path == "/api/comment/new-comment" ||
    path == "/api/user/advertise/new-ads" ||
    path == "/api/user/advertise/my-ads" ||
    path.startsWith("/api/post/post-details") ||
    path.startsWith("/api/post/post-remove") ||
    path.startsWith("/api/user/bookmark") ||
    path.startsWith("/api/post/post-is-bookmark") ||
    path.startsWith("/api/user/liked") ||
    path.startsWith("/api/post/post-is-liked") ||
    path.startsWith("/api/user/notif-checker") ||
    path.startsWith("/api/user/follow/add-follower") ||
    path.startsWith("/api/user/follow/my-followings") ||
    path.startsWith("/api/user/follow/my-followers") ||
    path.startsWith("/api/user/follow/unfollow")
  ) {
    try {
      const token = await req.headers.get("token");
      if (!token) {
        return NextResponse.json({ data: "لطفا لاگین کنید" }, { status: 401 });
      }
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.TOKEN_SECRET)
      );

      const idResponse = await fetch(
        `${process.env.SERVER_URL}/api/user/id-to-user/${payload._id}`,
        { headers: { token: token } }
      );
      if (idResponse.status != 200) {
        return NextResponse.json(
          { data: "چنین کاربری وجود ندارد" },
          { status: 401 }
        );
      }

      const response = NextResponse.next();
      response.headers.append("user-id", payload._id);
      return response;
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "عدم دسترسی" }, { status: 402 });
    }
  }

  //ADMIN MIDDLEWARE

  if (
    path.startsWith("/api/dashboard/user/user-details") ||
    path.startsWith("/api/dashboard/category/category-details") ||
    path.startsWith("/api/dashboard/category/category-remove") ||
    path.startsWith("/api/dashboard/user/remove-user") ||
    path.startsWith("/api/dashboard/post/post-details") ||
    path.startsWith("/api/dashboard/post/post-remove") ||
    path.startsWith("/api/dashboard/post/user-posts") ||
    path.startsWith("/api/dashboard/user/user-follow") ||
    path.startsWith("/api/dashboard/user/user-notifs") ||
    path.startsWith("/api/dashboard/user/user-bookmarked-posts") ||
    path.startsWith("/api/dashboard/user/user-ads") ||
    path.startsWith("/api/dashboard/chief-editor/remove-chief-editor") ||
    path.startsWith("/api/dashboard/comment/comment-details") ||
    path.startsWith("/api/dashboard/comment/comment-remove") ||
    path.startsWith("/api/dashboard/ads/remove-ads") ||
    path == "/api/dashboard/user/all" ||
    path == "/api/dashboard/user/update-user-data" ||
    path == "/api/dashboard/user/update-user-image" ||
    path == "/api/dashboard/user/new-users" ||
    path == "/api/dashboard/category/new-category" ||
    path == "/api/dashboard/category/update" ||
    path == "/api/dashboard/post/all" ||
    path == "/api/dashboard/post/new-post/upload-image" ||
    path == "/api/dashboard/post/sended-to-accept" ||
    path == "/api/dashboard/post/update-post-data" ||
    path == "/dashboard/accept-post" ||
    path == "/api/dashboard/notifs/all" ||
    path == "/api/dashboard/chief-editor/all" ||
    path == "/api/dashboard/chief-editor/new-chief-editor" ||
    path == "/api/dashboard/chief-editor/update" ||
    path == "/api/dashboard/posts-not-accepted" ||
    path == "/api/dashboard/user/chief-editor-notif-create" ||
    path == "/api/dashboard/comment/all" ||
    path == "/api/dashboard/comment/update" ||
    path == "/api/dashboard/ads/all" ||
    path == "/api/dashboard/ads/upload-image" ||
    path == "/api/dashboard/ads/update"
  ) {
    try {
      const token = req.headers.get("token");
      if (!token) {
        return NextResponse.json({ data: "لطفا لاگین کنید" }, { status: 401 });
      }
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.TOKEN_SECRET)
      );

      const idResponse = await fetch(
        `${process.env.SERVER_URL}/api/user/id-to-user/${payload._id}`,
        { headers: { token: token } }
      );
      if (idResponse.status != 200) {
        return NextResponse.json(
          { data: "چنین کاربری وجود ندارد" },
          { status: 401 }
        );
      }
      const userFullData = await idResponse.json();
      if (
        path == "/api/dashboard/ads/all" ||
        path == "/api/dashboard/ads/upload-image" ||
        path == "/api/dashboard/ads/update" ||
        path.startsWith("/api/dashboard/ads/remove-ads")
      ){
        if (userFullData.data.role != 1 && userFullData.data.role != 2) {
          return NextResponse.json(
            { data: "دسترسی فقط برای ادمین و ادیتور آزاد است" },
            { status: 401 }
          );
        }
      const response = NextResponse.next();
      response.headers.append("user-id", payload._id);
      return response;
      }else{
        if (userFullData.data.role != 1) {
          return NextResponse.json(
            { data: "دسترسی فقط برای ادمین آزاد است" },
            { status: 401 }
          );
        }
      const response = NextResponse.next();
      response.headers.append("user-id", payload._id);
      return response;
      }
      
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "عدم دسترسی" }, { status: 402 });
    }
  }
}
