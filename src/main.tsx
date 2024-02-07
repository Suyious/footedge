import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css'

import App from './App.tsx'
import Lobby from './pages/lobby'
import LobbyRoom from './pages/lobby/[id]/index.tsx';

import { SocketProvider } from './context/SocketProvider/index.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <>Error</>,
    children: [
      { path: "/lobby", element: <Lobby/> },
      { path: "/lobby/:id", element: <LobbyRoom/> },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SocketProvider>
      <RouterProvider router={router}/>
    </SocketProvider>
  </React.StrictMode>,
)
