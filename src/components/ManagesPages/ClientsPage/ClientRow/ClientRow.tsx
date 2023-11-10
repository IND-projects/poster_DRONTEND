import React from 'react';
import './ClientRow.scss';
import { ManagesClient } from '../../../../types/ManagesTypes/managesClient';

type Props = {
  client: ManagesClient;
};

export const ClientRow: React.FC<Props> = ({ client }) => {
  const {
    fullName,
    mobilePhone,
    bankCard,
    receiptSum,
  } = client;

  return (
    <tr className="clientRow">
      <td className="clientColumn">
        {fullName}
      </td>
      <td className="clientColumn">
        {mobilePhone}
      </td>
      <td className="clientColumn">
        {bankCard}
      </td>
      <td className="clientColumn">
        {receiptSum}
      </td>
    </tr>
  );
};
