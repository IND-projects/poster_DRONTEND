/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext/AuthContext';
import './LoginPage.scss';
import { authorizeInSystem } from '../api/todos';
import { LoginnedUser } from '../types/loginUser';
import { UserWithToken } from '../types/userWithToken';
import { Loader } from '../components/Loader';

export const LoginPage: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isEnteredUserName, setIsEnteredUserName] = useState(true);
  const [isEnteredPassword, setIsEnteredPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [pageLoader, setPageLoader] = useState(true);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { state } = useLocation();

  const authorize = (user: LoginnedUser) => {
    authorizeInSystem(user)
      .then(response => login(response as UserWithToken)
        .then(() => {
          sessionStorage.setItem('user', JSON.stringify(user));
          navigate(state?.pathname || '/', { replace: true });
        }))
      .catch(() => setErrorMessage(true))
      .finally(() => setButtonLoader(false));
  };

  useEffect(() => {
    setPageLoader(true);

    try {
      const createdUser = sessionStorage.getItem('user');

      if (createdUser) {
        authorize(JSON.parse(createdUser));
      }
    } finally {
      setTimeout(() => {
        setPageLoader(false);
        inputRef.current?.focus();
      }, 300);
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(false);

    if (!userName) {
      setIsEnteredUserName(false);
    }

    if (!password) {
      setIsEnteredPassword(false);
    }

    if (userName && password) {
      setButtonLoader(true);

      const loginnedUser: LoginnedUser = {
        login: userName.trim(),
        password: password.trim(),
      };

      authorize(loginnedUser);
    }
  };

  const handleUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
    setIsEnteredUserName(true);
    setErrorMessage(false);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setIsEnteredPassword(true);
    setErrorMessage(false);
  };

  const closeNotification = () => {
    setErrorMessage(false);
  };

  return (
    <div className="login_page">
      {
        pageLoader
          ? (<Loader />)
          : (
            <div className="card has-background-warning-light">
              <form className="login_form" onSubmit={handleSubmit}>
                <div className="login_form--fields">
                  <div className="field">
                    <label className="label">Username</label>
                    <div className="control has-icons-left has-icons-right">
                      <input
                        className={classNames('input', {
                          'is-danger': !isEnteredUserName,
                        })}
                        type="text"
                        placeholder="Username"
                        value={userName}
                        onChange={handleUserName}
                        ref={inputRef}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-user" />
                      </span>
                      {
                        !isEnteredUserName && (
                          <p className="help is-danger">
                            You should enter username
                          </p>
                        )
                      }
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control has-icons-left has-icons-right">
                      <input
                        className={classNames('input', {
                          'is-danger': !isEnteredPassword,
                        })}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePassword}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-key" />
                      </span>
                    </div>
                    {
                      !isEnteredPassword && (
                        <p className="help is-danger">
                          You should enter password
                        </p>
                      )
                    }
                  </div>
                  <div className="field mt-4">
                    <div className="control">
                      <button
                        type="submit"
                        className={classNames('button is-link', {
                          'is-loading': buttonLoader,
                        })}
                      >
                        Enter
                      </button>
                    </div>
                  </div>

                  {
                    errorMessage && (
                      <div className="notification is-danger mt-5">
                        <button
                          className="delete"
                          type="button"
                          onClick={closeNotification}
                        />
                        <label>Something went wrong</label>
                      </div>
                    )
                  }
                </div>
                <div className="login_form--img">
                  <img
                    // src="https://avatars.githubusercontent.com/u/63656944?v=4"
                    // eslint-disable-next-line max-len
                    src="https://images.squarespace-cdn.com/content/v1/5c94fb9cfb22a522549e13db/a4391bdd-b3d3-4351-a3e3-6b8fe831f176/STOREHOUSE.png"
                    alt="storehouse_image"
                  />
                </div>
              </form>
            </div>
          )
      }
    </div>
  );
};
