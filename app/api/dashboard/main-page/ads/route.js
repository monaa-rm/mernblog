export const dynamic = 'force-dynamic'
import Advertise from "@/model/Advertise";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    connect();
    const user_id = req.headers.get("user-id");

    const all_posts_ads = await Advertise.aggregate([
      { $match: { published: true, type: "post" } },
      { $limit: 5 },
      {
        $lookup: {
          from: "posts",
          let: { postId: { $toObjectId: "$post_id" } }, // تبدیل ObjectId به رشته
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
                _id: 0,
              },
            },
          ],
          as: "post-details",
        },
      },
      {
        $project: {
          link: 1,
          post_title: { $arrayElemAt: ["$post-details.title", 0] },
        },
      },
    ]);

    const all_banners_ads = await Advertise.find({
      published: true,
      type: "banner",
    })
      .select({ link: 1, image: 1, image_alt: 1 })
      .limit(6);

    return NextResponse.json(
      { all_posts_ads, all_banners_ads },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا" }, { status: 401 });
  }
}
