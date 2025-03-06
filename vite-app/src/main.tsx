import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App.tsx';
import ConfirmEmailPage from './components/auth/confirm-email/ConfirmEmailPage.tsx';
import ForgotPasswordPage from './components/auth/forgot-password/ForgotPasswordPage.tsx';
import LoginPage from './components/auth/login/LoginPage.tsx';
import RegisterPage from './components/auth/register/RegisterPage.tsx';
import ResetPasswordPage from './components/auth/reset-password/ResetPasswordPage.tsx';
import CalendarPage from './components/calendar/CalendarPage.tsx';
import CoursesPage from './components/courses/CoursesPage.tsx';
import Layout from './components/Layout.tsx';
import NotesPage from './components/notes/NotesPage.tsx';
import Providers from './components/providers.tsx';
import SettingsPage from './components/settings/SettingsPage.tsx';
import TasksPage from './components/tasks/TasksPage.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Providers>
			<BrowserRouter>
				<Routes>
					<Route element={<Layout />}>
						<Route path='/' element={<App />} />
						<Route path='/calendar' element={<CalendarPage />} />
						<Route path='/tasks' element={<TasksPage />} />
						<Route path='/courses' element={<CoursesPage />} />
						<Route path='/settings' element={<SettingsPage />} />
						<Route path='/notes/:id' element={<NotesPage />} />
						<Route path='/auth/login' element={<LoginPage />} />
						<Route path='/auth/register' element={<RegisterPage />} />
						<Route path='/auth/forgot-password' element={<ForgotPasswordPage />} />
						<Route path='/auth/confirm-email' element={<ConfirmEmailPage />} />
						<Route path='/auth/reset-password' element={<ResetPasswordPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</Providers>
	</StrictMode>,
);
