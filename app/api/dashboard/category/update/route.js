export const dynamic = 'force-dynamic'
import connect from "@/utils/connect";
import { NextResponse } from "next/server";
import Category from "@/model/Category";

export async function POST(req) {

   try {
      connect();
      const inputData = await req.json();
      const category_id = inputData.goalId;


      const newData = {
         title: undefined,
         slug:undefined,

      }


      // SLUG VALIDATIONS
      if(inputData.slug!=undefined){
         if (!/^[\w\d\s-]+$/.test(inputData.slug)) {
            return NextResponse.json({ data: "برای بخش اسلاگ، فقط اعداد، عبارات انگلیسی و -_/ وارد کنید... ", }, { status: 402 });
         }
         if (inputData.slug.length < 8 || inputData.slug.length > 20) {
            return NextResponse.json({ data: "اسلاگ باید بین 8 تا 20 کارکتر باشد... ", }, { status: 402 });
         }
         const newslug = inputData.slug.replace(/\s+/g, '-').toLowerCase();

         const slugFound = await Category.findOne({ slug: newslug });
         if(!slugFound || slugFound._id == category_id){
            newData.slug=newslug;
         }
         else{
            return NextResponse.json({ data: "لطفا اسلاگ دیگری انتخاب کنید... ", }, { status: 402 });
         }
      }


      

      // TITLE VALIDATIONS
      if(inputData.title!=undefined){
         if (inputData.title.length < 2 || inputData.title.length > 20) {
            return NextResponse.json({ data: "نام دسته باید بین 2 تا 20 کارکتر باشد... ", }, { status: 402 });
         }
        
         const newtitle = inputData.title;
         const titleFound = await Category.findOne({ title: newtitle });
         if(!titleFound || titleFound._id == category_id){
            newData.title=newtitle;
         }
         else{
            return NextResponse.json({ data: "لطفا نام دسته دیگری انتخاب کنید... ", }, { status: 402 });
         }
         newData.title=inputData.title;
      }


   

      await Category.findByIdAndUpdate(category_id,newData,{new:true})

      return NextResponse.json({ data: "اطلاعات به روزرسانی شد." }, { status: 200 });
   } catch (error) {
      console.log(error);
      return NextResponse.json({ data: "خطا ", }, { status: 401 });
   }

}