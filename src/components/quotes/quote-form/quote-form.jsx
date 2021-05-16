import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Prompt } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import useForm from '../../../hooks/use-form';
import { sendQuoteToDB } from '../../../store/actions-thunk';
import Card from '../../UI/card/card.ui';
import LoadingSpinner from '../../UI/loading-spinner/loading-spinner.ui';

import './quote-form.scss';

const validateName = (value) => value.trim().length > 2;
const validateQuote = (value) => value.trim().length > 10;

const QuoteForm = (props) => {
  const [isFocus, setIsFocus] = useState(false);

  const {
    value: author,
    isValid: authorIsValid,
    error: authorError,
    valueChangeHandler: authorChangeHandler,
    inputBlurHandler: authorBlurHandler,
    reset: authorReset,
  } = useForm(validateName);

  const {
    value: quote,
    isValid: quoteIsValid,
    error: quoteError,
    valueChangeHandler: quoteChangeHandler,
    inputBlurHandler: quoteBlurHandler,
    reset: quoteReset,
  } = useForm(validateQuote);

  const dispatch = useDispatch();
  const history = useHistory();

  function submitFormHandler(event) {
    event.preventDefault();

    const quoteId = uuidv4();
    const enteredQuote = {
      id: quoteId,
      author,
      text: quote,
    };

    authorReset();
    quoteReset();

    props.onAddQuote(enteredQuote);
    dispatch(sendQuoteToDB(enteredQuote));
    history.push(`quotes/${quoteId}`);
  }
  return (
    <>
      <Prompt
        when={isFocus}
        message="Are u sure you want to leave? All information will be lost!"
      />
      <Card>
        <form
          className="form"
          onFocus={() => setIsFocus(true)}
          onSubmit={submitFormHandler}>
          {props.isLoading && (
            <div className="loading">
              <LoadingSpinner />
            </div>
          )}

          <div className="control">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              onChange={authorChangeHandler}
              onBlur={authorBlurHandler}
              value={author}
            />
            {authorError && <p className="error">Author must not be empty!</p>}
          </div>
          <div className="control">
            <label htmlFor="text">Text</label>
            <textarea
              id="text"
              rows="3"
              onChange={quoteChangeHandler}
              onBlur={quoteBlurHandler}
              value={quote}></textarea>
            {quoteError && (
              <p className="error">Text must be greater than 10 character!</p>
            )}
          </div>
          <div className="actions">
            <button disabled={!authorIsValid && !quoteIsValid} className="btn">
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default QuoteForm;
