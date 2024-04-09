export const dynamic = 'force-dynamic'
import Comment from "@/model/Comment";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {

    try {
    connect();

    const goalComment = await Comment.findById(id);
    if (!goalComment) {
        return NextResponse.json(
            { data: "چنین دیدگاهی وجود ندارد" },
            { status: 401 }
            );
        }
        
      await Comment.findByIdAndRemove(id);
    return NextResponse.json({ data: "حذف با موفقیت انجام شد" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
