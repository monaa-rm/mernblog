export const dynamic = 'force-dynamic'
import User from "@/model/User";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";
import Jwt from "jsonwebtoken";
import Notif from "@/model/Notif";

export async function GET(req){
   let send_data={
      loged:false,
      role:4,
      user_is_active:false,
      user_image:"",
      notif_number : 0
   }

   try{
      connect();
      const token= await req.headers.get("token")
      if(token){
         const verified=Jwt.verify(token,process.env.TOKEN_SECRET);
         const userFullData=await User.findById(verified._id);
         const userNotViewedNotifs =await Notif.find({user_id:verified._id , viewed: false })
         send_data={
            loged:true,
            role:userFullData.role,
            blog_slug: userFullData.username,
            user_is_active:userFullData.user_is_active,
            user_image:userFullData.image!=""
            ?userFullData.image
            :userFullData.default_image,
            notif_number:userNotViewedNotifs.length
         };
         return NextResponse.json({data: send_data},{status:200});

      }
      else {
         return NextResponse.json({data:send_data},{status:200});

      }
   }catch(error){
      return NextResponse.json({data:send_data,},{status:200});
   }

}