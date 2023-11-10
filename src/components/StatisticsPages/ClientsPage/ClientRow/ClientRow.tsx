import React from 'react';
import './S_ClientRow.scss';
import { StatisticsClient }
  from '../../../../types/StatisticsTypes/statisticsClient';

type Props = {
  client: StatisticsClient;
};

const EMPTY = '—';

export const ClientRow: React.FC<Props> = ({ client }) => {
  const {
    fullName,
    mobilePhone,
    byCardSum,
    byCashSum,
    receiptsCount,
    averageReceiptSum,
  } = client;

  return (
    <tr className="S_clientRow">
      <td className="S_clientColumn">
        {fullName || EMPTY}
      </td>
      <td className="S_clientColumn">
        {mobilePhone || EMPTY}
      </td>
      <td className="S_clientColumn">
        {byCardSum || EMPTY}
      </td>
      <td className="S_clientColumn">
        {byCashSum || EMPTY}
      </td>
      <td className="S_clientColumn">
        {receiptsCount || EMPTY}
      </td>
      <td className="S_clientColumn">
        {averageReceiptSum || EMPTY}
      </td>
    </tr>
  );
};
