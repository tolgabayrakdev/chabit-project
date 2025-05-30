import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';


import Home from './pages/Home'

createRoot(document.getElementById('root')!).render(
  <MantineProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  </MantineProvider>

)
