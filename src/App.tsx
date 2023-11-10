/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable max-len */
import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import {
  NavLink,
  Outlet,
  useNavigate,
} from 'react-router-dom';
import { AuthContext } from './components/AuthContext/AuthContext';
import { deAuthorizeInSystem } from './api/todos';
import { StaticticSidebar } from './components/Sidebar/StaticticSidebar';
import { MenuSidebar } from './components/Sidebar/MenuSidebar';
import { StorageSidebar } from './components/Sidebar/StorageSidebar';
import { ManageSidebar } from './components/Sidebar/ManageSidebar';

type Sidebar = {
  [key: string]: boolean,
};

export const App = () => {
  const navigate = useNavigate();
  const [widthNavbar, setNidthNavbar] = useState(3);
  const [isOpenedUserInfo, setIsOpenedUserInfo] = useState(false);
  const [windowWidth, setWindowWidth] = useState(() => window.innerWidth);
  const [sidebar, setSidebar] = useState<Sidebar>({
    statistic: false,
    menu: false,
    storage: false,
    manage: false,
  });
  const { userWithToken, logout } = useContext(AuthContext);

  const user = userWithToken?.user;
  const token = userWithToken?.token || '';
  const userName = user?.name.split(' ')[0] || '';

  useEffect(() => {
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth), false);
  }, []);

  const fullNavbar = (widthNavbar === 10 && windowWidth >= 1440) || windowWidth < 1440;

  const navbarStyles = {
    width: `${widthNavbar}vw`,
    // transition: 'all 0.3s ease',
    // overflow: widthNavbar === 10 ? 'hidden' : '',
  };

  const wrapperStyles = {
    width: `${widthNavbar}vw`,
    transition: 'all 0.3s ease-in-out',
    // overflow: widthNavbar === 10 ? 'hidden' : 'visible',
  };

  const navlinkStyle = {
    display: widthNavbar === 3 ? 'flex' : '',
    'justify-content': widthNavbar === 3 ? 'center' : '',
  };

  const changeUserInfo = () => {
    setIsOpenedUserInfo(!isOpenedUserInfo);
  };

  const closeUserInfo = () => {
    setIsOpenedUserInfo(false);
  };

  const logoutFromSystem = () => { // error !!! Danya should return object
    deAuthorizeInSystem(token)
      .then(() => logout()
        .then(() => {
          sessionStorage.removeItem('user');
          navigate('/');
        }));
  };

  const resetSidebar = () => {
    setSidebar({
      statistic: false,
      menu: false,
      storage: false,
      manage: false,
    });
  };

  const changeSidebar = (name: string) => {
    resetSidebar();
    closeUserInfo();

    setSidebar(prev => ({
      ...prev,
      [name]: !sidebar[name],
    }));
  };

  const changeWidthNavbar = (): void => {
    resetSidebar();
    closeUserInfo();

    if (widthNavbar === 3) {
      setNidthNavbar(10);
    } else {
      setNidthNavbar(3);
    }
  };

  return (

    <div className="fullpage">
      <div className="wrapper" style={wrapperStyles}>
        <nav className="navbar main-content has-background-light" style={navbarStyles}>
          <div className="navbar-brand navbar-brand--top">
            {
              fullNavbar && (
                <NavLink to="/" className="navbar-home">
                  <strong className="has-text-black-bis">
                    {
                      windowWidth >= 1440
                        ? 'StoreHouse'
                        : 'SH'
                    }
                  </strong>
                </NavLink>
              )
            }
            <div
              onClick={changeWidthNavbar}
              role="button"
              className={classNames('navbar-burger', {
                'is-active': widthNavbar === 10,
              })}
              aria-label="menu"
              aria-expanded="false"
              style={{ width: widthNavbar === 10 ? '30%' : '100%' }}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </div>
          </div>
          <div className="navbar-brand navbar-brand--middle">
            <aside className="menu">
              <ul className="menu-list">
                {/* home */}
                <li>
                  <NavLink to="/" className="m-auto" style={navlinkStyle}>
                    <span className="icon-text">
                      <span className="icon">
                        <i className="fas fa-home" />
                      </span>
                      {
                        widthNavbar === 10 && (
                          <p>Home</p>
                        )
                      }
                    </span>
                  </NavLink>
                </li>
                {/* Statictics */}
                <li>
                  {
                    widthNavbar === 10
                      ? (
                        <>
                          <a
                            onClick={() => changeSidebar('statistic')}
                            className={classNames({
                              'has-background-grey-lighter': sidebar.statistic,
                            })}
                          >
                            <span className="icon-text">
                              <span className="icon">
                                <i className="fas fa-signal" />
                              </span>
                              <p>Statistic</p>
                            </span>
                          </a>
                          {
                            sidebar.statistic && (
                              <StaticticSidebar fullSidebar={true as boolean} />
                            )
                          }
                        </>
                      ) : (
                        <div className="dropdown is-hoverable">
                          <div className="dropdown-trigger">
                            <span className="icon-text">
                              <span className="icon">
                                <i className="fas fa-signal" />
                              </span>
                            </span>
                          </div>
                          <div className="dropdown-menu" role="menu">
                            <StaticticSidebar />
                          </div>
                        </div>
                      )
                  }
                </li>
                {/* Menu */}
                <li>
                  {
                    widthNavbar === 10
                      ? (
                        <>
                          <a
                            onClick={() => changeSidebar('menu')}
                            className={classNames({
                              'has-background-grey-lighter': sidebar.menu,
                            })}
                          >
                            <span className="icon-text">
                              <span className="icon">
                                <i className="fas fa-list" />
                              </span>
                              <p>Menu</p>
                            </span>
                          </a>
                          {
                            sidebar.menu && (
                              <MenuSidebar fullSidebar={true as boolean} />
                            )
                          }
                        </>
                      ) : (
                        <div className="dropdown is-hoverable">
                          <div className="dropdown-trigger">
                            <span className="icon-text">
                              <span className="icon">
                                <i className="fas fa-list" />
                              </span>
                            </span>
                          </div>
                          <div className="dropdown-menu" role="menu">
                            <MenuSidebar />
                          </div>
                        </div>
                      )
                  }
                </li>
                {/* Storage */}
                <li>
                  {
                    widthNavbar === 10
                      ? (
                        <>
                          <a
                            onClick={() => changeSidebar('storage')}
                            className={classNames({
                              'has-background-grey-lighter': sidebar.storage,
                            })}
                          >
                            <span className="icon-text">
                              <span className="icon">
                                <i className="fas fa-box" />
                              </span>
                              <p>Storage</p>
                            </span>
                          </a>
                          {
                            sidebar.storage && (
                              <StorageSidebar fullSidebar={true as boolean} />
                            )
                          }
                        </>
                      ) : (
                        <div className="dropdown is-hoverable">
                          <div className="dropdown-trigger">
                            <span className="icon-text">
                              <span className="icon">
                                <i className="fas fa-box" />
                              </span>
                            </span>
                          </div>
                          <div className="dropdown-menu" role="menu">
                            <StorageSidebar />
                          </div>
                        </div>
                      )
                  }
                </li>
                {/* Manage */}
                <li>
                  {
                    widthNavbar === 10
                      ? (
                        <>
                          <a
                            onClick={() => changeSidebar('manage')}
                            className={classNames({
                              'has-background-grey-lighter': sidebar.manage,
                            })}
                          >
                            <span className="icon-text">
                              <span className="icon">
                                <i className="fas fa-chart-pie" />
                              </span>
                              <p>Manage</p>
                            </span>
                          </a>
                          {
                            sidebar.manage && (
                              <ManageSidebar fullSidebar={true as boolean} />
                            )
                          }
                        </>
                      ) : (
                        <div className="dropdown is-hoverable">
                          <div className="dropdown-trigger">
                            <span className="icon-text">
                              <span className="icon">
                                <i className="fas fa-chart-pie" />
                              </span>
                            </span>
                          </div>
                          <div className="dropdown-menu" role="menu">
                            <ManageSidebar />
                          </div>
                        </div>
                      )
                  }
                </li>
              </ul>
            </aside>

          </div>
          <div className="navbar-brand navbar-brand--bottom">
            <div
              className="user-information"
              role="button"
              onClick={changeUserInfo}
            >
              {
                widthNavbar === 10
                  ? (
                    <div className={classNames('dropdown is-up user-dropdown', {
                      'is-active': isOpenedUserInfo,
                    })}
                    >
                      <div className="user-name">
                        <span className="icon is-small">
                          <i
                            className={classNames('fas', {
                              'fa-angle-up': !isOpenedUserInfo,
                              'fa-angle-down': isOpenedUserInfo,
                            })}
                            aria-hidden="true"
                          />
                        </span>
                        <p>{userName}</p>
                      </div>
                      <div className="dropdown-trigger">
                        <button type="button" className="dropdown-button">
                          <div
                            role="button"
                            className="fas fa-user dropdown is-up"
                          />
                        </button>
                      </div>
                      <div className="dropdown-menu" role="menu">
                        <div className="dropdown-content">
                          <div className="dropdown-item">
                            <div
                              role="button"
                              onClick={logoutFromSystem}
                            >
                              <span className="icon">
                                <i className="fa fa-sign-out" />
                              </span>
                              Logout
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="dropdown is-hoverable">
                      <div className="dropdown-trigger">
                        <span className="icon-text">
                          <span className="icon">
                            <i className="fas fa-user" />
                          </span>
                        </span>
                      </div>
                      <div className="dropdown-menu" role="menu">
                        <div className="dropdown-content dropdown-empty">
                          <div className="dropdown-item">
                            <div
                              role="button"
                              onClick={logoutFromSystem}
                            >
                              <span className="icon">
                                <i className="fa fa-sign-out" />
                              </span>
                              Logout
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
              }
            </div>
          </div>
        </nav>
      </div>

      <div className="mainpage">
        <div className="mainpage_top">
          <strong className="mainpage_top--text">Welcome to StoreHouse!</strong>
        </div>
        <div className="mainpage_middle">
          <div className="section">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
