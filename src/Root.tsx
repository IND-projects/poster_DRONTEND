import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { RequireAuth } from './components/RequireAuth/RequireAuth';
import { LoginPage } from './LoginPage/LoginPage';
import { AuthProvider } from './components/AuthContext/AuthContext';

export const Root = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<RequireAuth />}>
          <Route index element={<App />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

// {/* <Provider store={store}> */ }
// {/* </Provider> */ }
