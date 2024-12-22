import logout from '@/app/auth/_actions/logout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import db from '@/lib/db';
import { verifyToken } from '@/lib/jwt';
import { LogOut } from 'lucide-react';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ChangeEmailSetting from './_components/change-email-setting';
import ChangePasswordSetting from './_components/change-password-setting';
import EmailNotConfirmed from './_components/email-not-confirmed';

export const metadata: Metadata = {
	title: 'Settings',
	robots: {
		index: false,
	},
};

const page = async () => {
	const cookieStore = await cookies();
	const authToken = cookieStore.get('authToken')?.value || '';

	const decoded = await verifyToken(authToken);

	if (!decoded) {
		cookieStore.delete('authToken');
		redirect('/auth/login');
	}

	const user = await db.user.findUnique({
		where: {
			id: decoded.id,
		},
	});

	return (
		<div className='mx-auto mb-32 mt-4 flex max-w-[480px] flex-col gap-8'>
			<h1 className='text-3xl font-bold'>Settings</h1>
			{user?.emailVerified && <EmailNotConfirmed />}
			<ChangeEmailSetting />
			<Separator />

			<ChangePasswordSetting />
			<Separator />

			{/* <DisplayedDaysSetting initialDisplayedDays={settings.displayedDays} /> */}
			<Separator />

			{/* <DefaultNoteDurationSetting initialDefaultNoteDuration={settings.defaultNoteDuration} /> */}
			{/* <Separator /> */}

			{/* Logout button */}
			<Button variant='secondary' onClick={logout} className='w-full'>
				<LogOut className='h-4 w-4' />
				Logout
			</Button>
		</div>
	);
};

export default page;
