export const dynamic = 'force-dynamic'
import ChiefEditor from "@/model/ChiefEditor";
import Post from "@/model/Post";
import User from "@/model/User";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {
  try {
    connect();
    const goalPost = await Post.findById(id);
    if (!goalPost) {
      return NextResponse.json(
        { data: "چنین پستی وجود ندارد" },
        { status: 401 }
      );
    }
    //CHECK CHIEF EDITOR POSTS
    const chiefEditorFounded = await ChiefEditor.findOne({
      post_slug: goalPost.slug,
    });
    if (chiefEditorFounded) {
      if (chiefEditorFounded.situation == true) {
        return NextResponse.json(
          {
            data: "این پست به عنوان پیشنهاد سردبیر انتخاب شده است. فعلا اجازه حذف آن را ندارید",
          },
          { status: 401 }
        );
      }
    }

    await User.updateMany(
      { bookmarked_posts: id }, // یافتن کاربرانی که آیدی پست حذف شده را در آرایه bookmarked_posts خود دارند
      { $pull: { bookmarked_posts: id } } // حذف آیدی پست از آرایه bookmarked_posts هر کاربر
    );

    await Post.findByIdAndRemove(id);
    return NextResponse.json(
      { data: "حذف با موفقیت انجام شد" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
