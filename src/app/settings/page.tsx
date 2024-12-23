import logout from '@/app/auth/_actions/logout';
import { Button } from '@/components/button';
import { getUser } from '@/utils/get-user';
import { LogOut } from 'lucide-react';
import { Metadata } from 'next';
import ChangeEmailSetting from './_components/change-email-setting';
import ChangePasswordSetting from './_components/change-password-setting';
import EmailNotConfirmed from './_components/email-not-confirmed';
import UpdateSettings from './_components/update-settings';

export const metadata: Metadata = {
	title: 'Settings',
	robots: {
		index: false,
	},
};

const page = async () => {
	const user = await getUser();

	// Should not occur in normal conditions
	if (!user) return logout();

	return (
		<main className='mx-auto mb-32 mt-4 flex max-w-[480px] flex-col gap-8'>
			<h1 className='text-3xl font-bold'>Settings</h1>
			{!user?.emailVerified && <EmailNotConfirmed emailConfirmed={!!user.emailVerified} email={user.email} />}

			{/* Change email */}
			<ChangeEmailSetting />

			{/* Change password */}
			<ChangePasswordSetting />

			{/* General settings */}
			<UpdateSettings
				displayedDays={user.displayedDays}
				defaultNoteDuration={user.defaultNoteDuration}
				language={user.language}
			/>

			{/* Logout button */}
			<Button variant='secondary' onClick={logout} className='w-full'>
				<LogOut className='h-4 w-4' />
				Logout
			</Button>
		</main>
	);
};

export default page;
