export const dynamic = 'force-dynamic'
import ChiefEditor from "@/model/ChiefEditor";
import Post from "@/model/Post";
import User from "@/model/User";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    connect();
    const inputData = await req.json();

    // IS SLUG JUST ENGLISH AND NUMBER OR NOT
    if (!/^[\w\d\s-]+$/.test(inputData.blog_slug)) {
      return NextResponse.json(
        {
          data: "برای بخش اسلاگ، فقط اعداد، عبارات انگلیسی و -_/  وارد کنید... ",
        },
        { status: 402 }
      );
    }
    if (!/^[\w\d\s-]+$/.test(inputData.post_slug)) {
      return NextResponse.json(
        {
          data: "برای بخش اسلاگ، فقط اعداد، عبارات انگلیسی و -_/  وارد کنید... ",
        },
        { status: 402 }
      );
    }

    // FOR SLUG SPACES MUST CONVERT TO DASH
    const newBlogSlug = inputData.blog_slug.replace(/\s+/g, "-").toLowerCase();
    const newPostSlug = inputData.post_slug.replace(/\s+/g, "-").toLowerCase();

    //EXIST ANY USER WITH THIS BLOG_SLUG OR NOT
    const foundUser = await User.findOne({ username: newBlogSlug });
    if (!foundUser) {
      return NextResponse.json(
        { data: "چنین آدرس وبلاگی وجود ندارد... " },
        { status: 402 }
      );
    }
    //EXIST ANY POST WITH THIS BLOG_SLUG OR NOT
    const foundPost = await Post.findOne({ slug: newPostSlug });
    if (!foundPost) {
      return NextResponse.json(
        { data: "چنین آدرس پستی وجود ندارد... " },
        { status: 402 }
      );
    }
    //IS POST ACCEPTED OR NOT
    if (foundPost.manager_accept != true) {
      return NextResponse.json(
        { data: "پست هنوز تایید نشده است..." },
        { status: 402 }
      );
    }
    
    //POST IS WRITTEN BY THIS USER OR NOT
    if(foundUser._id != foundPost.author_id){
      return NextResponse.json(
         { data: "اسلاگ پست و وبلاگ با هم مطابقت ندارند ... " },
         { status: 402 }
       );
    }


    // CHECK POST NUMBER

    if (inputData.number < 1 || inputData.number > 5) {
      return NextResponse.json(
        { data: "شماره باید بین 1 تا 5 باشد... " },
        { status: 402 }
      );
    }
 
    //  CREATING CATEGORY
    const date = new Date();

    const chiefEditorFullData = {
      post_slug: newPostSlug,
      blog_slug: newBlogSlug,
      situation: inputData.situation,
      number: inputData.number,
      createdAt: date.toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };


    // CHECK EXISTING CHIEF EDITOR NUMBER
      const existChiefEditorByNumber = await ChiefEditor.findOne({
        number: chiefEditorFullData.number,
        situation: true,
      });
      if (existChiefEditorByNumber) {
        const oldChiefEditorData = {
          situation: false,
        };
        await ChiefEditor.findOneAndUpdate(
          existChiefEditorByNumber._id,
          oldChiefEditorData,
          { new: true }
        );
      }
    
    // CHECK EXISTING CHIEF EDITOR SITUATION
      const existChiefEditorBySituation = await ChiefEditor.findOne({
        situation: chiefEditorFullData.situation,
        number : chiefEditorFullData.number
      });
      if (existChiefEditorBySituation) {
        const oldChiefEditorData = {
          situation: false,
        };
        await ChiefEditor.findOneAndUpdate(
          existChiefEditorBySituation._id,
          oldChiefEditorData,
          { new: true }
        );
      }


    await ChiefEditor.create(chiefEditorFullData);


    return NextResponse.json(
      { message: " پسشنهاد سردبیر با موفقیت ایجاد شد..." },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا در ایجاد پیشنهاد سردبیر" }, { status: 401 });
  }
}
