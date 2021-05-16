import { useState } from 'react';

export const useForm = (validateInfo) => {
  const [value, setValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateInfo(value);
  const error = isTouched && !valueIsValid;

  const valueChangeHandler = (e) => {
    setValue(e.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setValue('');
    setIsTouched(false);
  };

  return {
    value,
    isValid: valueIsValid,
    error,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};
