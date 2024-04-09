export const dynamic = 'force-dynamic'
import Notif from "@/model/Notif";
import User from "@/model/User";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req, { params: { slug } }) {
  try {
    connect();
    const new_follower_id = await req.headers.get("user-id");
    const goalUser = await User.findOne({ username: slug });
    if (!goalUser) {
      return NextResponse.json(
        { data: "چنین کاربری وجود ندارد" },
        { status: 404 }
      );
    }
    //ADD NEW FOLLOWER ID TO GOAL USER
    const goal_user_followers = goalUser.followers;
    const if_follower = goal_user_followers.includes(new_follower_id);
    if(if_follower == true) {
      return NextResponse.json({ data: "خطا" }, { status: 402 }); 
    }
    const new_followers = [...goal_user_followers, new_follower_id];
    const new_followers_data = {
      followers: new_followers,
    };
    await User.findByIdAndUpdate(goalUser._id, new_followers_data, {
      new: true,
    });

    //ADD GOAL USER ID TO NEW FOLLOWER
    const user_follower = await User.findById(new_follower_id);
    if (!user_follower) {
      return NextResponse.json(
        { data: "چنین کاربری وجود ندارد" },
        { status: 404 }
      );
    }
    const new_user_followings = user_follower.followings;
    const is_following = new_user_followings.includes(goalUser._id.toString())
    if(is_following == true) {
      return NextResponse.json({ data: "خطا" }, { status: 402 }); 
    }
    const new_followings = [...new_user_followings, goalUser._id.toString()];
    const new_followings_data = {
      followings: new_followings,
    };
    await User.findByIdAndUpdate(new_follower_id, new_followings_data, {
      new: true,
    });
    //SEND NOTIFICATION
    const date = new Date();

    const notif_data = {
      text:  `${user_follower.blog_name} شما را دنبال کرد`,
      post_id: goalUser._id, // اگر objectid نباشد در گرفتن همه نوتیفیکیشن ها با aggregate مشکل ایجاد میشود
      user_id: goalUser._id,
      viewed: false,
      createdAt: date.toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      updatedAt: date.toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
    await Notif.create(notif_data);
    return NextResponse.json({ data: "کاربر دنبال شد" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا" }, { status: 402 });
  }
}
