/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { AuthContext } from '../../AuthContext/AuthContext';
import './ProductsPage.scss';
import { getStatisticsProducts } from '../../../api/todos';
import { Loader } from '../../Loader';
import { StatisticsProduct }
  from '../../../types/StatisticsTypes/statisticsProduct';
import { ProductRow } from './ProductRow/ProductRow';

type SortParam
  = 'name';

const getSortedProducts = (
  products: StatisticsProduct[],
  param: SortParam,
  query: string,
  reversed: boolean,
) => {
  let sortedProducts = [...products];

  if (query) {
    sortedProducts = sortedProducts
      .filter(product => product.name.toLocaleLowerCase()
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
      sortedProducts = reversed
        ? sortedProducts.sort(
          (product1, product2) => product2[param]
            .localeCompare(product1[param]),
        )
        : sortedProducts.sort(
          (product1, product2) => product1[param]
            .localeCompare(product2[param]),
        );

      break;

    default:
      break;
  }

  return sortedProducts;
};

export const ProductsPage = () => {
  const [products, setProducts] = useState<StatisticsProduct[]>([]);
  const [query, setQuery] = useState<string>('');
  const [param, setParam] = useState<SortParam>('name');
  const [reversed, setReversed] = useState<boolean>(false);
  const [sortedProducts, setSortedProducts] = useState<StatisticsProduct[]>([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [pageLoader, setPageLoader] = useState(false);

  const { userWithToken } = useContext(AuthContext);
  const token = userWithToken?.token || '';

  useEffect(() => {
    setPageLoader(true);

    getStatisticsProducts(token)
      .then(response => {
        setProducts(response);

        const newProducts = getSortedProducts(response, param, query, reversed);

        setSortedProducts(newProducts);
      })
      .catch(() => setErrorMessage(true))
      .finally(() => setPageLoader(false));
  }, []);

  useEffect(() => {
    const newProducts = getSortedProducts(products, param, query, reversed);

    setSortedProducts(newProducts);
  }, [param, query, reversed]);

  const setSortedParam = (newParam: SortParam) => {
    setReversed(param === newParam ? !reversed : false);

    setParam(newParam);
  };

  const inputChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  return (
    <div className="productspage">
      <div className="productspage_sort">
        <div className="productspage_sort--info">
          <div className="productspage_sort--title">
            <p className="productspage_sort--title--header">
              Products:
            </p>
            <p className="productspage_sort--title--counter">
              {products.length}
            </p>
          </div>

          <div className="productspage_sort--query field">
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
            <table className="table productspage_sort--table">
              <thead className="table productspage_sort--table--head">
                <tr className="table productspage_sort--table--head_tr">
                  <th className="productspage_sort--table--head_th">
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
                  {/* <th className="productspage_sort--table--head_th">
                    <button
                      title="Mobile Phone"
                      className="
                        button is-primary productspage_sort--table--button
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
                  <th className="productspage_sort--table--head_th">
                    <button
                      title="Card Sum"
                      className="
                        button is-primary productspage_sort--table--button
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
                  <th className="productspage_sort--table--head_th">
                    <button
                      title="Receipt Sum"
                      className="
                        button is-primary productspage_sort--table--button
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
                  <th className="productspage_sort--table--head_th">
                    <button
                      title="Receipts Count"
                      className="
                        button is-primary productspage_sort--table--button
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
                  <th className="productspage_sort--table--head_th">
                    <button
                      title="Receipt Sum"
                      className="
                        button is-primary productclientspage_sort--table--button
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
              <tbody className="productspage_table">
                {
                  sortedProducts.map(product => (
                    <ProductRow product={product} key={product.id} />
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
