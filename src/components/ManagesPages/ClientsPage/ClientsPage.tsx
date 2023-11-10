/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { AuthContext } from '../../AuthContext/AuthContext';
import './ClientsPage.scss';
import { Loader } from '../../Loader';
import { ClientRow } from './ClientRow/ClientRow';
import { ManagesClient } from '../../../types/ManagesTypes/managesClient';
import { getManagesClients } from '../../../api/todos';

type SortParam
  = 'fullName'
  | 'mobilePhone'
  | 'bankCard'
  | 'receiptSum';

const getSortedClients = (
  clients: ManagesClient[],
  param: SortParam,
  query: string,
  reversed: boolean,
) => {
  let sortedClients = [...clients];

  if (query) {
    sortedClients = sortedClients
      .filter(client => client.fullName.toLocaleLowerCase()
        .includes(query.toLocaleLowerCase()));
  }

  switch (param) {
    case 'mobilePhone':
    case 'bankCard':
    case 'receiptSum':
      sortedClients = reversed
        ? sortedClients.sort(
          (client1, client2) => Number(client2[param]) - Number(client1[param]),
        )
        : sortedClients.sort(
          (client1, client2) => Number(client1[param]) - Number(client2[param]),
        );

      break;

    case 'fullName':
      sortedClients = reversed
        ? sortedClients.sort(
          (client1, client2) => client2[param].localeCompare(client1[param]),
        )
        : sortedClients.sort(
          (client1, client2) => client1[param].localeCompare(client2[param]),
        );

      break;

    default:
      break;
  }

  return sortedClients;
};

export const ClientsPage = () => {
  const [clients, setClients] = useState<ManagesClient[]>([]);
  const [query, setQuery] = useState<string>('');
  const [param, setParam] = useState<SortParam>('fullName');
  const [reversed, setReversed] = useState<boolean>(false);
  const [sortedClients, setSortedClients] = useState<ManagesClient[]>([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [pageLoader, setPageLoader] = useState(false);

  const { userWithToken } = useContext(AuthContext);
  const token = userWithToken?.token || '';

  useEffect(() => {
    setPageLoader(true);

    getManagesClients(token)
      .then(response => {
        setClients(response);

        const newClients = getSortedClients(response, param, query, reversed);

        setSortedClients(newClients);
      })
      .catch(() => setErrorMessage(true))
      .finally(() => setPageLoader(false));
  }, []);

  useEffect(() => {
    const newClients = getSortedClients(clients, param, query, reversed);

    setSortedClients(newClients);
  }, [param, query, reversed]);

  const setSortedParam = (newParam: SortParam) => {
    setReversed(param === newParam ? !reversed : false);

    setParam(newParam);
  };

  const inputChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  return (
    <div className="clientspage">
      <div className="clientspage_sort">
        <div className="clientspage_sort--info">
          <div className="clientspage_sort--title">
            <p className="clientspage_sort--title--header">
              Clients:
            </p>
            <p className="clientspage_sort--title--counter">
              {clients.length}
            </p>
          </div>

          <div className="clientspage_sort--query field">
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
            <table className="table clientspage_sort--table">
              <thead className="table clientspage_sort--table--head">
                <tr className="table clientspage_sort--table--head_tr">
                  <th className="clientspage_sort--table--head_th">
                    <button
                      title="Name"
                      className="button is-primary "
                      type="button"
                      onClick={() => setSortedParam('fullName')}
                    >
                      <span className="icon is-small">
                        <i className={classNames('fas', {
                          'fa-angle-down': param !== 'fullName' || reversed,
                          'fa-angle-up': param === 'fullName' && !reversed,
                        })}
                        />
                      </span>
                      <span>Name</span>
                    </button>
                  </th>
                  <th className="clientspage_sort--table--head_th">
                    <button
                      title="Mobile Phone"
                      className="
                        button is-primary clientspage_sort--table--button
                        "
                      type="button"
                      onClick={() => setSortedParam('mobilePhone')}
                    >
                      <span className="icon is-small">
                        <i className={classNames('fas', {
                          'fa-angle-down': param !== 'mobilePhone'
                            || reversed,
                          'fa-angle-up': param === 'mobilePhone' && !reversed,
                        })}
                        />
                      </span>
                      <span>Mobile Phone</span>
                    </button>
                  </th>
                  <th className="clientspage_sort--table--head_th">
                    <button
                      title="Bank Card"
                      className="
                        button is-primary clientspage_sort--table--button
                        "
                      type="button"
                      onClick={() => setSortedParam('bankCard')}
                    >
                      <span className="icon is-small">
                        <i className={classNames('fas', {
                          'fa-angle-down': param !== 'bankCard' || reversed,
                          'fa-angle-up': param === 'bankCard' && !reversed,
                        })}
                        />
                      </span>
                      <span>Bank Card</span>
                    </button>

                  </th>
                  <th className="clientspage_sort--table--head_th">
                    <button
                      title="Receipt Sum"
                      className="
                        button is-primary clientspage_sort--table--button
                        "
                      type="button"
                      onClick={() => setSortedParam('receiptSum')}
                    >
                      <span className="icon is-small">
                        <i className={classNames('fas', {
                          'fa-angle-down': param !== 'receiptSum' || reversed,
                          'fa-angle-up': param === 'receiptSum' && !reversed,
                        })}
                        />
                      </span>
                      <span>Receipt Sum</span>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="clientspage_table">
                {
                  sortedClients.map(client => (
                    <ClientRow client={client} key={client.id} />
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
