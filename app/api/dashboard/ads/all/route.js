export const dynamic = 'force-dynamic'
import Advertise from "@/model/Advertise";
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
    const on_ads =
      searchParams.get("on") == 1
        ? 1
        : 0
        if(on_ads == 0){
          const advertises = await Advertise.find()
          .sort({ _id: -1 })
          .skip((page_number - 1) * paginate)
          .limit(paginate);
    
        const all_advertises_number = (await Advertise.find()).length;
        return NextResponse.json(
          { all_advertises_number, advertises },
          { status: 200 }
        );
        }else if(on_ads == 1){
          const advertises = await Advertise.find({published: true})
          .sort({ _id: -1 })
          .skip((page_number - 1) * paginate)
          .limit(paginate);
    
        const all_advertises_number = (await Advertise.find({published: true})).length;
        return NextResponse.json(
          { all_advertises_number, advertises },
          { status: 200 }
        );
        }


  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
