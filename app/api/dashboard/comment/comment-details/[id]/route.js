export const dynamic = 'force-dynamic'
import Comment from "@/model/Comment";
import Post from "@/model/Post";
import User from "@/model/User";
import connect from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {
  try {
    connect();

    const goalComment = await Comment.findById(id);
    if (!goalComment) {
      return NextResponse.json(
        { data: "چنین دیدگاهی وجود ندارد" },
        { status: 401 }
      );
    }
    //GET PARENT COMMENT
    let parent_data = "no-parent";
    if (goalComment.parent_id != "no-parent") {
      parent_data = await Comment.findById(goalComment.parent_id).select({
        message: 1,
        displayname: 1,
        createdAt: 1,
      });
    }
    //GET CHILDREN COMMENTS
    let children_data = "no-child";
    children_data = await Comment.find({ parent_id: goalComment._id })
      .select({
        message: 1,
        displayname: 1,
        createdAt: 1,
      })
      .sort({ _id: 1 });
    if (children_data.length < 1) {
      children_data = "no-child";
    }
    //GET BLOG DATA
    const blog_data = await User.findById(goalComment.blog_id).select({
      username: 1,
      blog_name: 1,
      _id: 1,
    });

    //GET POST DATA
    const post_data = await Post.findById(goalComment.post_id).select({
      slug: 1,
      title: 1,
      _id: 1,
    });
    const send_data = {
      _id: goalComment._id,
      blog_id: goalComment.blog_id,
      createdAt: goalComment.createdAt,
      displayname: goalComment.displayname,
      message: goalComment.message,
      parent_id: goalComment.parent_id,
      phone: goalComment.phone,
      post_id: goalComment.post_id,
      published: goalComment.published,
      updatedAt: goalComment.updatedAt,
      viewed: goalComment.viewed,
      post_data,
      blog_data,
      parent_data,
      children_data,
    };
    return NextResponse.json({ data: send_data }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
