export const dynamic = 'force-dynamic'
import connect from "@/utils/connect";
import { NextResponse } from "next/server";
import Notif from "@/model/Notif";

export async function GET(req, {params : {id : notif_id}}) {
  try {
    connect();

    const date = new Date();
    const newData = {
      viewed: true,
      updatedAt:  date.toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" }),
    };

    await Notif.findByIdAndUpdate(notif_id, newData, { new: true });

    return NextResponse.json(
      { data: "پیام دیده شد" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
