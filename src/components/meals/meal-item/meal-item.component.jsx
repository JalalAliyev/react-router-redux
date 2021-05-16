import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../../../store/cart-slice';
import MealItemForm from '../meal-item-form/meal-item-form.component';

import './meal-item.style.scss';

const MealItem = (props) => {
  const dispatch = useDispatch();

  const addToCartHandler = (quantity) => {
    dispatch(
      addItem({
        id: props.id,
        name: props.name,
        amount: props.price * quantity,
        quantity,
        description: props.description,
        price: props.price,
      }),
    );
  };

  return (
    <li className="meal">
      <div>
        <h3>{props.name}</h3>
        <div className="description">{props.description}</div>
        <div className="price">{props.price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
