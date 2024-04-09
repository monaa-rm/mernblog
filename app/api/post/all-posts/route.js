export const dynamic = 'force-dynamic'

import Post from "@/model/Post";
import User from "@/model/User";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    connect();
    const { searchParams } = req.nextUrl;
    const user_id = req.headers.get("user-id");
    const paginate =
      searchParams.get("paginate") == undefined
        ? 10
        : searchParams.get("paginate") < 1
        ? 10
        : searchParams.get("paginate");
    const page_number =
      searchParams.get("page_number") == undefined
        ? 1
        : searchParams.get("page_number") < 1
        ? 1
        : searchParams.get("page_number");
    const draft = searchParams.get("draft") == 1 ? 1 : 0;
    const published = searchParams.get("published") == 1 ? 1 : 0;
    const accepted =
      searchParams.get("accepted") == 1
        ? 1
        : searchParams.get("accepted") == -1
        ? -1
        : 0;
    const bookmarked = searchParams.get("bookmarked") == 1 ? 1 : 0;

    let posts = [];
    let all_posts_number = 0;
    if (draft == 1) {
      posts = await Post.find({ author_id: user_id, published: false })
        .select({
          title: 1,
          image: 1,
          createdAt: 1,
          view_num: 1,
          likes_num: 1,
          published: 1,
        })
        .sort({ _id: -1 })
        .skip((page_number - 1) * paginate)
        .limit(paginate);
      all_posts_number = (
        await Post.find({ author_id: user_id, published: false })
      ).length;
    } else if (published == 1) {
      posts = await Post.find({ author_id: user_id, published: true })
        .select({
          title: 1,
          image: 1,
          createdAt: 1,
          view_num: 1,
          likes_num: 1,
          published: 1,
        })
        .sort({ _id: -1 })
        .skip((page_number - 1) * paginate)
        .limit(paginate);
      all_posts_number = (
        await Post.find({ author_id: user_id, published: true })
      ).length;
    } else if (accepted == -1) {
      posts = await Post.find({
        author_id: user_id,
        published: true,
        manager_accept: false,
      })
        .select({
          title: 1,
          image: 1,
          createdAt: 1,
          view_num: 1,
          likes_num: 1,
          published: 1,
        })
        .sort({ _id: -1 })
        .skip((page_number - 1) * paginate)
        .limit(paginate);
      all_posts_number = (
        await Post.find({
          author_id: user_id,
          published: true,
          manager_accept: false,
        })
      ).length;
    } else if (accepted == 1) {
      posts = await Post.find({
        author_id: user_id,
        published: true,
        manager_accept: true,
      })
        .select({
          title: 1,
          image: 1,
          createdAt: 1,
          view_num: 1,
          likes_num: 1,
          published: 1,
        })
        .sort({ _id: -1 })
        .skip((page_number - 1) * paginate)
        .limit(paginate);
      all_posts_number = (
        await Post.find({
          author_id: user_id,
          published: true,
          manager_accept: true,
        })
      ).length;
    } else if (bookmarked == 1) {
      const userFounded = await User.findById(user_id);
      posts = await Post.find()
        .where("_id")
        .in(userFounded.bookmarked_posts)
        .select({
          title: 1,
          slug: 1,
          image: 1,
          short_desc: 1,
          updatedAt: 1,
          likes_num: 1,
          view_num: 1,
          time: 1,
          author_id: 1,
          _id:false
        })
        .sort({ _id: -1 })
        .skip((page_number - 1) * paginate)
        .limit(paginate);

      const postAuthors = posts.map((post) => post.author_id);
      const authors = await User.find()
        .where("_id")
        .in(postAuthors)
        .select({ username: 1, _id: 1 });

      let finalData = [];
      posts.forEach((post) => {
        const author = authors.find(
          (author) => post.author_id.toString() === author._id.toString()
        );
       const clone_post = {...post.toObject()}
        delete clone_post.author_id
        if (author) {
          finalData.push({ ...clone_post, username: author.username });
        }
      });
      all_posts_number = (
        await Post.find().where("_id").in(userFounded.bookmarked_posts)
      ).length;

      return NextResponse.json({ all_posts_number, posts: finalData }, { status: 200 });
    } else {
      posts = await Post.find({ author_id: user_id })
        .select({
          title: 1,
          image: 1,
          createdAt: 1,
          view_num: 1,
          likes_num: 1,
          published: 1,
        })
        .sort({ _id: -1 })
        .skip((page_number - 1) * paginate)
        .limit(paginate);
      all_posts_number = (await Post.find({ author_id: user_id })).length;
    }
    return NextResponse.json({ all_posts_number, posts }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
