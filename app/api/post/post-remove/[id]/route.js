export const dynamic = 'force-dynamic'
import ChiefEditor from "@/model/ChiefEditor";
import Post from "@/model/Post";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {
  try {
    connect();
    const user_id = req.headers.get("user-id");

    const goalPost = await Post.findById(id);
    //CHECK CHIEF EDITOR POSTS
    const chiefEditorFounded = await ChiefEditor.findOne({
      post_slug: goalPost.slug,
    });
    if (chiefEditorFounded) {
      if (chiefEditorFounded.situation == true) {
        return NextResponse.json(
          {
            data: "پست شما به عنوان پیشنهاد سردبیر انتخاب شده است. فعلا اجازه حذف آن را ندارید",
          },
          { status: 401 }
        );
      }
    }

    if (!goalPost) {
      return NextResponse.json(
        { data: "چنین پستی وجود ندارد" },
        { status: 401 }
      );
    }
    if (user_id != goalPost.author_id) {
      return NextResponse.json(
        { data: "شما اجازه حذف این پست را ندارید" },
        { status: 401 }
      );
    }

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
