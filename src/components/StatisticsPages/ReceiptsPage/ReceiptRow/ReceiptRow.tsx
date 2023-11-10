import React from 'react';
import './ReceiptRow.scss';
import { StatisticsReceipt }
  from '../../../../types/StatisticsTypes/statisticsReceipt';

type Props = {
  receipt: StatisticsReceipt;
};
const EMPTY = '—';

export const ReceiptRow: React.FC<Props> = ({ receipt }) => {
  const {
    name,
  } = receipt;

  return (
    <tr className="receiptRow">
      <td className="receiptColumn">
        {name || EMPTY}
      </td>
      {/* <td className="receiptColumn">
        {mobilePhone}
      </td>
      <td className="receiptColumn">
        {byCardSum}
      </td>
      <td className="receiptColumn">
        {byCashSum}
      </td>
      <td className="receiptColumn">
        {receiptsCount}
      </td>
      <td className="receiptColumn">
        {averageReceiptSum}
      </td> */}
    </tr>
  );
};
