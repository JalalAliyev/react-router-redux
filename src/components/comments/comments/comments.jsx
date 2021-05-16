import { useState } from 'react';
import { useRouteMatch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NewCommentForm from '../new-comment-form/new-comment-form';

import './comments.scss';
import CommentsList from '../comments-list/comments-list';

const Comments = () => {
  const match = useRouteMatch();
  const [isAddingComment, setIsAddingComment] = useState(false);
  const { comments } = useSelector((state) => state.quotes);
  
  return (
    <section className="comments">
      {!isAddingComment && (
        <button
          className="btn"
          onClick={() => setIsAddingComment(!isAddingComment)}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm />}
      <Route
        path={`${match.path}`}
        render={() =>
          comments.length > 0 ? (
            <CommentsList comments={comments} />
          ) : (
            <p>There is no comments yet!</p>
          )
        }
      />
    </section>
  );
};

export default Comments;
