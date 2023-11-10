import { User } from './user';

export type UserWithToken = {
  user: User,
  token: string,
};
