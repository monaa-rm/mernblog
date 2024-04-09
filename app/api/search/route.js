export const dynamic = 'force-dynamic'
import Post from "@/model/Post";
import User from "@/model/User";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    connect();
    const { query, search_in } = await req.json();
    if (search_in == "posts") {
      const postsWithQuery = await Post.aggregate([
        {
          $match: {
            $or: [
              { title: { $regex: query, $options: "i" } },
              { short_desc: { $regex: query, $options: "i" } },
            ],
          },
        },
        {
          $lookup: {
            from: "users",
            let: { authorId: { $toObjectId: "$author_id" } }, // تبدیل رشته به ObjectId
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$authorId"],
                  },
                },
              },
              {
                $project: {
                  username: 1, // یا دیگر فیلدهای مورد نظر از مدل User
                  _id: false,
                },
              },
            ],
            as: "user",
          },
        },
        {
          $project: {
            title: 1,
            slug: 1,
            image: 1,
            author_id: 1,
            user: { $arrayElemAt: ["$user.username", 0] }, // اضافه کردن نام نویسنده
          },
        },
        {
          $limit: 5,
        },
        {
          $sort: { _id: -1 },
        },
      ]);
      return NextResponse.json({ data: postsWithQuery }, { status: 200 });
    } else if (search_in == "users") {
      const postsWithQuery = await User.aggregate([
        {
          $match: {
            $or: [
              { blog_name: { $regex: query, $options: "i" } },
              { details: { $regex: query, $options: "i" } },
            ],
          },
        },
        {
          $project: {
            blog_name: 1,
            username: 1,
            image: {
              $cond: {
                if: { $ne: ["$image", ""] },
                then: "$image",
                else: "$default_image",
              },
            },
          },
        },
        {
          $limit: 5,
        },
        {
          $sort: { _id: -1 },
        },
      ]);

      return NextResponse.json({ data: postsWithQuery }, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا در جستجو..." }, { status: 401 });
  }
}
