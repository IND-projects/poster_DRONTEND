/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { AuthContext } from '../../AuthContext/AuthContext';
import './RolesPage.scss';
import { Loader } from '../../Loader';
import { ManagesRole } from '../../../types/ManagesTypes/managesRole';
import { getManagesRoles } from '../../../api/todos';
import { RoleRow } from './RoleRow/RoleRow';

type SortParam = 'name';

const getSortedRoles = (
  roles: ManagesRole[],
  param: SortParam,
  query: string,
  reversed: boolean,
) => {
  let sortedRoles = [...roles];

  if (query) {
    sortedRoles = sortedRoles
      .filter(role => role.name.toLocaleLowerCase()
        .includes(query.toLocaleLowerCase()));
  }

  switch (param) {
    case 'name':
      sortedRoles = reversed
        ? sortedRoles.sort(
          (role1, role2) => role2[param].localeCompare(role1[param]),
        )
        : sortedRoles.sort(
          (role1, role2) => role1[param].localeCompare(role2[param]),
        );

      break;

    default:
      break;
  }

  return sortedRoles;
};

export const RolesPage = () => {
  const [roles, setRoles] = useState<ManagesRole[]>([]);
  const [query, setQuery] = useState<string>('');
  const [param, setParam] = useState<SortParam>('name');
  const [reversed, setReversed] = useState<boolean>(false);
  const [sortedRoles, setSortedRoles] = useState<ManagesRole[]>([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [pageLoader, setPageLoader] = useState(false);

  const { userWithToken } = useContext(AuthContext);
  const token = userWithToken?.token || '';

  useEffect(() => {
    setPageLoader(true);

    getManagesRoles(token)
      .then(response => {
        setRoles(response);

        const newUsers = getSortedRoles(response, param, query, reversed);

        setSortedRoles(newUsers);
      })
      .catch(() => setErrorMessage(true))
      .finally(() => setPageLoader(false));
  }, []);

  useEffect(() => {
    const newRoles = getSortedRoles(roles, param, query, reversed);

    setSortedRoles(newRoles);
  }, [param, query, reversed]);

  const setSortedParam = (newParam: SortParam) => {
    setReversed(param === newParam ? !reversed : false);

    setParam(newParam);
  };

  const inputChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  return (
    <div className="rolespage">
      <div className="rolespage_sort">
        <div className="rolespage_sort--info">
          <div className="rolespage_sort--title">
            <p className="rolespage_sort--title--header">
              Roles:
            </p>
            <p className="rolespage_sort--title--counter">
              {roles.length}
            </p>
          </div>

          <div className="rolespage_sort--query field">
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
            <table className="table rolespage_sort--table">
              <thead className="table rolespage_sort--table--head">
                <tr className="table rolespage_sort--table--head_tr">
                  <th className="rolespage_sort--table--head_th">
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
                      <span>Role Name</span>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="rolespage_table">
                {
                  sortedRoles.map(role => (
                    <RoleRow role={role} key={role.id} />
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
