import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from './components/cart/cart/cart.component';
import Header from './components/layout/header/header.component';
import Meals from './components/meals/meals.component';
import { getCartFromDB, sendCartToDB } from './store/cart-thunk';

function App() {
  const [isCartShown, setIsCartShown] = useState(false);
  const { items, totalAmount, totalQuantity, changed } = useSelector(
    (state) => state.cart,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!changed) {
      dispatch(getCartFromDB());
    }
  }, [changed, dispatch]);

  useEffect(() => {
    if (changed) {
      dispatch(sendCartToDB({ items, totalAmount, totalQuantity }));
    }
  }, [items, totalAmount, totalQuantity, changed, dispatch]);

  const showCartHandler = () => {
    setIsCartShown(!isCartShown);
  };

  return (
    <>
      {isCartShown && <Card onClose={showCartHandler} />}
      <Header onOpen={showCartHandler} />
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
