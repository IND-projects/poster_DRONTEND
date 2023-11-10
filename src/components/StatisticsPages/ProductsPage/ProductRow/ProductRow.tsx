import React from 'react';
import './ProductRow.scss';
import { StatisticsProduct }
  from '../../../../types/StatisticsTypes/statisticsProduct';

type Props = {
  product: StatisticsProduct;
};

const EMPTY = '—';

export const ProductRow: React.FC<Props> = ({ product }) => {
  const {
    name,
  } = product;

  return (
    <tr className="productRow">
      <td className="productColumn">
        {name || EMPTY}
      </td>
      {/* <td className="productColumn">
        {mobilePhone}
      </td>
      <td className="productColumn">
        {byCardSum}
      </td>
      <td className="productColumn">
        {byCashSum}
      </td>
      <td className="productColumn">
        {receiptsCount}
      </td>
      <td className="productColumn">
        {averageReceiptSum}
      </td> */}
    </tr>
  );
};
