export const dynamic = 'force-dynamic'
import User from "@/model/User";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req) {
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
    const new_user =
      searchParams.get("new_user") == undefined
        ? 0
        : searchParams.get("new_user") == 1
        ? 1
        :0;


if(new_user == 0) {
  return NextResponse.json({ data: "خطای کوئری " }, { status: 401 });
}
    const users = await User.find({viewed : false})
      .sort({ _id: -1 })
      .skip((page_number - 1) * paginate)
      .limit(paginate)
      .select({
        blog_name: 1,
        username: 1,
        phone: 1,
        viewed: 1,
        user_is_active: 1,
      });
      const all_users_number =( await User.find({viewed : false})).length;
    return NextResponse.json({ all_users_number , users }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
