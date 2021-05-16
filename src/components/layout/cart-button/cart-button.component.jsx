import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GrBasket } from 'react-icons/gr';

import './cart-button.style.scss';

const CartButton = ({ onClick }) => {
  const { totalQuantity, items } = useSelector((state) => state.cart);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const btnClasses = `button ${btnIsHighlighted ? 'bump' : ''}`;

  useEffect(() => {
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={onClick}>
      <span className="icon">
        <GrBasket style={{ fontSize: '1rem', color: 'white' }} />
      </span>
      <span>Your Cart</span>
      <span className="badge">{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
