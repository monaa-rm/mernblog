export const dynamic = 'force-dynamic'
import Post from "@/model/Post";
import User from "@/model/User";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {
  try {
    connect();

    //PAGINATION
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

    const goalUser = await User.findById(id);
    if (!goalUser) {
      return NextResponse.json(
        { data: "چنین کاربری وجود ندارد" },
        { status: 401 }
      );
    }
    const bookmarkedpostsIds = goalUser.bookmarked_posts;

    const all_user_posts = await Post.find()
      .where("_id")
      .in(bookmarkedpostsIds)
      .skip((page_number - 1) * paginate)
      .limit(paginate)
      .select({
        title: 1,
        slug: 1,
        image: 1,
        updatedAt: 1,
        view_num: 1,
        likes_num: 1,
        time: 1,
        published: 1,
        manager_accept: 1,
      });
    const all_user_posts_num = (
      await Post.find().where("_id").in(bookmarkedpostsIds)
    ).length;
    return NextResponse.json(
      { all_user_posts_num, all_user_posts },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
