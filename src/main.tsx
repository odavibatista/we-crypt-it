import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Criptografia from './Criptografia.js';
import Descriptografia from './Descriptografia.js';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import TelaInicial from './TelaInicial.js';

const router = createBrowserRouter([
{
  path:'/',
  element:<TelaInicial/>,
},
  {
    path: '/Criptografia',
    element: <Criptografia />,
  },
  {
    path: '/Descriptografia',
    element: <Descriptografia />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);