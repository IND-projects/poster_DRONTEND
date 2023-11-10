import React from 'react';
import './EmployeeRow.scss';
import { StatisticsEmployee }
  from '../../../../types/StatisticsTypes/statisticsEmployee';

type Props = {
  employee: StatisticsEmployee;
};

const EMPTY = '—';

export const EmployeeRow: React.FC<Props> = ({ employee }) => {
  const {
    name,
  } = employee;

  return (
    <tr className="employeeRow">
      <td className="employeeColumn">
        {name || EMPTY}
      </td>
      {/* <td className="employeeColumn">
        {roleName || EMPTY}
      </td>
      <td className="employeeColumn">
        {login || EMPTY}
      </td>
      <td className="employeeColumn">
        {pinCode}
      </td>
      <td className="employeeColumn">
        {lastLoginDate.toLocaleString()}
      </td> */}
    </tr>
  );
};
