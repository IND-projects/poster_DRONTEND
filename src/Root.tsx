/* eslint-disable max-len */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';

import { AuthProvider } from './components/AuthContext/AuthContext';
import { RequireAuth } from './components/RequireAuth/RequireAuth';
import { LoginPage } from './LoginPage/LoginPage';

import { HomePage } from './components/HomePage/HomePage';

import { ClientsPage as StatisticsClientsPage } from './components/StatisticsPages/ClientsPage/ClientsPage';
import { EmployeesPage } from './components/StatisticsPages/EmployeesPage/EmployeesPage';
import { ProductsPage } from './components/StatisticsPages/ProductsPage/ProductsPage';
import { ReceiptsPage } from './components/StatisticsPages/ReceiptsPage/ReceiptsPage';

import { ClientsPage as ManagesClientsPage } from './components/ManagesPages/ClientsPage/ClientsPage';
import { UsersPage } from './components/ManagesPages/UsersPage/UsersPage';
import { RolesPage } from './components/ManagesPages/RolesPage/RolesPage';

export const Root = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<RequireAuth />}>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />

            <Route path="statistic">
              <Route path="clients" element={<StatisticsClientsPage />} />
              <Route path="employees" element={<EmployeesPage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="receipts" element={<ReceiptsPage />} />
            </Route>

            <Route path="storage">
              {/* <Route path="remains" element={<ManagesClientsPage />} />
              <Route path="supplies" element={<UsersPage />} />
              <Route path="writeoffs" element={<RolesPage />} />
              <Route path="suppliers" element={<RolesPage />} />
              <Route path="writeoffcauses" element={<RolesPage />} /> */}
            </Route>

            <Route path="manage">
              <Route path="clients" element={<ManagesClientsPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="roles" element={<RolesPage />} />
            </Route>
          </Route>
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<p>Error Page</p>} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

// {/* <Provider store={store}> */ }
// {/* </Provider> */ }
