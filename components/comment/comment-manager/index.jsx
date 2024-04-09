import NewComment from '../new-comment'
import CommentsList from '../comments-list'

const CommentManager = ({params}) => {
  return (
    <div className='flex flex-col gap-8'>
      <NewComment params={params} text={"ثبت دیدگاه"} />
      <CommentsList params={params} />
    </div>
  )
}

export default CommentManager
