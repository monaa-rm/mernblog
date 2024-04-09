export const dynamic = 'force-dynamic'
import connect from "@/utils/connect";
import { NextResponse } from "next/server";
import Comment from "@/model/Comment";
import User from "@/model/User";
import Notif from "@/model/Notif";
import TrezSMSClient from "trez-sms-client";


export async function POST(req) {
  try {
    connect();
    const inputData = await req.json();
    const comment_id = inputData.goalId;
    const comment_data = await Comment.findById(comment_id);
    if (!comment_data) {
      return NextResponse.json(
        { data: "چنین دیدگاهی وجود ندارد " },
        { status: 401 }
      );
    }
    const newData = {
      message: inputData.message,
      phone: inputData.phone,
      displayname: inputData.displayname,
      published: inputData.published,
      viewed: inputData.viewed,
      createdAt: inputData.createdAt,
    };
    //CREATIMG NOTIF FOR PARENT COMMENT USER
    const date = new Date();

    if (inputData.notif == true) {
      if (comment_data.parent_id != "no-parent") {
        const parent_comment_data = await Comment.findById(
          comment_data.parent_id
        );
        if (!parent_comment_data) {
          return NextResponse.json(
            { data: " کامنت والد وجود ندارد" },
            { status: 401 }
          );
        }
        const parent_user_data = await User.findOne({
          phone: parent_comment_data.phone,
        });
        if (!parent_user_data) {
          return NextResponse.json(
            { data: "کاربر نویسنده دیدگاه والد وجود ندارد" },
            { status: 401 }
          );
        }
        const notif_data = {
          text: ` ${parent_user_data.displayname} به دیدگاه شما پاسخ داد`,
          post_id: comment_data.post_id,
          user_id: parent_user_data._id,
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
        //SENDIG SMS
          
    const client = new TrezSMSClient(
      process.env.SMS_USERNAME,
      process.env.SMS_PASSWORD
    );
    const userPhone = "0" + parent_comment_data.phone;
    const smsMessage = ` ${parent_user_data.displayname} به دیدگاه شما در مرن بلاگ پاسخ داد`
    const messageId = await client.manualSendCode(userPhone,smsMessage)
    
      }
    }

    await Comment.findByIdAndUpdate(comment_id, newData, { new: true });

    return NextResponse.json(
      { data: "اطلاعات به روزرسانی شد." },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
