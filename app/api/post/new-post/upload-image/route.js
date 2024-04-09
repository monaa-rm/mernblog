export const dynamic = 'force-dynamic'
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";



export async function POST(req) {

   try {
      connect();

      const formData = await req.formData();

      const file = formData.get("file");
      if (!file) {
         return NextResponse.json({}, { status: 400 });
      }
      if (file.size < 1) {
         return NextResponse.json({ data: "لطفا فایلی را انتخاب کنید" }, { status: 400 });
      }
      if (file.size > 2000000) {
         return NextResponse.json({ data: "حجم فایل باید کمتر از 2 مگ باشد" }, { status: 400 });
      }
      if (file.type!="image/jpeg" && file.type!="image/jpg" && file.type!='image/png' ) {
         return NextResponse.json({ data: "لطفا فایل png یا jpeg آپلود کنید." }, { status: 400 });
      }
      

      const fileArrayBuffer = await file.arrayBuffer();



      const newname = Date.now() + file.name;

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
      Key: "posts/" + newname,
    };
    try {
      await client.send(new PutObjectCommand(params));
      const fileUrl = `${process.env.GOAL_HOST_URL}/posts/${newname}`;

      return NextResponse.json(
        { data: "تصویر آپلود شد.", fileUrl: fileUrl },
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
