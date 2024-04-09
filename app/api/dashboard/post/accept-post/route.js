export const dynamic = 'force-dynamic'
import Notif from "@/model/Notif";
import Post from "@/model/Post";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    connect();
    const inputData = await req.json();
    const post_id = inputData.post_id;
    const user_id = inputData.user_id;
    const postFullData = {
      manager_accept: true,
    };
    await Post.findByIdAndUpdate(post_id, postFullData, { new: true });

    //  CREATING NOTIF
    const date = new Date();

    const newNotif = {
      text: "پست شما با موفقیت منتشر شد",
      user_id: user_id,
      post_id: post_id,
      viewed: false,
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
    await Notif.create(newNotif);
    return NextResponse.json(
      { message: " پست با موفقیت تایید شد" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا در تایید پست" }, { status: 401 });
  }
}
