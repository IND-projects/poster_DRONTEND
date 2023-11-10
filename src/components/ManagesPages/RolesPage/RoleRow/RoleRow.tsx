import React from 'react';
import './RoleRow.scss';
import { ManagesRole } from '../../../../types/ManagesTypes/managesRole';

type Props = {
  role: ManagesRole;
};

const EMPTY = '—';

export const RoleRow: React.FC<Props> = ({ role }) => {
  const {
    name,
  } = role;

  return (
    <tr className="roleRow">
      <td className="roleColumn">
        {name || EMPTY}
      </td>
    </tr>
  );
};
