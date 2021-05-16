import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addCommentById, getAllCommentsById } from '../../../store/actions-thunk';
import Card from '../../UI/card/card.ui';

import './new-comment-form.scss';

const NewCommentForm = (props) => {
  const commentTextRef = useRef();

  const dispatch = useDispatch();
  const { quoteId } = useParams();

  const submitFormHandler = async (event) => {
    event.preventDefault();

    const commentData = commentTextRef.current.value;
    commentTextRef.current.value = '';

    if (commentData !== '') {
      await dispatch(addCommentById({ quoteId, commentData }));
      await dispatch(getAllCommentsById(quoteId));
    }
  };

  return (
    <Card className="center" style={{ maxWidth: '100%' }}>
      <form className="form" onSubmit={submitFormHandler}>
        <div className="control" onSubmit={submitFormHandler}>
          <label htmlFor="comment">Your Comment</label>
          <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
        </div>
        <div className="actions">
          <button className="btn">Add Comment</button>
        </div>
      </form>
    </Card>
  );
};

export default NewCommentForm;
