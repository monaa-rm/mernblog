"use client";
import { useState } from "react";
import { FaAngleDown, FaAngleUp, FaReplyAll } from "react-icons/fa6";
import NewComment from "../new-comment";
import CommentReplysList from "../comment-replys-list";

const CommentBox = ({ data, params }) => {
  const [formDisplayer, setFromDisplayer] = useState(-1);
  const [replyDisplayer, setReplyDisplayer] = useState(-1);

  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex flex-col gap-4 p-3 border bg-zinc-50 dark:bg-zinc-900 border-zinc-200 rounded-md  ">
        <div className="flex justify-between items-center gap-2 ">
          <span className="bg-zinc-300 dark:text-black px-3 py-1 rounded-md  ">
            {data.displayname}
          </span>
          <span className="bg-zinc-300 dark:text-black px-3 py-1 rounded-md  ">
            {data.createdAt}
          </span>
        </div>
        <p className="leading-9">{data.message}</p>
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => {
              setReplyDisplayer(replyDisplayer * -1);
              setFromDisplayer(-1);
            }}
            className="bg-zinc-300 dark:text-black px-3 py-1 rounded-md flex justify-end gap-2 items-center "
          >
            {replyDisplayer == -1 ? " پاسخ ها" : "بستن"}

            {replyDisplayer == -1 ? <FaAngleDown /> : <FaAngleUp />}
          </button>

          <button
            onClick={() => setFromDisplayer(formDisplayer * -1)}
            className="bg-zinc-300 dark:text-black px-3 py-1 rounded-md  flex justify-end gap-2 items-center"
          >
            {formDisplayer == -1 ? " ثبت پاسخ" : "بستن فرم"} <FaReplyAll />
          </button>
        </div>
      </div>
      {formDisplayer == 1 ? (
        <NewComment params={params} parent_id={data._id} text="ثبت پاسخ" />
      ) : null}
      {replyDisplayer == 1 ? (
        <div className="">
          <CommentReplysList params={params} cm_id={data._id} />
        </div>
      ) : null}
    </div>
  );
};

export default CommentBox;
