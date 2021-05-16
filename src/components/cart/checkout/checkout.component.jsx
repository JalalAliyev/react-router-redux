import React from 'react';
import { useForm } from '../../../hooks/use-form';
import InputCheckout from '../input-checkout/input-checkout.component';

import './checkout.style.scss';

const isEmpty = (value) => value.trim().length !== 0;
const isPostal = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const {
    value: name,
    isValid: nameIsValid,
    error: nameError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useForm(isEmpty);
  const {
    value: address,
    isValid: addressIsValid,
    error: addressError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    reset: addressReset,
  } = useForm(isEmpty);
  const {
    value: postal,
    isValid: postalIsValid,
    error: postalError,
    valueChangeHandler: postalChangeHandler,
    inputBlurHandler: postalBlurHandler,
    reset: postalReset,
  } = useForm(isPostal);
  const {
    value: city,
    isValid: cityIsValid,
    error: cityError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: cityReset,
  } = useForm(isEmpty);

  let formIsValid = false;
  formIsValid = nameIsValid && addressIsValid && postalIsValid && cityIsValid;

  const confirmHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    props.onConfirm({ name, address, postalCode: postal, city });

    nameReset();
    addressReset();
    postalReset();
    cityReset();
  };

  return (
    <form className="form-order" onSubmit={confirmHandler}>
      <InputCheckout
        id="name"
        label="Your Name"
        value={name}
        error={nameError}
        onChangeHandler={nameChangeHandler}
        onBlurHandler={nameBlurHandler}
        errorMessage="valid name!"
      />
      <InputCheckout
        id="address"
        label="Address"
        value={address}
        error={addressError}
        onChangeHandler={addressChangeHandler}
        onBlurHandler={addressBlurHandler}
        errorMessage="valid Address!"
      />
      <InputCheckout
        id="postal"
        label="Postal Code"
        value={postal}
        error={postalError}
        onChangeHandler={postalChangeHandler}
        onBlurHandler={postalBlurHandler}
        errorMessage="valid Postal Code!"
      />
      <InputCheckout
        id="city"
        label="City"
        value={city}
        error={cityError}
        onChangeHandler={cityChangeHandler}
        onBlurHandler={cityBlurHandler}
        errorMessage="valid City!"
      />
      <div className="actions">
        <button type="submit" className="submit" disabled={!formIsValid}>
          Confirm
        </button>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Checkout;
