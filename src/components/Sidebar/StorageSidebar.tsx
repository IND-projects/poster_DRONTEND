import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';

type Props = {
  fullSidebar?: boolean,
};

export const StorageSidebar: React.FC<Props> = ({ fullSidebar = false }) => (
  <>
    {
      fullSidebar ? (
        <ul className="menu-list">

          <li>
            <NavLink to="/storage/remains">
              <p>Remains</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/storage/supplies">
              <p>Supplies</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/storage/writeoffs">
              <p>Write-offs</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/storage/suppliers">
              <p>Suppliers</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/storage/writeoffcauses">
              <p>Write-off causes</p>
            </NavLink>
          </li>
        </ul>
      ) : (
        <div className="dropdown-content">
          <div className="dropdown-item">
            <NavLink to="/storage/remains">
              <p>Remains</p>
            </NavLink>
          </div>
          <div className="dropdown-item">
            <NavLink to="/storage/supplies">
              <p>Supplies</p>
            </NavLink>
          </div>
          <div className="dropdown-item">
            <NavLink to="/storage/writeoffs">
              <p>Write-offs</p>
            </NavLink>
          </div>
          <div className="dropdown-item">
            <NavLink to="/storage/suppliers">
              <p>Suppliers</p>
            </NavLink>
          </div>
          <div className="dropdown-item">
            <NavLink to="/storage/writeoffcauses">
              <p>Write-off causes</p>
            </NavLink>
          </div>
        </div>
      )
    }
  </>
);
