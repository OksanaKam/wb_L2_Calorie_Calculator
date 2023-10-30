import React from 'react';
import '../assets/styles/Header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <h1 className='header__title'>Калькулятор калорий</h1>
      <div className='header__nav'>
        <Link className='header__nav-item' to='/'>
          Рацион
        </Link>
        <Link className='header__nav-item' to='/products'>
          Продукты
        </Link>
      </div>
    </header>
  );
}

export default Header;
