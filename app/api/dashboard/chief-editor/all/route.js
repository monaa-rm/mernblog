export const dynamic = 'force-dynamic'
import ChiefEditor from "@/model/ChiefEditor";
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

    const chiefEditors = await ChiefEditor.find()
      .sort({ _id: -1 })
      .skip((page_number - 1) * paginate)
      .limit(paginate);

      const all_chiefEditors_number = (await ChiefEditor.find()).length;
    return NextResponse.json(
      {  chiefEditors ,all_chiefEditors_number},
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
