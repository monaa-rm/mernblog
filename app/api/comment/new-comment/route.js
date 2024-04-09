export const dynamic = 'force-dynamic'
import Comment from "@/model/Comment";
import Post from "@/model/Post";
import User from "@/model/User";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    connect();
    const inputData = await req.json();
    const user_id = req.headers.get("user-id");
    //CHECK USER IS ACTIVE OR NOT
    const userFounded = await User.findById(user_id);
    if (userFounded.user_is_active != true) {
      return NextResponse.json(
        { data: "لطفا شماره تماس خود را از طریق تنظیمات تایید کنید" },
        { status: 403 }
      );
    }



    if (inputData.message.length < 8) {
      return NextResponse.json(
        { data: " دیدگاه شما باید بیشتر از 8 کارکتر باشد " },
        { status: 402 }
      );
    }
    const thePost = await Post.findOne({ slug: inputData.post_slug });
    const theBlog = await User.findOne({ username: inputData.blog_slug });

    //  CREATING COMMENT
    const date = new Date();

    const commentFullData = {
      message: inputData.message,
      phone: userFounded.phone,
      displayname: userFounded.displayname,
      parent_id: inputData.parent_id,
      post_id: thePost._id,
      blog_id: theBlog._id,
      createdAt: date.toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      updatedAt: date.toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
    await Comment.create(commentFullData);

    return NextResponse.json(
      { message: " دیدگاه با موفقیت ثبت شد" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا در ثبت دیدگاه" }, { status: 401 });
  }
}
