/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext/AuthContext';
import './LoginPage.scss';
import { authorizeInSystem } from '../api/todos';
import { LoginnedUser } from '../types/loginUser';

export const LoginPage: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isEnteredUserName, setIsEnteredUserName] = useState(true);
  const [isEnteredPassword, setIsEnteredPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [loader, setLoader] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
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
      setLoader(true);

      const loginnedUser = { login: userName, password };

      authorizeInSystem(loginnedUser)
        .then(response => login(response as LoginnedUser)
          .then(() => navigate('/')))
        .catch(() => setErrorMessage(true))
        .finally(() => setLoader(false));
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
    <div className="document">
      <div className="card has-background-warning-light">
        <form onSubmit={handleSubmit} className="m-auto">
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
                  <p className="help is-danger">You should enter username</p>
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
                <p className="help is-danger">You should enter password</p>
              )
            }
          </div>

          <div className="field">
            <div className="control">
              <button
                type="submit"
                className={classNames('button is-link', {
                  'is-loading': loader,
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
        </form>
        <figure className="image m-auto">
          <img
            src="https://avatars.githubusercontent.com/u/63656944?v=4"
            alt="login_image"
          />
        </figure>
      </div>
    </div>
  );
};
