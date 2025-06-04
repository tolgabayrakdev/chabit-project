import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import { lazy, Suspense } from 'react';
import './index.css'
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import Loading from './components/loading';


const Home = lazy(()=> import('./pages/Home'));
const Login = lazy(() => import('./pages/authentication/login'));
const Register = lazy(() => import('./pages/authentication/register'));


createRoot(document.getElementById('root')!).render(
  <MantineProvider>
    <Notifications position='bottom-center' />
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  </MantineProvider>

)
