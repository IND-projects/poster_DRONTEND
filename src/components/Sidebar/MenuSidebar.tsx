import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';

type Props = {
  fullSidebar?: boolean,
};

export const MenuSidebar: React.FC<Props> = ({ fullSidebar = false }) => (
  <>
    {
      fullSidebar ? (
        <ul className="menu-list">
          <li>
            <NavLink to="/">
              <p>Products</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <p>Tech. Cards</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <p>Semifinished products</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <p>Ingredients</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <p>Categories of products and tech. cards</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <p>Categories of ingredients</p>
            </NavLink>
          </li>
        </ul>
      ) : (
        <div className="dropdown-content">
          <div className="dropdown-item">
            <NavLink to="/">
              <p>Products</p>
            </NavLink>
          </div>
          <div className="dropdown-item">
            <NavLink to="/">
              <p>Tech. Cards</p>
            </NavLink>
          </div>
          <div className="dropdown-item">
            <NavLink to="/">
              <p>Semifinished products</p>
            </NavLink>
          </div>
          <div className="dropdown-item">
            <NavLink to="/">
              <p>Ingredients</p>
            </NavLink>
          </div>
          <div className="dropdown-item">
            <NavLink to="/">
              <p>Categories of products and tech. cards</p>
            </NavLink>
          </div>
          <div className="dropdown-item">
            <NavLink to="/">
              <p>Categories of ingredients</p>
            </NavLink>
          </div>
        </div>
      )
    }
  </>
);
