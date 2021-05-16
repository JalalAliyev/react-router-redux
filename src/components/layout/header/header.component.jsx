import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './header.style.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Great Quotes</Link>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/quotes">All Quotes</NavLink>
          </li>
          <li>
            <NavLink to="/new-quote">Add a Quote</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
