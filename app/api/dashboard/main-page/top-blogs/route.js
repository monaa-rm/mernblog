export const dynamic = 'force-dynamic'
import User from "@/model/User";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    connect();

    const users = await User.aggregate([
      {
        $project: {
          username: 1,
          followers: 1,
          details: 1,
          blog_name: 1,
          image: {
            $cond: {
              if: { $ne: ["$image", ""] }, // بررسی آیا image خالی نیست
              then: "$image", // اگر image خالی نباشد، مقدار image را بازگردان
              else: "$default_image", // در غیر این صورت مقدار default_image را بازگردان
            },
          },
          followersCount: { $size: "$followers" }, // افزودن فیلد جدید برای تعداد فالوئرها
        },
      },
      {
        $sort: { followersCount: -1 }, // مرتب‌سازی بر اساس تعداد فالوئرها
      },
      { $limit: 10 },
    ]);

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
