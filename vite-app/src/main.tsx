import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import ConfirmEmailPage from './components/auth/confirm-email/confirm-email-page.tsx';
import ForgotPasswordPage from './components/auth/forgot-password/forgot-password-page.tsx';
import LoginPage from './components/auth/login/login-page.tsx';
import RegisterPage from './components/auth/register/register-page.tsx';
import ResetPasswordPage from './components/auth/reset-password/reset-password-page.tsx';
import CalendarPage from './components/calendar/calendar-page.tsx';
import CoursesPage from './components/courses/courses-page.tsx';
import Layout from './components/layout.tsx';
import NotesPage from './components/notes/notes-page.tsx';
import Providers from './components/providers.tsx';
import SettingsPage from './components/settings/settings-page.tsx';
import TasksPage from './components/tasks/tasks-page.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Providers>
			<BrowserRouter>
				<Routes>
					<Route element={<Layout />}>
						<Route path='/calendar' element={<CalendarPage />} />
						<Route path='/tasks' element={<TasksPage />} />
						<Route path='/courses' element={<CoursesPage />} />
						<Route path='/settings' element={<SettingsPage />} />
						<Route path='/notes' element={<NotesPage />} />
						<Route path='/auth/login' element={<LoginPage />} />
						<Route path='/auth/register' element={<RegisterPage />} />
						<Route path='/auth/forgot-password' element={<ForgotPasswordPage />} />
						<Route path='/auth/confirm-email' element={<ConfirmEmailPage />} />
						<Route path='/auth/reset-password' element={<ResetPasswordPage />} />
						<Route path='/' element={<Navigate to='/calendar' />} />
						{/* TODO: catch all and show 404 page */}
					</Route>
				</Routes>
			</BrowserRouter>
		</Providers>
	</StrictMode>,
);
