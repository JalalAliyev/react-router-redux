import React from 'react';
import { CgRemove } from 'react-icons/cg';

import './cart-item.style.scss';

const CartItem = ({ item, onRemove, onAdd, onDelete }) => {
  const { price, name, quantity } = item;

  return (
    <li className="cart-item">
      <div>
        <h2>{name}</h2>
        <div className="summary-price">
          <span className="price">{price}</span>
          <span className="amount">x {quantity}</span>
        </div>
      </div>
      <div className="actions">
        <button onClick={onRemove}>-</button>
        <button onClick={onAdd}>+</button>
        <CgRemove onClick={onDelete} />
      </div>
    </li>
  );
};

export default CartItem;
