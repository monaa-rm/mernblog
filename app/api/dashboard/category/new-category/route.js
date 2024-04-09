export const dynamic = 'force-dynamic'
import Category from "@/model/Category";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";



export async function POST(req) {

   try {
      connect();
      const inputData = await req.json();


      
      // IS SLUG JUST ENGLISH AND NUMBER OR NOT
      if (!/^[\w\d\s-]+$/.test(inputData.slug)) {
         return NextResponse.json({ data: "برای بخش اسلاگ، فقط اعداد، عبارات انگلیسی و -_/  وارد کنید... ", }, { status: 402 });
      }





      // LENGTH VALIDATIONS

      if (inputData.slug.length < 8 || inputData.slug.length > 20) {
         return NextResponse.json({ data: "اسلاگ باید بین 8 تا 20 کارکتر باشد... ", }, { status: 402 });
      }
      if (inputData.title.length < 2 || inputData.title.length > 20) {
         return NextResponse.json({ data: "نام دسته باید بین 2 تا 20 کارکتر باشد... ", }, { status: 402 });
      }
     
      // UNIQUE VALIDATIONS
      const slugFound = await Category.findOne({ slug: inputData.slug });
      if (slugFound) {
         return NextResponse.json({ data: "لطفا اسلاگ دیگری را انتخاب کنید...", }, { status: 402 });
      }
      const titleFound = await Category.findOne({ title: inputData.title });
      if (titleFound) {
         return NextResponse.json({ data: "لطفا نام دسته دیگری انتخاب کنید... ", }, { status: 402 });
      }



      // FOR SLUG SPACES MUST CONVERT TO DASH
      const newSlug = inputData.slug.replace(/\s+/g, '-').toLowerCase();



      //  CREATING CATEGORY
      const date = new Date()


      const categoryFullData = {
         slug: newSlug,
         title: inputData.title,
         createdAt: date.toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" }),
       
      }
   await Category.create(categoryFullData);



      return NextResponse.json({ message: " دسته با موفقیت ایجاد شد..." }, { status: 200 });


   } catch (error) {
      console.log(error)
      return NextResponse.json({ data: "خطا در ایجاد دسته", }, { status: 401 });
   }

}