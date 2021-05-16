import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Route, Link, useRouteMatch } from 'react-router-dom';
import Comments from '../components/comments/comments/comments';
import HighlightedQuote from '../components/quotes/highlighted-quote/highlighted-quote';
import { getAllCommentsById } from '../store/actions-thunk';
import { clearComments } from '../store/quote-slice';

const QuoteDetail = () => {
  const { quoteId } = useParams();
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const { quotes } = useSelector((state) => state.quotes);
  const { comments } = useSelector((state) => state.quotes);
  const quote = quotes.find((quote) => quote.id === quoteId);

  useEffect(() => {
    dispatch(clearComments());
  }, [quoteId, dispatch]);

  useEffect(() => {
    dispatch(getAllCommentsById(quoteId));
  }, [quoteId, dispatch]);

  return (
    <>
      {quote && <HighlightedQuote text={quote.text} author={quote.author} />}
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}`}>
            Back
          </Link>
        </div>
      </Route>
      <Route
        path={`${match.path}/comments`}
        render={() => <Comments comments={comments} />}
      />
    </>
  );
};

export default QuoteDetail;
