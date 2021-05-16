import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoadingSpinner from '../../UI/loading-spinner/loading-spinner.component';
import Modal from '../../UI/modal/modal.component';
import CartItem from '../cart-item/cart-item.component';
import Checkout from '../checkout/checkout.component';
import {
  dropItems,
  dropItem,
  increaseQuantity,
  decreaseQuantity,
} from '../../../store/cart-slice';

import './cart.style.scss';

const Card = ({ onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const { items, totalAmount } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const isHasItems = items.length > 0;

  const cartAddItemHandler = (item) => {
    dispatch(increaseQuantity(item));
  };

  const cartRemoveItemHandler = (id) => {
    dispatch(decreaseQuantity({ id }));
  };

  const cartDeleteItemHandler = (id) => {
    dispatch(dropItem({ id }));
  };

  const orderHandler = () => {
    setIsCheckout(!isCheckout);
  };

  const submitOrderHandler = async (user) => {
    setIsSubmitting(true);
    await fetch(
      'https://custom-hook-3ee88-default-rtdb.firebaseio.com/oreders.json',
      {
        method: 'POST',
        body: JSON.stringify({
          user,
          orderItems: items,
        }),
      },
    );

    setIsSubmitting(false);
    setDidSubmit(true);
    dispatch(dropItems());
  };

  const cardItems = (
    <ul className="card-items">
      {items &&
        items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onAdd={cartAddItemHandler.bind(null, item)}
            onRemove={cartRemoveItemHandler.bind(null, item.id)}
            onDelete={cartDeleteItemHandler.bind(null, item.id)}
          />
        ))}
    </ul>
  );

  if (isSubmitting && !didSubmit) {
    return (
      <Modal>
        <LoadingSpinner />
      </Modal>
    );
  }

  if (!isSubmitting && didSubmit) {
    return (
      <Modal>
        <div className="submitted actions">
          <p style={{ color: 'green', fontSize: '1.1rem' }}>
            Successfully did you order!
          </p>
          <button className="button-alt" onClick={onClose}>
            Close
          </button>
        </div>
      </Modal>
    );
  }
  return (
    <Modal>
      {!isCheckout && cardItems}
      <div className="total">
        <span>Total Amount</span>
        <span>${totalAmount.toFixed(2)}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={orderHandler} />
      )}
      {!isCheckout && (
        <div className="actions">
          {isHasItems && (
            <button className="button" onClick={orderHandler}>
              Order
            </button>
          )}
          <button className="button-alt" onClick={onClose}>
            Close
          </button>
        </div>
      )}
    </Modal>
  );
};

export default Card;
