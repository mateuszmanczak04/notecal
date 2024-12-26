'use client';

import { useAppContext } from '@/app/_components/app-context';
import logout from '@/app/auth/_actions/logout';
import { Button } from '@/components/button';
import { LogOut } from 'lucide-react';
import ChangeEmailSetting from './change-email-setting';
import ChangePasswordSetting from './change-password-setting';
import EmailNotConfirmed from './email-not-confirmed';
import UpdateSettings from './update-settings';

const SettingsPage = () => {
	const { settings, user } = useAppContext();

	return (
		<main className='mx-auto mb-32 mt-4 flex max-w-[480px] flex-col gap-8'>
			<h1 className='text-3xl font-bold'>Settings</h1>
			{!user.emailVerified && <EmailNotConfirmed emailConfirmed={!!user.emailVerified} email={user.email} />}

			{/* Change email */}
			<ChangeEmailSetting />

			{/* Change password */}
			<ChangePasswordSetting />

			{/* General settings */}
			<UpdateSettings
				displayedDays={settings.displayedDays}
				defaultNoteDuration={settings.defaultNoteDuration}
				language={settings.language}
			/>

			{/* Logout button */}
			<Button variant='secondary' onClick={logout} className='w-full'>
				<LogOut className='h-4 w-4' />
				Logout
			</Button>
		</main>
	);
};

export default SettingsPage;
