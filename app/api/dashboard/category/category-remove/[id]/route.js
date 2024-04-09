export const dynamic = 'force-dynamic'
import Category from "@/model/Category";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {

    try {
    connect();

    const goalCategory = await Category.findById(id);
    if (!goalCategory) {
        return NextResponse.json(
            { data: "چنین دسته ای وجود ندارد" },
            { status: 401 }
            );
        }
        
      await Category.findByIdAndRemove(id);
    return NextResponse.json({ data: "حذف با موفقیت انجام شد" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
