export const dynamic = 'force-dynamic'
import Notif from "@/model/Notif";
import Post from "@/model/Post";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function POST(req) {
  const inputData = await req.json();
  try {
    connect();
    const postFounded = await Post.findOne({ slug: inputData.postSlug }).select(
      {
        title: 1,
        author_id: 1,
      }
    );
    if (!postFounded) {
        return  NextResponse.json({ data: "پست یافت نشد" }, { status: 404 });
    }
    const date = new Date();

    const notifFullData = {
      text: "پست شما به عنوان پیشنهاد سردبیر انتخاب شد و در صفحه اصلی سایت نمایش داده میشود",
      post_id: postFounded._id.toString(),
      user_id: postFounded.author_id,
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
    await Notif.create(notifFullData);
   return NextResponse.json({ data: "نوتیفیکیشن ارسال شد" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا" }, { status: 401 });
  }
}
