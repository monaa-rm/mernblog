export const dynamic = 'force-dynamic'
import User from "@/model/User";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {

    try {
    connect();

    const goalUser = await User.findById(id).select({password: false, token : false});
    if (!goalUser) {
      return NextResponse.json(
        { data: "چنین کاربری وجود ندارد" },
        { status: 401 }
      );
    }

    return NextResponse.json({ data: goalUser }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
