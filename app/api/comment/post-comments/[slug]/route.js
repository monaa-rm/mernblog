export const dynamic = 'force-dynamic'
import Comment from "@/model/Comment";
import Post from "@/model/Post";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req, { params: { slug } }) {
  try {
    connect();

    const goalPost = await Post.findOne({ slug: slug });
    if (!goalPost) {
      return NextResponse.json(
        { data: "چنین پستی وجود ندارد" },
        { status: 401 }
      );
    }
    const all_comments = await Comment.find({
      published: true,
      post_id: goalPost._id,
      parent_id: "no-parent",
    })
      .sort({ _id: -1 })
      .select({ message: 1, displayname: 1, createdAt: 1 });

    return NextResponse.json({ data: all_comments }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
