export const dynamic = 'force-dynamic'

import User from "@/model/User";
import connect from "@/utils/connect";
import mongoose, { Types } from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {
  connect();
  try {
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

    /////////////////////////////////////////////////////////////////////

    const objectId = new mongoose.Types.ObjectId(id);
    const all_comments = await User.aggregate([
      {
        $match: { _id: objectId },
      },

      {
        $lookup: {
          from: "comments",
          let: { userPhone: "$phone" }, // مقدار فیلد phone کاربر
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$phone", "$$userPhone"] }, // مقایسه فیلد phone کاربر با فیلد phone کامنت
                published: true, // بررسی مقدار فیلد published کامنت
              },
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
          ],
          as: "user_comments",
        },
      },
    ]);
    /////////////////////////////////////////////////////////////////////
    const all_comments_number = await User.aggregate([
      {
        $match: { _id: objectId },
      },

      {
        $lookup: {
          from: "comments",
          let: { userPhone: "$phone" }, // مقدار فیلد phone کاربر
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$phone", "$$userPhone"] }, // مقایسه فیلد phone کاربر با فیلد phone کامنت
                published: true, // بررسی مقدار فیلد published کامنت
              },
            },
          ],
          as: "user_comments",
        },
      },
    ]);

    return NextResponse.json(
      { all_comments_number : all_comments_number[0].user_comments.length, all_comments: all_comments[0].user_comments },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
