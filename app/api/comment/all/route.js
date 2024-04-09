export const dynamic = 'force-dynamic'

import Comment from "@/model/Comment";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    connect();

    const user_id = req.headers.get("user-id");
  
     const all_comments = await Comment.find().sort({ _id: -1 })
        
   
     
    return NextResponse.json({ all_comments }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
