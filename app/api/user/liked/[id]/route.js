export const dynamic = 'force-dynamic'
import Notif from "@/model/Notif";
import Post from "@/model/Post";
import User from "@/model/User";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {
  try {
    connect();
    const user_id = await req.headers.get("user-id");
    const goalUser = await User.findById(user_id).select({
      liked_posts: 1,
      username:1
    });
    const oldLikedPosts = goalUser.liked_posts;
    const post_exist = oldLikedPosts.includes(id);

    if (post_exist == false) {
      const newLike = [...goalUser.liked_posts, id];
      const newData = {
        liked_posts: newLike,
      };
      await User.findByIdAndUpdate(user_id, newData, { new: true });

      // ENCREASE POST LIKE NUMBER
      const goalPost = await Post.findById(id).select({ likes_num: 1, author_id : 1});
      const new_likes_num = {
        likes_num: goalPost.likes_num + 1,
      };
      
      const date = new Date();
      const notifData = {
        text: `پست شما توسط ${goalUser.username} لایک شد`,
        post_id: id,
        user_id: goalPost.author_id,
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
      await Notif.create(notifData);
      await Post.findByIdAndUpdate(id, new_likes_num, { new: true });

      return NextResponse.json(
        { message: "پست لایک شد", data: new_likes_num.likes_num },
        { status: 200 }
      );
    } else {
      const postIndex = oldLikedPosts.indexOf(id);
      const new_like = [...oldLikedPosts];
      new_like.splice(postIndex, 1);
      const newData = {
        liked_posts: new_like,
      };
      // DECREASE POST LIKE NUMBER
      const goalPost = await Post.findById(id).select({ likes_num: 1 });
      const new_likes_num = {
        likes_num: goalPost.likes_num - 1,
      };
      await Post.findByIdAndUpdate(id, new_likes_num, { new: true });

      await User.findByIdAndUpdate(user_id, newData, { new: true });
      return NextResponse.json(
        { message: "پست آنلایک شد", data: new_likes_num.likes_num },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
