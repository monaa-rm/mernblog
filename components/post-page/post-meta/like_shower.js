import Liker from "./liker";

const LikeShower = ({ post_id, likes_num }) => {
  return (
    <div className="flex gap-2 items-center justify-end">
      <div className=" bg-white p-2 rounded-xl flex justify-end items-center gap-2">
        <span>{likes_num}</span>
        <Liker post_id={post_id} />
      </div>
    </div>
  );
};

export default LikeShower;
