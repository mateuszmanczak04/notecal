'use client';

import logout from '@/app/auth/_actions/logout';
import ErrorMessage from '@/components/common/error-message';
import LoadingSpinner from '@/components/common/loading-spinner';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { LogOut } from 'lucide-react';
import useEmailConfirmed from '../../auth/_hooks/use-email-confirmed';
import useSettings from '../_hooks/use-settings';
import ChangeEmailSetting from './change-email-setting';
import ChangePasswordSetting from './change-password-setting';
import DefaultNoteDurationSetting from './default-note-duration-settings';
import DisplayedDaysSetting from './displayed-days-setting';
import EmailNotConfirmed from './email-not-confirmed';

const SettingsPage = () => {
	const { settings, isPending, error } = useSettings();
	const { emailConfirmed } = useEmailConfirmed();

	if (isPending) return <LoadingSpinner />;

	if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

	if (!settings) return null;

	return (
		<div className='mx-auto mb-32 mt-4 flex max-w-[480px] flex-col gap-8'>
			<h1 className='text-3xl font-bold'>Settings</h1>
			{emailConfirmed === false && <EmailNotConfirmed />}
			<ChangeEmailSetting />
			<Separator />
			<ChangePasswordSetting />
			<Separator />
			<DisplayedDaysSetting initialDisplayedDays={settings.displayedDays} />
			<Separator />
			<DefaultNoteDurationSetting initialDefaultNoteDuration={settings.defaultNoteDuration} />
			<Separator />

			{/* Logout button */}
			<Button variant='secondary' onClick={logout} className='w-full'>
				<LogOut className='h-4 w-4' />
				Logout
			</Button>
		</div>
	);
};

export default SettingsPage;
