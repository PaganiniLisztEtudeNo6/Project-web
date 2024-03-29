import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Regis from './routes/Regis.jsx';
import Root from './routes/root';
import { MantineProvider } from '@mantine/core';
import Main from './routes/Main';
import My from './routes/My';
import Setting from './routes/Setting';

import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
  },
  {
    path: "/signup",
    element: <Regis/>,
  },
  {
    path: "/Menu",
    element: <Main/>,
  },
  {
    path: "/MyAccount",
    element:<My/>,
  },
  {
    path: "/Setting",
    element:<Setting/>,
  }

]);



ReactDOM.createRoot(document.getElementById("root")).render(
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </MantineProvider>
);

reportWebVitals();
