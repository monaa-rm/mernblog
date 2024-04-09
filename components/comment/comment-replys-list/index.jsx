"use client";
import { useEffect, useState } from "react";
import CommentBox from "../comment-box";
import axios from "axios";

const CommentReplysList = ({ params, cm_id }) => {
  const [data, setData] = useState(-1);
  useEffect(() => {
    axios
      .get(`/api/comment/comment-replys/${cm_id}`)
      .then((data) => {
        setData(data.data.data);
      })
      .catch((err) => {
        console.log(err);
        setData(-2);
      });
  }, [cm_id]);
  return (
    <div className="flex flex-col gap-6 ">
      {data == -1 ? (
        <div  className=" bg-zinc-50 dark:bg-zinc-900 py-1 w-max px-3 rounded-md">لطفا صبر کنید</div>
      ) : data == -2 ? (
        <div  className=" bg-zinc-50 dark:bg-zinc-900 py-1 w-max px-3 rounded-md">خطا در بارگذاری اطلاعات</div>
      ) : data.length < 1 ? (
        <div  className=" bg-zinc-50 dark:bg-zinc-900 py-1 w-max px-3 rounded-md">هنوز پاسخی ثبت نشده است</div>
      ) : (
        <div className="flex flex-col gap-6 rounded-md ">
          {data.map((item, i) => (
            
              <div key={i} className=" rounded-md">
                <CommentBox data={item} params={params} key={i} />
              </div>
       
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentReplysList;
