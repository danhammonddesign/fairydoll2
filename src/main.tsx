import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import Showcase from './Showcase.tsx';
import './index.css';

const showcase = window.location.search.includes('showcase');

createRoot(document.getElementById('root')!).render(
  <StrictMode>{showcase ? <Showcase /> : <App />}</StrictMode>,
);
