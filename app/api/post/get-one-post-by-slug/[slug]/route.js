export const dynamic = 'force-dynamic'
import Category from "@/model/Category";
import Post from "@/model/Post";
import User from "@/model/User";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    connect();
    const { searchParams } = req.nextUrl;
    const blog_slug = searchParams.get("bl");
    const fulldata = searchParams.get("fulldata") == "true" ? true : false;

    //FIND POST
    const goal_post = await Post.findOne({ slug: params.slug }).sort({
      _id: -1,
    });
    //FIND AUTHOR INFORMATION
    const authorData = await User.findById(goal_post.author_id).select({
      blog_name: 1,
      username: 1,
      default_image: 1,
      image: 1,
      details: 1,
      bookmarked_posts: 1,
    });

    if (fulldata != true) {
      const send_data = {
        blog_slug: authorData.username || undefined,
        post_slug: goal_post.slug || undefined,
        short_desc: goal_post.short_desc || undefined,
      };
      return NextResponse.json(
        {
          data: send_data,
        },
        { status: 200 }
      );
    } else {
      if (blog_slug != authorData.username) {
        return NextResponse.json(
          { data: "آدرس وبلاگ اشتباه است" },
          { status: 401 }
        );
      }

      if (!goal_post) {
        return NextResponse.json(
          { data: "چنین پستی وجود ندارد" },
          { status: 401 }
        );
      }
      if (goal_post.published == false || goal_post.manager_accept == false) {
        return NextResponse.json(
          { data: "هنوز پست منتشر نشده است" },
          { status: 401 }
        );
      }
      //UPDATE VIEW NUM
      const view_post_data = {
        view_num: goal_post.view_num + 1,
      };
      await Post.findByIdAndUpdate(goal_post._id, view_post_data, {
        new: true,
      });

      const goalUserData = {
        blog_name: authorData.blog_name,
        username: authorData.username,
        details: authorData.details,
        image:
          authorData.image == "" ? authorData.default_image : authorData.image,
      };
      //FIND CATEGORIES NAME
      const goal_categories = await Category.find()
        .where("_id")
        .in(goal_post.categories)
        .select({ createdAt: false });

      //GET RANDOM POSTS

      const random_posts = await Post.aggregate([
        {
          $match: { published: true, manager_accept: true },
        },
        {
          $sample: { size: 4 },
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
            short_desc: 1,
            _id: false,
            user: { $arrayElemAt: ["$user.username", 0] }, // اضافه کردن نام نویسنده
          },
        },
      ]);

      //GET THIS USER OTHER POSTS
      const user_other_posts = await Post.aggregate([
        {
          $match: {
            slug: { $ne: goal_post.slug },
            author_id: goal_post.author_id,
            published: true,
            manager_accept: true,
          },
        },
        { $sample: { size: 8 } }, // انتخاب پنج پست به صورت رندم
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
            user: { $arrayElemAt: ["$user.username", 0] }, // اضافه کردن نام نویسنده
            commentsCount: { $arrayElemAt: ["$comments.count", 0] }, // تعداد کامنت‌ها
          },
        },
      ]);

      //GOAL DATA
      const sendData = {
        _id: goal_post._id,
        title: goal_post.title,
        slug: goal_post.slug,
        image: goal_post.image,
        short_desc: goal_post.short_desc,
        long_desc: goal_post.long_desc,
        tags: goal_post.tags,
        categories: goal_categories,
        updatedAt: goal_post.updatedAt,
        view_num: goal_post.view_num + 1,
        likes_num: goal_post.likes_num,
        published: goal_post.published,
        manager_accept: goal_post.manager_accept,
        userData: goalUserData,
        random_posts: random_posts,
        user_other_posts: user_other_posts,
      };
      return NextResponse.json({ data: sendData }, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
