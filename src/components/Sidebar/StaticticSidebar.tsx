import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';

type Props = {
  fullSidebar?: boolean,
};

export const StaticticSidebar: React.FC<Props> = ({ fullSidebar = false }) => (
  <>
    {
      fullSidebar ? (
        <ul className="menu-list">

          <li>
            <NavLink to="statistic/clients">
              <p>Clients</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/statistic/employees">
              <p>Employees</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/statistic/products">
              <p>Products</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/statistic/receipts">
              <p>Receipts</p>
            </NavLink>
          </li>
        </ul>
      ) : (
        <div className="dropdown-content">
          <div className="dropdown-item">
            <NavLink to="/statistic/clients">
              <p>Clients</p>
            </NavLink>
          </div>
          <div className="dropdown-item">
            <NavLink to="/statistic/employees">
              <p>Employees</p>
            </NavLink>
          </div>
          <div className="dropdown-item">
            <NavLink to="/statistic/products">
              <p>Products</p>
            </NavLink>
          </div>
          <div className="dropdown-item">
            <NavLink to="/statistic/receipts">
              <p>Receipts</p>
            </NavLink>
          </div>
        </div>
      )
    }
  </>
);
