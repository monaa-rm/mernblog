export const dynamic = 'force-dynamic'
import User from "@/model/User";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req, { params: { slug } }) {
  try {
    connect();
    const new_unfollower_id = await req.headers.get("user-id");
    const goalUser = await User.findOne({ username: slug });
    if (!goalUser) {
      return NextResponse.json(
        { data: "چنین کاربری وجود ندارد" },
        { status: 404 }
      );
    }
    //REMOVE NEW UNFOLLOWER ID FROM GOAL USER
    const goal_user_followers = goalUser.followers;
    const new_followers = goal_user_followers.filter(
      (id) => id !== new_unfollower_id
    );

    const new_followers_data = {
      followers: new_followers,
    };
    await User.findByIdAndUpdate(goalUser._id, new_followers_data, {
      new: true,
    });

    //REMOVE GOAL USER ID FROM NEW UNFOLLOWER
    const user_unfollower = await User.findById(new_unfollower_id);
    if (!user_unfollower) {
      return NextResponse.json(
        { data: "چنین کاربری وجود ندارد" },
        { status: 404 }
      );
    }
    const new_user_followings = user_unfollower.followings;
    const new_followings = new_user_followings.filter(
      (id) => !id.equals(goalUser._id)
    );

    const new_followings_data = {
      followings: new_followings,
    };
    await User.findByIdAndUpdate(new_unfollower_id, new_followings_data, {
      new: true,
    });
    return NextResponse.json({ data: "کاربر دنبال نمیشود" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا" }, { status: 402 });
  }
}
