export const dynamic = 'force-dynamic'
import Post from "@/model/Post";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {
  try {
    connect();
    const user_id = req.headers.get("user-id");
    const goalPost = await Post.findById(id);
    if (!goalPost) {
      return NextResponse.json(
        { data: "چنین پستی ای وجود ندارد" },
        { status: 401 }
      );
    }
    if(goalPost.author_id !=  user_id){
      return NextResponse.json(
        { data: "شما اجازه دسترسی به این محتوا را ندارید" },
        { status: 403 }
      );
    }

    return NextResponse.json({ data: goalPost }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
