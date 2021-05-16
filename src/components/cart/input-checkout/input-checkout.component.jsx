import React from 'react';

const InputCheckout = (props) => {
  return (
    <div className="control">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type="text"
        id={props.id}
        value={props.value}
        onChange={props.onChangeHandler}
        onBlur={props.onBlurHandler}
        autoComplete="off"
      />
      {props.error && <p>Please enter a {props.errorMessage}</p>}
    </div>
  );
};

export default InputCheckout;
