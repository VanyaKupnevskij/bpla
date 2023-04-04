import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/context';

export default function Navbar() {
  const auth = useContext(AuthContext);

  function handlerLogout(event) {
    event.preventDefault();
    auth.logout();
  }

  return (
    <nav>
      <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
        <span className="brand-logo">Скорочення посилань</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/create">Створити</NavLink>
          </li>
          <li>
            <NavLink to="/links">Посилання</NavLink>
          </li>
          <li>
            <a href="/" onClick={handlerLogout}>
              Вийти
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
