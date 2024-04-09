export const dynamic = 'force-dynamic'

import Post from "@/model/Post";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    connect();
    const { searchParams } = req.nextUrl;
    const paginate =
      searchParams.get("paginate") == undefined
        ? 10
        : searchParams.get("paginate") < 1
        ? 10
        : searchParams.get("paginate");
    const page_number =
      searchParams.get("page_number") == undefined
        ? 1
        : searchParams.get("page_number") < 1
        ? 1
        : searchParams.get("page_number");



    const posts = await Post.find()
      .sort({ _id: -1 })
      .skip((page_number - 1) * paginate)
      .limit(paginate)
      .select({
        title: 1,
        image: 1,
        updatedAt: 1,
        view_num: 1,
        likes_num: 1,
        published: 1,
        manager_accept: 1,
        time :1,
       
      });
      const all_posts_number =( await Post.find()).length;
    return NextResponse.json({ all_posts_number , posts }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
