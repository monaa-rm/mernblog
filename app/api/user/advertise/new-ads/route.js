export const dynamic = 'force-dynamic'
import Advertise from "@/model/Advertise";
import Post from "@/model/Post";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    connect();
    const reqBody = await req.json();
    const user_id = req.headers.get("user-id");

    const date = new Date();

    // FILTERS

    if (reqBody.duration.length < 1) {
      return NextResponse.json(
        { data: "مدت زمان تبلیغ مشخص نشده است" },
        { status: 401 }
      );
    }
    if (reqBody.image.length < 1) {
      return NextResponse.json(
        { data: "تصویر بنر تبلیغات تعیین نشده است" },
        { status: 401 }
      );
    }
    if (reqBody.image_alt.length < 1) {
      return NextResponse.json(
        { data: "آلت بنر تبلیغات تعیین نشده است" },
        { status: 401 }
      );
    }

    if (reqBody.type == "post") {
      const link_split = reqBody.link.split("/");
      if (link_split.length != 6) {
        return NextResponse.json(
          { data: "لطفا آدرس پست را درست وارد کنید..." },
          { status: 404 }
        );
      }
      const post_slug = link_split[5];
      const postFounded = await Post.findOne({ slug: post_slug });
      if (!postFounded) {
        return NextResponse.json(
          { data: "چنین پستی وجود ندارد..." },
          { status: 404 }
        );
      }
      const new_data = {
        type: "post",
        image: "no-img",
        image_alt: "no-img",
        link: reqBody.link,
        duration: reqBody.duration,
        post_id: postFounded._id,
        user_id,
        createdAt: date.toLocaleDateString("fa-IR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };
      await Advertise.create(new_data);
      return NextResponse.json(
        { data: "تبلیغ با موفقیت ایجاد شد..." },
        { status: 200 }
      );
    } else if (reqBody.type == "banner") {
      const new_data = {
        type: "banner",
        image: reqBody.image,
        image_alt: reqBody.image_alt,
        link: reqBody.link,
        duration: reqBody.duration,
        post_id: "no-post",
        user_id,
        createdAt: date.toLocaleDateString("fa-IR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };
      await Advertise.create(new_data);
      return NextResponse.json(
        { data: "تبلیغ با موفقیت ایجاد شد..." },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { data: "نوع تبلیغ اشتباه است" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا در ایجاد تبلیغ" }, { status: 401 });
  }
}
