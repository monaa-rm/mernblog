export const dynamic = 'force-dynamic'
import User from "@/model/User";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";
import TrezSMSClient from "trez-sms-client";

export async function GET(req) {
  try {
    await connect();
    const user_id = req.headers.get("user-id");
    const userFullData = await User.findById(user_id);
    const userPhone = "0" + userFullData.phone;

    if (userFullData.active_code_number < 1) {
      return NextResponse.json(
        { data: "شما فقط 5 بار میتوانید درخواست پیامک کنید" },
        { status: 401 }
      );
    }else{
      
    const client = new TrezSMSClient(
      process.env.SMS_USERNAME,
      process.env.SMS_PASSWORD
    );

    const messageId = await client.autoSendCode(userPhone, "مرن بلاگ");
    //USER ACTIVE CODE NUMBER SHOULD BE DECREASED
    const new_active_cn = userFullData.active_code_number - 1;
    const newData = {
      active_code_number: new_active_cn,
    };
    await User.findByIdAndUpdate(user_id, newData, { new: true });

    }

    return NextResponse.json(
      { data: "لطفا تلفن همراه خود را چک کنید" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ data: "خطا در ارسال پیامک" }, { status: 401 });
  }
}
