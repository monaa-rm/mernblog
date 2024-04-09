export const dynamic = 'force-dynamic'
import Post from "@/model/Post";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    connect();

    const { searchParams } = req.nextUrl;
    const new_posts = searchParams.get("new_posts") == 10 ? 10 : 0;
    const top_view_number = searchParams.get("top_view_number") == 1 ? 1 : 0;
    const top_like_number = searchParams.get("top_like_number") == 1 ? 1 : 0;
    const top_comment_number =
      searchParams.get("top_comment_number") == 1 ? 1 : 0;

    if (new_posts == 10) {
      const postsWithAuthors = await Post.aggregate([
        {
          $match: { published: true, manager_accept: true },
        },
        {
          $sort: { _id: -1 },
        },
        {
          $limit: 10,
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
            view_num: 1,
            time: 1,
            published: 1,
            manager_accept: 1,
            user: { $arrayElemAt: ["$user.username", 0] }, // اضافه کردن نام نویسنده
            commentsCount: { $arrayElemAt: ["$comments.count", 0] }, // تعداد کامنت‌ها
          },
        },
      ]);
      return NextResponse.json({ posts: postsWithAuthors }, { status: 200 });
    } else if (top_view_number == 1) {
      const postsWithAuthors = await Post.aggregate([
        {
          $match: { published: true, manager_accept: true },
        },
        {
          $sort: { view_num: -1 },
        },
        {
          $limit: 3,
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
            likes_num: 1,
            view_num: 1,
            time: 1,
            published: 1,
            manager_accept: 1,
            user: { $arrayElemAt: ["$user.username", 0] }, // اضافه کردن نام نویسنده
            commentsCount: { $arrayElemAt: ["$comments.count", 0] }, // تعداد کامنت‌ها
          },
        },
      ]);
      return NextResponse.json({ posts: postsWithAuthors }, { status: 200 });
    } else if (top_like_number == 1) {
      const postsWithAuthors = await Post.aggregate([
        {
          $match: { published: true, manager_accept: true },
        },
        {
          $sort: { likes_num: -1 },
        },
        {
          $limit: 3,
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
            likes_num: 1,
            view_num: 1,
            time: 1,
            published: 1,
            manager_accept: 1,
            user: { $arrayElemAt: ["$user.username", 0] }, // اضافه کردن نام نویسنده
            commentsCount: { $arrayElemAt: ["$comments.count", 0] }, // تعداد کامنت‌ها
          },
        },
      ]);
      return NextResponse.json({ posts: postsWithAuthors }, { status: 200 });
    } else if (top_comment_number == 1) {
      const postsWithAuthors = await Post.aggregate([
        {
          $match: { published: true, manager_accept: true },
        },
        {
          $lookup: {
            from: "users",
            let: { authorId: { $toObjectId: "$author_id" } },
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
                  username: 1,
                  _id: false,
                },
              },
            ],
            as: "user",
          },
        },
        {
          $lookup: {
            from: "comments",
            let: { postId: { $toString: "$_id" } },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$post_id", "$$postId"] },
                  published: true,
                },
              },
              {
                $group: {
                  _id: "$post_id",
                  count: { $sum: 1 },
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
            likes_num: 1,
            view_num: 1,
            time: 1,
            published: 1,
            manager_accept: 1,
            user: { $arrayElemAt: ["$user.username", 0] },
            commentsCount: { $arrayElemAt: ["$comments.count", 0] },
          },
        },
        {
          $sort: { commentsCount: -1 }, // مرتب‌سازی بر اساس تعداد کامنت‌ها
        },
        {
          $limit: 10, // نمایش تا سه پست با بیشترین تعداد کامنت
        },
      ]);

      console.log("postsWithAuthors", postsWithAuthors);
      return NextResponse.json({ posts: postsWithAuthors }, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
