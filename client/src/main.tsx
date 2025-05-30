import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';


import Home from './pages/Home';
import Login from './pages/authentication/Login';
import Register from './pages/authentication/Register';


createRoot(document.getElementById('root')!).render(
  <MantineProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  </MantineProvider>

)
