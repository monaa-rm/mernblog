export const dynamic = 'force-dynamic'
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

import Advertise from "@/model/Advertise";
import Notif from "@/model/Notif";

export async function POST(req) {
  try {
    connect();
    const inputData = await req.json();
    const advertise_id = inputData.advertise_id;
    const the_ads = await Advertise.findById(advertise_id);
    if(!the_ads){
      return NextResponse.json(
        { data:"چنین تبلیغی وجود ندارد" },
        { status: 404 }
      );
    }
    await Advertise.findByIdAndUpdate(advertise_id, inputData, { new: true });

    //CREATE NOTIF
    const date = new Date();
    if (inputData.published == true) {
      const notif_data = {
        text: "تبلیغ شما در حال نمایش در سایت است",
        post_id: the_ads.type == "banner" ?the_ads.user_id : the_ads.post_id,
        user_id: the_ads.user_id,
        createdAt: date.toLocaleDateString("fa-IR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        updatedAt: date.toLocaleDateString("fa-IR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };
      await Notif.create(notif_data);
    }
    return NextResponse.json(
      { data: "اطلاعات به روزرسانی شد." },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
