import { client } from '../utils/fetchClient';
import { LoginnedUser } from '../types/loginUser';

import { User } from '../types/user';
import { UserWithToken } from '../types/userWithToken';

import { StatisticsClient } from '../types/StatisticsTypes/statisticsClient';
import { StatisticsEmployee }
  from '../types/StatisticsTypes/statisticsEmployee';
import { StatisticsProduct } from '../types/StatisticsTypes/statisticsProduct';
import { StatisticsReceipt } from '../types/StatisticsTypes/statisticsReceipt';

import { StoragesRemain } from '../types/StoragesTypes/storagesRemain';
import { StoragesSupply } from '../types/StoragesTypes/storagesSupply';
import { StoragesWriteoff } from '../types/StoragesTypes/storagesWriteoff';
import { StoragesWriteoffcause }
  from '../types/StoragesTypes/storagesWriteoffcause';
import { StoragesSupplier } from '../types/StoragesTypes/storagesSupplier';

import { ManagesClient } from '../types/ManagesTypes/managesClient';
import { ManagesRole } from '../types/ManagesTypes/managesRole';
import { ManagesUser } from '../types/ManagesTypes/managesUser';

// #region account
export const authorizeInSystem = (
  user: LoginnedUser,
): Promise<UserWithToken | null> => {
  return client.post('/account/login', user);
};

export const deAuthorizeInSystem = (token: string) => {
  return client.get('/account/logout', token);
};
// #endregion

// #region statistic Page

export const getStatisticsClients = (
  token: string,
): Promise<StatisticsClient[]> => {
  return client.get('/stats/clients', token);
};

export const getStatisticsEmployees = (
  token: string,
): Promise<StatisticsEmployee[]> => {
  return client.get('/stats/employees', token);
};

export const getStatisticsProducts = (
  token: string,
): Promise<StatisticsProduct[]> => {
  return client.get('/stats/products', token);
};

export const getStatisticsReceipts = (
  token: string,
): Promise<StatisticsReceipt[]> => {
  return client.get('/stats/receipts', token);
};

// #endregion

// #region storage Page

export const getStoragesRemains = (
  token: string,
): Promise<StoragesRemain[]> => {
  return client.get('/storage/remains', token);
};

export const getStoragesSupplies = (
  token: string,
): Promise<StoragesSupply[]> => {
  return client.get('/storage/supplies', token);
};

export const getStoragesWriteoffs = (
  token: string,
): Promise<StoragesWriteoff[]> => {
  return client.get('/storage/writeoffs', token);
};

export const getStoragesSuppliers = (
  token: string,
): Promise<StoragesSupplier[]> => {
  return client.get('/storage/suppliers', token);
};

export const getStoragesWriteoffCauses = (
  token: string,
): Promise<StoragesWriteoffcause[]> => {
  return client.get('/storage/writeoffcauses', token);
};

// #endregion

// #region manage Page

export const getManagesClients = (
  token: string,
): Promise<ManagesClient[]> => {
  return client.get('/manage/clients', token);
};

export const getManagesUsers = (
  token: string,
): Promise<ManagesUser[]> => {
  return client.get('/manage/users', token);
};

export const getManagesRoles = (
  token: string,
): Promise<ManagesRole[]> => {
  return client.get('/manage/roles', token);
};

// #endregion

export const getUsers = (token: string): Promise<User[]> => {
  return client.get('/manage/users', token);
};

// export const createUser = (user: LoginnedUser) => {
//   return client.post('/manage/user/create', user);
// };

// export const getClients = (token: string): Promise<Client[]> => {
//   return client.get('/manage/clients', token);
// };
