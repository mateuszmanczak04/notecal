import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App.tsx';
import Layout from './components/Layout.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route path='/' element={<App />} />
					<Route path='/calendar' element={<App />} />
					<Route path='/tasks' element={<App />} />
					<Route path='/courses' element={<App />} />
					<Route path='/settings' element={<App />} />
					<Route path='/notes/:id' element={<App />} />
					<Route path='/auth/login' element={<App />} />
					<Route path='/auth/register' element={<App />} />
					<Route path='/auth/forgot-password' element={<App />} />
					<Route path='/auth/confirm-email' element={<App />} />
					<Route path='/auth/reset-password' element={<App />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
