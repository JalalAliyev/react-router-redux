import React from 'react';
import { useDispatch } from 'react-redux';
import QuoteForm from '../components/quotes/quote-form/quote-form';
import { addQuote } from '../store/quote-slice';

const NewQuote = () => {
  const dispatch = useDispatch();
  const addQuoteHandler = (quoteData) => {
    dispatch(addQuote({ quoteData }));
  };

  return <QuoteForm onAddQuote={addQuoteHandler} />;
};

export default NewQuote;
