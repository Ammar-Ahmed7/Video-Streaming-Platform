import React from 'react';
import './App.css';
import Home from './Pages/Home/Home';
import Watch from './Pages/Watch/Watch';
import AdminPage from './Pages/Admin/Admin';
import Login from './Pages/Login/Login';// Import the LoginSignup component
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const appRouter = createBrowserRouter([
  {
    path: '/', 
    element: <Login /> 
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/watch/:id',
    element: <Watch />
  },
  {
    path: '/admin',
    element: <AdminPage />
  }
]);

function App() {
  return (
    <RouterProvider router={appRouter} />
  );
}

export default App;
