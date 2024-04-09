export const dynamic = 'force-dynamic'
import Post from "@/model/Post";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";
import Category from "@/model/Category";
export async function GET(req, { params: { slug } }) {
  try {
    connect();
    const { searchParams } = req.nextUrl;
    const fulldata = searchParams.get("fulldata") == "true" ? true : false;
    const goal_category = await Category.findOne({ slug });

    if (!goal_category) {
      return NextResponse.json({ data: "دسته بندی یافت نشد" }, { status: 401 });
    }
    const cat_id = goal_category._id;

    if (fulldata == true) {
      const postsWithCategories = await Post.aggregate([
        {
          $match: { published: true, manager_accept: true },
        },
        {
          $lookup: {
            from: "categories", // نام مجموعه داده دسته‌بندی‌ها
            let: {
              categoryIds: {
                $map: {
                  input: "$categories",
                  as: "categoryId",
                  in: { $toObjectId: "$$categoryId" },
                },
              },
            }, // تبدیل رشته‌های آیدی به ObjectId
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ["$_id", "$$categoryIds"], // بازیابی دسته‌بندی‌هایی که آی‌دی آن‌ها در آرایه categories وجود دارد
                  },
                },
              },
            ],
            as: "categoriesData", // نامی که به دسته‌بندی‌های بازیابی شده اختصاص داده می‌شود
          },
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
                  _id: 0,
                },
              },
            ],
            as: "authorData",
          },
        },
        {
          $lookup: {
            from: "comments",
            localField: "_id",
            foreignField: "post_id",
            as: "comments",
          },
        },
        {
          $match: {
            "categoriesData._id": cat_id, // قرار دادن آیدی دسته بندی مورد نظر در اینجا
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
            author: { $arrayElemAt: ["$authorData.username", 0] },
            commentsCount: { $size: "$comments" },
          },
        },
      ]);

      return NextResponse.json(
        { data: postsWithCategories, goal_category },
        { status: 200 }
      );
    } else {
      const categoryData = await Category.findOne({ slug });
      return NextResponse.json({ data: categoryData }, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
