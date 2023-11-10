/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { AuthContext } from '../../AuthContext/AuthContext';
import './UsersPage.scss';
import { UserRow } from './UserRow/UserRow';
import { getUsers } from '../../../api/todos';
import { Loader } from '../../Loader';
import { ManagesUser } from '../../../types/ManagesTypes/managesUser';

type SortParam = 'name' | 'roleName' | 'login' | 'pinCode' | 'lastLoginDate';

const getSortedUsers = (
  users: ManagesUser[],
  param: SortParam,
  query: string,
  reversed: boolean,
) => {
  let sortedUsers = [...users];

  if (query) {
    sortedUsers = sortedUsers
      .filter(user => user.name.toLocaleLowerCase()
        .includes(query.toLocaleLowerCase()));
  }

  switch (param) {
    // case 'lastLoginDate':

    case 'name':
    case 'roleName':
    case 'login':
      sortedUsers = reversed
        ? sortedUsers.sort(
          (user1, user2) => user2[param].localeCompare(user1[param]),
        )
        : sortedUsers.sort(
          (user1, user2) => user1[param].localeCompare(user2[param]),
        );

      break;

    case 'pinCode':
      sortedUsers = reversed
        ? sortedUsers.sort(
          (user1, user2) => Number(user2[param]) - Number(user1[param]),
        )
        : sortedUsers.sort(
          (user1, user2) => Number(user1[param]) - Number(user2[param]),
        );

      break;

    default:
      break;
  }

  return sortedUsers;
};

export const UsersPage = () => {
  const [users, setusers] = useState<ManagesUser[]>([]);
  const [query, setQuery] = useState<string>('');
  const [param, setParam] = useState<SortParam>('name');
  const [reversed, setReversed] = useState<boolean>(false);
  const [sortedUsers, setSortedUsers] = useState<ManagesUser[]>([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [pageLoader, setPageLoader] = useState(false);

  const { userWithToken } = useContext(AuthContext);
  const token = userWithToken?.token || '';

  useEffect(() => {
    setPageLoader(true);

    getUsers(token)
      .then(response => {
        setusers(response);

        const newUsers = getSortedUsers(response, param, query, reversed);

        setSortedUsers(newUsers);
      })
      .catch(() => setErrorMessage(true))
      .finally(() => setPageLoader(false));
  }, []);

  useEffect(() => {
    const newUsers = getSortedUsers(users, param, query, reversed);

    setSortedUsers(newUsers);
  }, [param, query, reversed]);

  const setSortedParam = (newParam: SortParam) => {
    setReversed(param === newParam ? !reversed : false);

    setParam(newParam);
  };

  const inputChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  return (
    <div className="userspage">
      <div className="userspage_sort">
        <div className="userspage_sort--info">
          <div className="userspage_sort--title">
            <p className="userspage_sort--title--header">
              Users:
            </p>
            <p className="userspage_sort--title--counter">
              {users.length}
            </p>
          </div>

          <div className="userspage_sort--query field">
            <p className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="text"
                placeholder="Search..."
                value={query}
                onChange={e => inputChange(e.target.value)}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-search" />
              </span>
            </p>
          </div>
        </div>

        {
          pageLoader && (<Loader />)
        }

        {
          !pageLoader && errorMessage && (
            <div className="notification is-danger mt-5">
              <label>Something went wrong</label>
            </div>
          )
        }

        {
          !pageLoader && !errorMessage && (
            <table className="table userspage_sort--table">
              <thead className="table userspage_sort--table--head">
                <tr className="table userspage_sort--table--head_tr">
                  <th className="userspage_sort--table--head_th">
                    <button
                      title="Full Name"
                      className="button is-primary "
                      type="button"
                      onClick={() => setSortedParam('name')}
                    >
                      <span className="icon is-small">
                        <i className={classNames('fas', {
                          'fa-angle-down': param !== 'name' || reversed,
                          'fa-angle-up': param === 'name' && !reversed,
                        })}
                        />
                      </span>
                      <span>Full Name</span>
                    </button>
                  </th>
                  <th className="userspage_sort--table--head_th">
                    <button
                      title="Role"
                      className="
                      button is-primary userspage_sort--table--button
                      "
                      type="button"
                      onClick={() => setSortedParam('roleName')}
                    >
                      <span className="icon is-small">
                        <i className={classNames('fas', {
                          'fa-angle-down': param !== 'roleName' || reversed,
                          'fa-angle-up': param === 'roleName' && !reversed,
                        })}
                        />
                      </span>
                      <span>Role</span>
                    </button>
                  </th>
                  <th className="userspage_sort--table--head_th">
                    <button
                      title="Login"
                      className="
                      button is-primary userspage_sort--table--button
                      "
                      type="button"
                      onClick={() => setSortedParam('login')}
                    >
                      <span className="icon is-small">
                        <i className={classNames('fas', {
                          'fa-angle-down': param !== 'login' || reversed,
                          'fa-angle-up': param === 'login' && !reversed,
                        })}
                        />
                      </span>
                      <span>Login</span>
                    </button>
                  </th>
                  <th className="userspage_sort--table--head_th">
                    <button
                      title="Pin"
                      className="
                      button is-primary userspage_sort--table--button
                      "
                      type="button"
                      onClick={() => setSortedParam('pinCode')}
                    >
                      <span className="icon is-small">
                        <i className={classNames('fas', {
                          'fa-angle-down': param !== 'pinCode' || reversed,
                          'fa-angle-up': param === 'pinCode' && !reversed,
                        })}
                        />
                      </span>
                      <span>Pin</span>
                    </button>
                  </th>
                  <th className="userspage_sort--table--head_th">
                    <button
                      title="Last Login"
                      className="
                      button is-primary userspage_sort--table--button
                      "
                      type="button"
                      onClick={() => setSortedParam('lastLoginDate')}
                    >
                      <span className="icon is-small">
                        <i className={classNames('fas', {
                          'fa-angle-down': param !== 'lastLoginDate'
                            || reversed,
                          'fa-angle-up': param === 'lastLoginDate' && !reversed,
                        })}
                        />
                      </span>
                      <span>Last Login</span>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="userspage_table">
                {
                  sortedUsers.map(user => (
                    <UserRow user={user} key={user.id} />
                  ))
                }
              </tbody>
            </table>
          )
        }
      </div>

    </div>
  );
};
