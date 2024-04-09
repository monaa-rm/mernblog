export const dynamic = 'force-dynamic'
import User from "@/model/User";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function POST(req) {
  try {
    connect();
    const user_id = req.headers.get("goal_user_id");

    const formData = await req.formData();

    const file = formData.get("file");
    if (!file) {
      return NextResponse.json({}, { status: 400 });
    }
    if (file.size < 1) {
      return NextResponse.json(
        { data: "لطفا فایلی را انتخاب کنید" },
        { status: 400 }
      );
    }
    if (file.size > 2000000) {
      return NextResponse.json(
        { data: "حجم فایل باید کمتر از 2 مگ باشد" },
        { status: 400 }
      );
    }
    if (
      file.type != "image/jpeg" &&
      file.type != "image/jpg" &&
      file.type != "image/png"
    ) {
      return NextResponse.json(
        { data: "لطفا فایل png یا jpeg آپلود کنید." },
        { status: 400 }
      );
    }

    const fileArrayBuffer = await file.arrayBuffer();



    const newname = Date.now() + file.name;
  
    const date = new Date();
    //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    const client = new S3Client({
      region: "default",
      endpoint: process.env.LIARA_ENDPOINT,
      credentials: {
        accessKeyId: process.env.LIARA_ACCESS_KEY,
        secretAccessKey: process.env.LIARA_SECRET_KEY,
      },
    });

    const params = {
      Body: fileArrayBuffer,
      Bucket: process.env.LIARA_BUCKET_NAME,
      Key: "avatars/" + newname,
    };
    try {
      await client.send(new PutObjectCommand(params));
      const fileUrl = `${process.env.GOAL_HOST_URL}/avatars/${newname}`;
      const newData = {
        image: fileUrl,
        viewed: false,
        updatedAt: date.toLocaleDateString("fa-IR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };
      await User.findByIdAndUpdate(user_id, newData, { new: true });

      return NextResponse.json(
        { data: "تصویر به روزرسانی شد." },
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
    }

    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
