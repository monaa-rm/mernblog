export const dynamic = 'force-dynamic'
import Category from "@/model/Category";
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

    const categories = await Category.find()
      .sort({ _id: -1 })
      .skip((page_number - 1) * paginate)
      .limit(paginate);

    const all_categories_number = (await Category.find()).length;
    return NextResponse.json(
      { all_categories_number, categories },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
