export const dynamic = 'force-dynamic'
import ChiefEditor from "@/model/ChiefEditor";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    connect();


    const chiefEditorPosts = await ChiefEditor.aggregate([
      { $match: { situation: true } },
      { $sort: { number: 1 } },
      {
        $lookup: {
          from: "posts",
          foreignField: "slug",
          localField: "post_slug",
          as: "chief_editor_posts",
        },
      },
      {
        $project: {
          _id: 0,
          post_slug: 1,
          blog_slug: 1,
          number: 1,
          title: { $arrayElemAt: ["$chief_editor_posts.title", 0] },
          image: { $arrayElemAt: ["$chief_editor_posts.image", 0] },
        },
      },
    ]);

    return NextResponse.json({ data: chiefEditorPosts }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
