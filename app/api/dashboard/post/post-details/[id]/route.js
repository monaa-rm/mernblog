export const dynamic = 'force-dynamic'
import Post from "@/model/Post";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {

    try {
    connect();

    const goalPost = await Post.findById(id).select({password: false, token : false});
    if (!goalPost) {
      return NextResponse.json(
        { data: "چنین پستی وجود ندارد" },
        { status: 401 }
      );
    }

    return NextResponse.json({ data: goalPost }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
