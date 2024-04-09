import CommentBox from "../comment-box";

const getData = async (inp) => {
  const data = await fetch(
    `${process.env.SERVER_URL}/api/comment/post-comments/${inp}`,
    { cache: "no-store" }
  );
  return data.json();
};

const CommentsList = async ({ params }) => {
  const data = await getData(params.post_slug);
  return (
    <div className="flex flex-col gap-4">
      {data.data.length > 0
        ? data.data.map((item, i) => <CommentBox data={item} params={params} key={i} />)
        : null}
    </div>
  );
};

export default CommentsList;
