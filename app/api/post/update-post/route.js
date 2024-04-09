export const dynamic = 'force-dynamic'
import ChiefEditor from "@/model/ChiefEditor";
import Post from "@/model/Post";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    connect();
    const inputData = await req.json();
    const post_id = inputData.goalId;
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
    if (slugFound && slugFound._id != post_id) {
      return NextResponse.json(
        { data: "لطفا اسلاگ دیگری انتخاب کنید... " },
        { status: 402 }
      );
    }


    const titleFound = await Post.findOne({ title: inputData.title });
    if (titleFound && titleFound._id != post_id) {
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
      updatedAt: date.toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      manager_accept: false,
    };

    //CHECK CHIEF EDITOR POSTS
    const thePost = await Post.findById(post_id).select({ slug: 1 });
    const chiefEditorFounded = await ChiefEditor.findOne({
      post_slug: thePost.slug,
    });

    if (chiefEditorFounded) {
      if (chiefEditorFounded.situation == true) {
        return NextResponse.json(
          {
            data: "پست شما به عنوان پیشنهاد سردبیر انتخاب شده است. فعلا اجازه ویرایش آن را ندارید",
          },
          { status: 401 }
        );
      }
      const newChiefData = {
        post_slug: newSlug,
      };
      await ChiefEditor.findByIdAndUpdate(
        chiefEditorFounded._id,
        newChiefData,
        { new: true }
      );
    }
    await Post.findByIdAndUpdate(post_id, PostFullData, { new: true });

    return NextResponse.json(
      { data: " مقاله با موفقیت به روزرسانی شد" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { data: "خطا در به روزرسانی مقاله" },
      { status: 401 }
    );
  }
}
