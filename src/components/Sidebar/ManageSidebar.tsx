import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';

type Props = {
  fullSidebar?: boolean,
};

export const ManageSidebar: React.FC<Props> = ({ fullSidebar = false }) => (
  <>
    {
      fullSidebar ? (
        <ul className="menu-list">

          <li>
            <NavLink to="/manage/clients">
              <p>Clients</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/manage/users">
              <p>Users</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/manage/roles">
              <p>Roles</p>
            </NavLink>
          </li>
        </ul>
      ) : (
        <div className="dropdown-content">
          <div className="dropdown-item">
            <NavLink to="/manage/clients">
              <p>Clients</p>
            </NavLink>
          </div>
          <div className="dropdown-item">
            <NavLink to="/manage/users">
              <p>Users</p>
            </NavLink>
          </div>
          <div className="dropdown-item">
            <NavLink to="/manage/roles">
              <p>Roles</p>
            </NavLink>
          </div>
        </div>
      )
    }
  </>
);
