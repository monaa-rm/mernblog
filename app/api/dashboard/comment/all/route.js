export const dynamic = 'force-dynamic'
import Comment from "@/model/Comment";
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



    const comments = await Comment.find()
      .sort({ _id: -1 })
      .skip((page_number - 1) * paginate)
      .limit(paginate)
      .select({
        phone: 1,
        published: 1,
        viewed: 1,
        createdAt: 1,
        message: 1
      });
      const all_comments_number =( await Comment.find()).length;
    return NextResponse.json({ all_comments_number , comments }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
