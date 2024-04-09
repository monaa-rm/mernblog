export const dynamic = 'force-dynamic'
import User from "@/model/User";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    connect();
    const user_id = await req.headers.get("user-id");
    const goalUser = await User.findById(user_id);
    if (!goalUser) {
      return NextResponse.json(
        { data: "چنین کاربری وجود ندارد" },
        { status: 404 }
      );
    }

    const user_followers = goalUser.followers;
    const goal_user_followers = await User.find()
      .where("_id")
      .in(user_followers)
      .select({ username: 1, blog_name: 1 });

    return NextResponse.json({ data: goal_user_followers }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا" }, { status: 402 });
  }
}
