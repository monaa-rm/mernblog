export const dynamic = 'force-dynamic'
import Post from "@/model/Post";
import User from "@/model/User";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {
  try {
    connect();
    const user_id = await req.headers.get("user-id");
    const goalUser = await User.findById(user_id).select({
      liked_posts: 1,
    });
    const oldLikePosts = goalUser.liked_posts;
    const post_exist = oldLikePosts.includes(id);
    const goalPost = await Post.findById(id).select({ likes_num: 1 });

    if (post_exist == false) {
      return NextResponse.json(
        { liked: post_exist, like_num: goalPost.likes_num },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { liked: post_exist, like_num: goalPost.likes_num },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
