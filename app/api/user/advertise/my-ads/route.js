export const dynamic = 'force-dynamic'
import Advertise from "@/model/Advertise";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    connect();
    const user_id = req.headers.get("user-id");

    const user_ads = await Advertise.find({ user_id })
      .sort({ _id: -1 })
      .select({ viewed: false, post_id: false, user_id: false , _id: false });

    return NextResponse.json(
      { data:user_ads},
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا" }, { status: 401 });
  }
}
