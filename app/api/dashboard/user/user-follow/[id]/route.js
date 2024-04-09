export const dynamic = 'force-dynamic'
import User from "@/model/User";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {
  try {
    connect();
    const { searchParams } = req.nextUrl;
    const followers = searchParams.get("followers") == 1 ? 1 : 0;
    const followings = searchParams.get("followings") == 1 ? 1 : 0;
    const userFounded = await User.findById(id);
    if (!userFounded) {
      return NextResponse.json(
        { data: "چنین کاربری وجود ندارد " },
        { status: 404 }
      );
    }
    if (followers == 1) {
      const user_followers = userFounded.followers;
     const all_followers = await User.find()
        .where("_id")
        .in(user_followers)
        .select({ blog_name: 1, username: 1 });

      return NextResponse.json({ all_followers }, { status: 200 });
    }
    if (followings == 1) {
      const user_followings = userFounded.followings;
     const all_followings = await User.find()
        .where("_id")
        .in(user_followings)
        .select({ blog_name: 1, username: 1 });


      return NextResponse.json({ all_followings }, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
