import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../../UI/loading-spinner/loading-spinner.ui';
import QuoteItem from '../quote-item/quote-item';

import './quote-list.scss';

const sortQuotes = (accessQuotes, ascending) => {
  if (accessQuotes.length === 0) return [];
  return accessQuotes.slice().sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const { quotes } = useSelector((state) => state.quotes);

  const history = useHistory();
  const location = useLocation();

  console.log('quotes>>>', quotes.slice());

  const queryParams = new URLSearchParams(location.search);

  const isSortingAscending = queryParams.get('sort') === 'asc';

  const sortedQuotes = sortQuotes(quotes, isSortingAscending);

  const changeSortingHandler = () => {
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortingAscending ? 'desc' : 'asc'}`,
    });
  };

  return (
    <Fragment>
      <div className="sorting">
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? 'Descending' : 'Ascending'}
        </button>
      </div>
      <ul className="list">
        {quotes &&
          sortedQuotes.map((quote) => (
            <QuoteItem
              key={quote.id}
              id={quote.id}
              author={quote.author}
              text={quote.text}
            />
          ))}
        {quotes.length === 0 && <LoadingSpinner />}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
