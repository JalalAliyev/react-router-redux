import { useReducer } from 'react';

const reducer = (state, { payload, type }) => {
  switch (type) {
    case 'INPUT':
      return { value: payload, isTouched: state.isTouched };
    case 'BLUR':
      return { value: state.value, isTouched: true };
    case 'RESET':
      return { value: '', isTouched: false };
    default:
      return state;
  }
};

const useForm = (validateValue) => {
  const [state, dispatch] = useReducer(reducer, {
    value: '',
    isTouched: false,
  });

  const valueIsValid = validateValue(state.value);
  const error = !valueIsValid && state.isTouched;

  const valueChangeHandler = (e) => {
    dispatch({ type: 'INPUT', payload: e.target.value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: 'BLUR' });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    value: state.value,
    isValid: valueIsValid,
    error,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useForm;
