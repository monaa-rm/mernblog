export const dynamic = 'force-dynamic'
import Notif from "@/model/Notif";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {
  try {
    connect();
    const { searchParams } = req.nextUrl;
    const paginate =
      searchParams.get("paginate") == undefined
        ? 10
        : searchParams.get("paginate") < 1
        ? 10
        : searchParams.get("paginate");
    const page_number =
      searchParams.get("page_number") == undefined
        ? 1
        : searchParams.get("page_number") < 1
        ? 1
        : searchParams.get("page_number");
    const notif = searchParams.get("notif") == 1 ? 1 : 0;

    const allNotifs = await Notif.aggregate([
      {
        $match: { user_id: id },
      },
      {
        $sort: { _id: -1 },
      },
      {
        $skip: (Number(page_number) - 1) * Number(paginate),
      },
      {
        $limit: Number(paginate),
      },
      {
        $lookup: {
          from: "posts",
          let: { postId: { $toObjectId: "$post_id" } || null }, // تبدیل رشته به ObjectId
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$postId"],
                },
              },
            },
            {
              $project: {
                title: 1,
                slug: 1,
              },
            },
          ],
          as: "notif_post",
        },
      },
      {
        $project: {
          text: 1,
          viewed: 1,
          createdAt: 1,
          updatedAt: 1,

          post_title: { $arrayElemAt: ["$notif_post.title", 0] }, // اضافه کردن نام نویسنده
          post_slug: { $arrayElemAt: ["$notif_post.slug", 0] }, // اضافه کردن نام نویسنده
        },
      },
    ]);
    const all_notifs_number = (await Notif.find({ user_id: id })).length;

    return NextResponse.json({ all_notifs_number, allNotifs }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
