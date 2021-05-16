import React from 'react';

import mealsImage from '../../../assets/meals.jpg';
import CartButton from '../cart-button/cart-button.component';
import './header.style.scss';

const Header = ({ onOpen }) => {
  return (
    <>
      <header className="header">
        <h2>Food Recipies</h2>
        <CartButton onClick={onOpen} />
      </header>
      <div className="main-image">
        <img src={mealsImage} alt="Something went wrong" />
      </div>
    </>
  );
};

export default Header;
