import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import 'bulma/css/bulma.css';
// import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

const container = document.getElementById('root') as HTMLElement;

createRoot(container).render(
  <Root />,
);
