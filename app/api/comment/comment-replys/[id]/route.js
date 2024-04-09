
export const dynamic = 'force-dynamic'
import Comment from "@/model/Comment";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {
  try {
    connect();

    const all_cm_replys = await Comment.find({
      published: true,
      parent_id: id,
    }).sort({ _id: 1 });

    return NextResponse.json({ data: all_cm_replys }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
