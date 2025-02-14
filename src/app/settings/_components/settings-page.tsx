'use client';

import logout from '@/app/auth/_actions/logout';
import { Button } from '@/components/button';
import { LogOut } from 'lucide-react';
import ChangeEmailSetting from './change-email-setting';
import ChangePasswordSetting from './change-password-setting';
import EmailNotConfirmed from './email-not-confirmed';

const SettingsPage = () => {
	return (
		<main className='mx-auto mb-32 mt-4 flex max-w-[480px] flex-col gap-8'>
			<h1 className='text-3xl font-bold'>Settings</h1>
			<EmailNotConfirmed />
			<ChangeEmailSetting />
			<ChangePasswordSetting />

			{/* Logout button */}
			<Button variant='secondary' onClick={logout} className='w-full'>
				<LogOut className='h-4 w-4' />
				Logout
			</Button>
		</main>
	);
};

export default SettingsPage;
