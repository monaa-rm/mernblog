export const dynamic = 'force-dynamic'
import User from "@/model/User";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {
  try {
    connect();
    const user_id =await req.headers.get("user-id");
    const goalUser = await User.findById(user_id).select({
      bookmarked_posts: 1,
    });
    const oldBookmarkPosts = goalUser.bookmarked_posts;
    const post_exist = oldBookmarkPosts.includes(id);

    if (post_exist == false) {
      const newBookmark = [...goalUser.bookmarked_posts, id];
      const newData = {
        bookmarked_posts: newBookmark,
      };
      await User.findByIdAndUpdate(user_id, newData, { new: true });
      return NextResponse.json({ data: "پست بوکمارک شد" }, { status: 200 });
    } else {
      const postIndex = oldBookmarkPosts.indexOf(id);
      const new_bookmark = [...oldBookmarkPosts];
      new_bookmark.splice(postIndex, 1);
      const newData = {
        bookmarked_posts: new_bookmark,
      };

      await User.findByIdAndUpdate(user_id, newData, { new: true });
      return NextResponse.json({ data: "پست از حالت بوکمارک خارج شد" }, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
