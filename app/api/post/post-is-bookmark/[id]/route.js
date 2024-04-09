export const dynamic = 'force-dynamic'
import User from "@/model/User";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {
  try {
    connect();
    const user_id = await req.headers.get("user-id");
    const goalUser = await User.findById(user_id).select({
      bookmarked_posts: 1,
    });
    const oldBookmarkPosts = goalUser.bookmarked_posts;
    const post_exist = oldBookmarkPosts.includes(id);

    if (post_exist == false) {
      return NextResponse.json({ bookmarked: post_exist  }, { status: 200 });
    } else {
      return NextResponse.json(
        { bookmarked: post_exist },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
