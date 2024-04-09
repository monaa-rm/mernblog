export const dynamic = 'force-dynamic'
import ChiefEditor from "@/model/ChiefEditor";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {
    try {
    connect();

    const goalChiefEditor = await ChiefEditor.findById(id);
    const ch_ed_id = req.headers.get("user-id")
    if (!goalChiefEditor) {
        return NextResponse.json(
            { data: "چنین پیشنهادی وجود ندارد" },
            { status: 401 }
            );
        }
        
      await ChiefEditor.findByIdAndDelete(id);
    return NextResponse.json({ data: "حذف با موفقیت انجام شد" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
