export const dynamic = 'force-dynamic'
import Post from "@/model/Post";
import User from "@/model/User";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    connect();
    const inputData = await req.json();
    const user_id = req.headers.get("user-id");
    //CHECK USER IS ACTIVE OR NOT
    const userFounded = await User.findById(user_id);
    if(userFounded.user_is_active != true){
      return NextResponse.json(
        { data: "لطفا شماره تماس خود را از طریق تنظیمات تایید کنید" },
        { status: 403 }
      );
    }

    // IS SLUG JUST ENGLISH AND NUMBER OR NOT
    if (!/^[\w\d\s-]+$/.test(inputData.slug)) {
      return NextResponse.json(
        { data: "برای بخش اسلاگ، فقط اعداد، عبارات انگلیسی و -_/  وارد کنید " },
        { status: 402 }
      );
    }

    // LENGTH VALIDATIONS

    if (inputData.slug.length < 4 || inputData.slug.length > 40) {
      return NextResponse.json(
        { data: " اسلاگ باید بین 4 تا 40 کارکتر باشد " },
        { status: 402 }
      );
    }
    if (inputData.title.length < 2 || inputData.title.length > 40) {
      return NextResponse.json(
        { data: "عنوان باید بین 2 تا 40 کارکتر باشد " },
        { status: 402 }
      );
    }

    if (inputData.short_desc.length < 10 || inputData.short_desc.length > 150) {
      return NextResponse.json(
        { data: "توضیحات کوتاه مقاله باید بین 10 تا 150 کارکتر باشد " },
        { status: 402 }
      );
    }
    if (inputData.long_desc.length < 10) {
      return NextResponse.json(
        { data: "توضیحات کامل مقاله باید بیشتر از 10 کارکتر باشد " },
        { status: 402 }
      );
    }
    if (inputData.published != true && inputData.published != false) {
      return NextResponse.json(
        { data: "آیتم انتشار مقاله اشتباه است" },
        { status: 402 }
      );
    }
    if (inputData.image == "") {
      return NextResponse.json(
        { data: "لطفا یک تصویر برای مقاله انتخاب کنید" },
        { status: 402 }
      );
    }
    if (inputData.categories.length < 1) {
      return NextResponse.json(
        { data: "حداقل یک دسته بندی باید انتخاب کنید" },
        { status: 402 }
      );
    }
    if (inputData.tags.length < 1) {
      return NextResponse.json(
        { data: "حداقل یک برچسب باید انتخاب کنید" },
        { status: 402 }
      );
    }

    // FOR SLUG SPACES MUST CONVERT TO DASH
    const newSlug = inputData.slug.replace(/\s+/g, "-").toLowerCase();
    // UNIQUE VALIDATIONS
    const slugFound = await Post.findOne({ slug: newSlug });
    if (slugFound) {
      return NextResponse.json(
        { data: "لطفا اسلاگ دیگری را انتخاب کنید" },
        { status: 402 }
      );
    }
    const titleFound = await Post.findOne({ title: inputData.title });
    if (titleFound) {
      return NextResponse.json(
        { data: "لطفا عنوان دیگری انتخاب کنید " },
        { status: 402 }
      );
    }

    //  CREATING Post
    const date = new Date();
    const words = inputData.long_desc.split(" ");
    const theTime = Math.floor((words.length * 0.14) / 60);

    const PostFullData = {
      slug: newSlug,
      title: inputData.title,
      short_desc: inputData.short_desc,
      long_desc: inputData.long_desc,
      tags: inputData.tags,
      published: inputData.published,
      categories: inputData.categories,
      image: inputData.image,
      time: theTime,
      author_id: user_id,
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
    await Post.create(PostFullData);

    return NextResponse.json(
      { message: " مقاله با موفقیت ایجاد شد" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا در ایجاد مقاله" }, { status: 401 });
  }
}
