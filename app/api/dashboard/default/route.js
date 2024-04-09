export const dynamic = 'force-dynamic'
import Advertise from "@/model/Advertise";
import Comment from "@/model/Comment";
import Post from "@/model/Post";
import User from "@/model/User";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    connect();
 

    const new_users = await User.find({ viewed: false });
    const new_not_accepted_posts = await Post.find({
      published: true,
      manager_accept: false,
    });
    const new_comments = await Comment.find({ viewed: false });
    const new_ads = await Advertise.find({ viewed: false });

    const send_data = {
      new_users: new_users.length || 0,
      new_not_accepted_posts:  new_not_accepted_posts.length || 0,
      new_comments: new_comments.length || 0,
      new_ads: new_ads.length || 0,
    };

    return NextResponse.json({ data:send_data}, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
