export const dynamic = 'force-dynamic'
import Advertise from "@/model/Advertise";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {
    try {
    connect();

    const goalAdvertise = await Advertise.findById(id);
    if (!goalAdvertise) {
        return NextResponse.json(
            { data: "چنین تبلیغی وجود ندارد" },
            { status: 401 }
            );
        }
        
      await Advertise.findByIdAndDelete(id);
    return NextResponse.json({ data: "حذف با موفقیت انجام شد" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
