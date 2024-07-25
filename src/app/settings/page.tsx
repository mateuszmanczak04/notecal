'use client';

import Logout from '@/app/auth/_components/logout';
import ErrorMessage from '@/components/common/error-message';
import LoadingSpinner from '@/components/common/loading-spinner';
import ChangePasswordSetting from './_components/change-password-setting';
import DefaultNoteDurationSetting from './_components/default-note-duration-settings';
import DisplayedDaysSetting from './_components/displayed-days-setting';
import ThemeSetting from './_components/theme-setting';
import useSettings from './_hooks/use-settings';
import useEmailConfirmed from '../auth/_hooks/use-email-confirmed';
import EmailNotConfirmed from './_components/email-not-confirmed';

const SettingsPage = () => {
	const { settings, isPending, error } = useSettings();
	const { emailConfirmed } = useEmailConfirmed();

	if (isPending) return <LoadingSpinner />;

	if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

	if (!settings) return null;

	return (
		<div className='mx-auto mt-4 flex max-w-[480px] flex-col gap-4'>
			<h1 className='text-3xl font-bold'>Settings</h1>
			{emailConfirmed === false && <EmailNotConfirmed />}
			<ChangePasswordSetting />
			<ThemeSetting />
			<DisplayedDaysSetting initialDisplayedDays={settings.displayedDays} />
			<DefaultNoteDurationSetting
				initialDefaultNoteDuration={settings.defaultNoteDuration}
			/>
			<Logout variant='secondary' />
		</div>
	);
};

export default SettingsPage;
