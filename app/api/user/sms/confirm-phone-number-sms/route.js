export const dynamic = 'force-dynamic'
import User from "@/model/User";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";
import TrezSMSClient from "trez-sms-client";

export async function POST(req) {
  try {
    await connect();
    const user_id = req.headers.get("user-id");
    const userFullData = await User.findById(user_id);
    const userPhone = "0" + userFullData.phone;
    const inputData = await req.json();
    const client = new TrezSMSClient(
      process.env.SMS_USERNAME,
      process.env.SMS_PASSWORD
    );

    const isvalid = await client.checkCode(userPhone, inputData.code);
    if (isvalid) {
      const newData = {
        user_is_active: true,
      };
      await User.findByIdAndUpdate(user_id, newData, { new: true });
      return NextResponse.json(
        { data: "حساب کاربری با موفقیت فعال شد" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { data: "کد تایید اشتباه است" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ data: "خطا در ارسال پیامک" }, { status: 401 });
  }
}
