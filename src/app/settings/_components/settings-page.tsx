'use client';

import Logout from '@/app/auth/_components/logout';
import ErrorMessage from '@/components/common/error-message';
import LoadingSpinner from '@/components/common/loading-spinner';
import { Separator } from '@/components/ui/separator';
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
			<DisplayedDaysSetting
				initialDisplayedDays={settings.displayedDays}
			/>
			<Separator />
			<DefaultNoteDurationSetting
				initialDefaultNoteDuration={settings.defaultNoteDuration}
			/>
			<Separator />
			<Logout variant='secondary' />
		</div>
	);
};

export default SettingsPage;
