export const dynamic = 'force-dynamic'
import Post from "@/model/Post";
import User from "@/model/User";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";
import Jwt from "jsonwebtoken";
export async function GET(req, { params: { slug } }) {
  try {
    connect();
    const token = (await req.headers.get("token")) || undefined;
    const { searchParams } = req.nextUrl;
    const fulldata = searchParams.get("fulldata") == "true" ? true : false;
    if (fulldata == true) {
      const goalUser = await User.findOne({ username: slug }).select({
        blog_name: 1,
        details: 1,
        image: 1,
        default_image: 1,
        followings: 1,
        followers: 1,
      });
      if (!goalUser) {
        return NextResponse.json(
          { data: "چنین کاربری وجود ندارد" },
          { status: 401 }
        );
      }

      //////////////////////////////////////
      const userPosts = await Post.aggregate([
        {
          $match: {
            author_id: goalUser._id.toString(),
            published: true,
            manager_accept: true,
          },
        },
        {
          $sort: { _id: -1 },
        },
        {
          $lookup: {
            from: "comments",

            let: { postId: { $toString: "$_id" } }, // تبدیل ObjectId به رشته
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$post_id", "$$postId"],
                  },
                },
              },
              {
                $match: { published: true }, // فقط کامنت‌هایی که published برابر با true است
              },
              {
                $group: {
                  _id: null,
                  count: { $sum: 1 }, // محاسبه تعداد کامنت‌ها
                },
              },
            ],
            as: "comments",
          },
        },
        {
          $project: {
            title: 1,
            slug: 1,
            image: 1,
            short_desc: 1,
            updatedAt: 1,
            likes_num: 1,
            time: 1,
            commentsCount: { $arrayElemAt: ["$comments.count", 0] }, // تعداد کامنت‌ها
          },
        },
      ]);
      //////////////////////////////////////////

      //FOLLOW BUTTON SITUATION
      let follow_button_situation = "not_logged";

      if (token != undefined) {
        try {
          const payload = Jwt.verify(token, process.env.TOKEN_SECRET);
          const goal_id = payload._id;
          if (goal_id == goalUser._id.toString()) {
            follow_button_situation = "setting";
          } else {
            const requester_user_data = await User.findById(goal_id);
            const my_following = requester_user_data.followings;
            const result = my_following.includes(goalUser._id);
            if (result == true) {
              follow_button_situation = "followed";
            } else {
              follow_button_situation = "not_followed";
            }
          }
          const user_not_logged_Data = {
            blog_name: goalUser.blog_name,
            image:
              goalUser.image == "" ? goalUser.default_image : goalUser.image,
            details: goalUser.details,
            posts: userPosts,
            followings_number: goalUser.followings.length,
            followers_number: goalUser.followers.length,
            follow_button_situation: follow_button_situation,
          };
          return NextResponse.json(
            { data: user_not_logged_Data },
            { status: 200 }
          );
        } catch (error) {
          const user_not_logged_Data = {
            blog_name: goalUser.blog_name,
            image:
              goalUser.image == "" ? goalUser.default_image : goalUser.image,
            details: goalUser.details,
            posts: userPosts,
            followings_number: goalUser.followings.length,
            followers_number: goalUser.followers.length,
            follow_button_situation: follow_button_situation,
          };
          return NextResponse.json(
            { data: user_not_logged_Data },
            { status: 200 }
          );
        }
      }
    } else {
      const goalUser = await User.findOne({ username: slug }).select({
        blog_name: 1,
        details: 1,
      });
      return NextResponse.json({ data: goalUser }, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
