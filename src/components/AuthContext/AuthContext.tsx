/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { LoginnedUser } from '../../types/loginUser';

export const AuthContext = React.createContext({
  authorized: false,
  login: (loginnedUser: LoginnedUser) => Promise.resolve(),
  user: null as LoginnedUser | null,
});

type Props = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);
  const [user, setUser] = useState<LoginnedUser | null>(null);

  async function login(loginnedUser: LoginnedUser) {
    if (!loginnedUser) {
      throw new Error('Wrong');
    }

    setUser(loginnedUser);
    setAuthorized(true);
  }

  return (
    <AuthContext.Provider value={{ authorized, login, user }}>
      {children}
    </AuthContext.Provider>
  );
};
