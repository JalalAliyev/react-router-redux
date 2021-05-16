import CommentItem from '../comment-item/comment-item';
import './comments-list.scss';

const CommentsList = (props) => {
  console.log('Comments list component rendered!');
  return (
    <ul className="comments-list">
      {props.comments.map((comment) => (
        <CommentItem key={comment.id} text={comment.text} />
      ))}
    </ul>
  );
};

export default CommentsList;
