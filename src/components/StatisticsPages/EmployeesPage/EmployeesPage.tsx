/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { AuthContext } from '../../AuthContext/AuthContext';
import './EmployeesPage.scss';
import { Loader } from '../../Loader';
import { StatisticsEmployee }
  from '../../../types/StatisticsTypes/statisticsEmployee';
import { getStatisticsEmployees } from '../../../api/todos';
import { EmployeeRow } from './EmployeeRow/EmployeeRow';

type SortParam = 'name';

const getSortedEmployees = (
  employees: StatisticsEmployee[],
  param: SortParam,
  query: string,
  reversed: boolean,
) => {
  let sortedEmployees = [...employees];

  if (query) {
    sortedEmployees = sortedEmployees
      .filter(employee => employee.name.toLocaleLowerCase()
        .includes(query.toLocaleLowerCase()));
  }

  switch (param) {
    // case 'lastLoginDate':

    case 'name':
      sortedEmployees = reversed
        ? sortedEmployees.sort(
          (user1, user2) => user2[param].localeCompare(user1[param]),
        )
        : sortedEmployees.sort(
          (user1, user2) => user1[param].localeCompare(user2[param]),
        );

      break;

    default:
      break;
  }

  return sortedEmployees;
};

export const EmployeesPage = () => {
  const [employees, setEmployees] = useState<StatisticsEmployee[]>([]);
  const [query, setQuery] = useState<string>('');
  const [param, setParam] = useState<SortParam>('name');
  const [reversed, setReversed] = useState<boolean>(false);
  const [sortedEmployees, setSortedEmployees]
    = useState<StatisticsEmployee[]>([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [pageLoader, setPageLoader] = useState(false);

  const { userWithToken } = useContext(AuthContext);
  const token = userWithToken?.token || '';

  useEffect(() => {
    setPageLoader(true);

    getStatisticsEmployees(token)
      .then(response => {
        setEmployees(response);

        const newEmployees
          = getSortedEmployees(response, param, query, reversed);

        setSortedEmployees(newEmployees);
      })
      .catch(() => setErrorMessage(true))
      .finally(() => setPageLoader(false));
  }, []);

  useEffect(() => {
    const newEmployees = getSortedEmployees(employees, param, query, reversed);

    setSortedEmployees(newEmployees);
  }, [param, query, reversed]);

  const setSortedParam = (newParam: SortParam) => {
    setReversed(param === newParam ? !reversed : false);

    setParam(newParam);
  };

  const inputChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  return (
    <div className="employeespage">
      <div className="employeespage_sort">
        <div className="employeespage_sort--info">
          <div className="employeespage_sort--title">
            <p className="employeespage_sort--title--header">
              Employees:
            </p>
            <p className="employeespage_sort--title--counter">
              {employees.length}
            </p>
          </div>

          <div className="employeespage_sort--query field">
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
            <table className="table employeespage_sort--table">
              <thead className="table employeespage_sort--table--head">
                <tr className="table employeespage_sort--table--head_tr">
                  <th className="employeespage_sort--table--head_th">
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
                </tr>
              </thead>
              <tbody className="employeespage_table">
                {
                  sortedEmployees.map(employee => (
                    <EmployeeRow employee={employee} key={employee.id} />
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
