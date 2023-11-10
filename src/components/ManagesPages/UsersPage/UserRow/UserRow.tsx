import React from 'react';
import './UserRow.scss';
import { ManagesUser } from '../../../../types/ManagesTypes/managesUser';

type Props = {
  user: ManagesUser;
};

const EMPTY = '—';

export const UserRow: React.FC<Props> = ({ user }) => {
  const {
    name,
    roleName,
    login,
    pinCode,
    lastLoginDate,
  } = user;

  return (
    <tr className="userRow">
      <td className="userColumn">
        {name || EMPTY}
      </td>
      <td className="userColumn">
        {roleName || EMPTY}
      </td>
      <td className="userColumn">
        {login || EMPTY}
      </td>
      <td className="userColumn">
        {pinCode}
      </td>
      <td className="userColumn">
        {lastLoginDate.toLocaleString()}
      </td>
    </tr>
  );
};
