import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import Home from '../views/Home';

export default function AppRoutes() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}