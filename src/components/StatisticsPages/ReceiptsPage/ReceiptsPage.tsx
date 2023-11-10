/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { AuthContext } from '../../AuthContext/AuthContext';
import './ReceiptsPage.scss';
import { Loader } from '../../Loader';
import { ReceiptRow } from './ReceiptRow/ReceiptRow';
import { StatisticsReceipt }
  from '../../../types/StatisticsTypes/statisticsReceipt';
import { getStatisticsReceipts } from '../../../api/todos';

type SortParam
  = 'name';

const getSortedReceipts = (
  receipts: StatisticsReceipt[],
  param: SortParam,
  query: string,
  reversed: boolean,
) => {
  let sortedReceipts = [...receipts];

  if (query) {
    sortedReceipts = sortedReceipts
      .filter(receipt => receipt.name.toLocaleLowerCase()
        .includes(query.toLocaleLowerCase()));
  }

  switch (param) {
    // case 'mobilePhone':
    // case 'byCardSum':
    // case 'byCashSum':
    // case 'receiptsCount':
    // case 'averageReceiptSum':
    //   sortedClients = reversed
    //     ? sortedClients.sort(
    //       (client1, client2) => Number(client2[param]) - Number(client1[param]),
    //     )
    //     : sortedClients.sort(
    //       (client1, client2) => Number(client1[param]) - Number(client2[param]),
    //     );

    //   break;

    case 'name':
      sortedReceipts = reversed
        ? sortedReceipts.sort(
          (receipt1, receipt2) => receipt2[param]
            .localeCompare(receipt1[param]),
        )
        : sortedReceipts.sort(
          (receipt1, receipt2) => receipt1[param]
            .localeCompare(receipt2[param]),
        );

      break;

    default:
      break;
  }

  return sortedReceipts;
};

export const ReceiptsPage = () => {
  const [receipts, setReceipts] = useState<StatisticsReceipt[]>([]);
  const [query, setQuery] = useState<string>('');
  const [param, setParam] = useState<SortParam>('name');
  const [reversed, setReversed] = useState<boolean>(false);
  const [sortedReceipts, setSortedReceipts] = useState<StatisticsReceipt[]>([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [pageLoader, setPageLoader] = useState(false);

  const { userWithToken } = useContext(AuthContext);
  const token = userWithToken?.token || '';

  useEffect(() => {
    setPageLoader(true);

    getStatisticsReceipts(token)
      .then(response => {
        setReceipts(response);

        const newReceipts = getSortedReceipts(response, param, query, reversed);

        setSortedReceipts(newReceipts);
      })
      .catch(() => setErrorMessage(true))
      .finally(() => setPageLoader(false));
  }, []);

  useEffect(() => {
    const newReceipts = getSortedReceipts(receipts, param, query, reversed);

    setSortedReceipts(newReceipts);
  }, [param, query, reversed]);

  const setSortedParam = (newParam: SortParam) => {
    setReversed(param === newParam ? !reversed : false);

    setParam(newParam);
  };

  const inputChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  return (
    <div className="receiptspage">
      <div className="receiptspage_sort">
        <div className="receiptspage_sort--info">
          <div className="receiptspage_sort--title">
            <p className="receiptspage_sort--title--header">
              Receipts:
            </p>
            <p className="receiptspage_sort--title--counter">
              {receipts.length}
            </p>
          </div>

          <div className="receiptspage_sort--query field">
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
            <table className="table receiptspage_sort--table">
              <thead className="table receiptspage_sort--table--head">
                <tr className="table receiptspage_sort--table--head_tr">
                  <th className="receiptspage_sort--table--head_th">
                    <button
                      title="Name"
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
                      <span>Name</span>
                    </button>
                  </th>
                  {/* <th className="receiptspage_sort--table--head_th">
                    <button
                      title="Mobile Phone"
                      className="
                        button is-primary receiptspage_sort--table--button
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
                  <th className="receiptspage_sort--table--head_th">
                    <button
                      title="Card Sum"
                      className="
                        button is-primary receiptspage_sort--table--button
                        "
                      type="button"
                      onClick={() => setSortedParam('byCardSum')}
                    >
                      <span className="icon is-small">
                        <i className={classNames('fas', {
                          'fa-angle-down': param !== 'byCardSum' || reversed,
                          'fa-angle-up': param === 'byCardSum' && !reversed,
                        })}
                        />
                      </span>
                      <span>Card Sum</span>
                    </button>

                  </th>
                  <th className="receiptspage_sort--table--head_th">
                    <button
                      title="Receipt Sum"
                      className="
                        button is-primary receiptspage_sort--table--button
                        "
                      type="button"
                      onClick={() => setSortedParam('byCashSum')}
                    >
                      <span className="icon is-small">
                        <i className={classNames('fas', {
                          'fa-angle-down': param !== 'byCashSum' || reversed,
                          'fa-angle-up': param === 'byCashSum' && !reversed,
                        })}
                        />
                      </span>
                      <span>Cash Sum</span>
                    </button>
                  </th>
                  <th className="receiptspage_sort--table--head_th">
                    <button
                      title="Receipts Count"
                      className="
                        button is-primary receiptspage_sort--table--button
                        "
                      type="button"
                      onClick={() => setSortedParam('receiptsCount')}
                    >
                      <span className="icon is-small">
                        <i className={classNames('fas', {
                          'fa-angle-down': param !== 'receiptsCount'
                            || reversed,
                          'fa-angle-up': param === 'receiptsCount'
                            && !reversed,
                        })}
                        />
                      </span>
                      <span>Receipts Count</span>
                    </button>
                  </th>
                  <th className="receiptspage_sort--table--head_th">
                    <button
                      title="Receipt Sum"
                      className="
                        button is-primary receiptclientspage_sort--table--button
                        "
                      type="button"
                      onClick={() => setSortedParam('averageReceiptSum')}
                    >
                      <span className="icon is-small">
                        <i className={classNames('fas', {
                          'fa-angle-down': param !== 'averageReceiptSum'
                            || reversed,
                          'fa-angle-up': param === 'averageReceiptSum'
                            && !reversed,
                        })}
                        />
                      </span>
                      <span>Receipt Sum</span>
                    </button>
                  </th> */}
                </tr>
              </thead>
              <tbody className="receiptspage_table">
                {
                  sortedReceipts.map(receipt => (
                    <ReceiptRow receipt={receipt} key={receipt.id} />
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
