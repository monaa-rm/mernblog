export const dynamic = 'force-dynamic'
import Notif from "@/model/Notif";
import User from "@/model/User";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {
  try {
    connect();

    const goalUser = await User.findById(id);
    if (!goalUser) {
      return NextResponse.json(
        { data: "چنین کاربری وجود ندارد" },
        { status: 401 }
      );
    }
    //DELETE USER ID FROM OTHER USERS  FOLLOWERS

    const followersToUpdate = await User.find({ followers: id });

    followersToUpdate.forEach(async (user) => {
      let user_followers = user.followers;
      user_followers = user_followers.filter((idf) => idf.toString() != id);

      const update_follow = {
        followers: user_followers,
      };
      await User.findByIdAndUpdate(user._id, update_follow, { new: true });
    });
    //DELETE USER ID FROM OTHER USERS FOLLOWINGS

    const followingsToUpdate = await User.find({ followings: id });

    followingsToUpdate.forEach(async (user) => {
      let user_followings = user.followings;
      user_followings = user_followings.filter((idf) => idf.toString() != id);

      const update_follow = {
        followings: user_followings,
      };
      await User.findByIdAndUpdate(user._id, update_follow, { new: true });
    });

    //DELETE ALL THIS USER NOTIFS

    await Notif.deleteMany({ user_id: id });

    await User.findByIdAndRemove(id);

    return NextResponse.json(
      { data: "حذف با موفقیت انجام شد" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
