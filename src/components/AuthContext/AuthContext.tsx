/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { UserWithToken } from '../../types/userWithToken';

export const AuthContext = React.createContext({
  authorized: false, // false
  login: (_loginnedUser: UserWithToken) => Promise.resolve(),
  logout: () => Promise.resolve(),
  userWithToken: null as UserWithToken | null,
});

type Props = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authorized, setAuthorized] = useState(false); // false
  const [userWithToken, setUserWithToken]
    = useState<UserWithToken | null>(null);

  async function login(loginnedUser: UserWithToken) {
    if (!loginnedUser) {
      throw new Error('Wrong');
    }

    setUserWithToken(loginnedUser);
    setAuthorized(true);
  }

  async function logout() {
    setAuthorized(false);
  }

  return (
    <AuthContext.Provider value={{
      authorized,
      login,
      logout,
      userWithToken,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};
