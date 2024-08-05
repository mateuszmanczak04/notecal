'use client';

import Logout from '@/app/auth/_components/logout';
import ErrorMessage from '@/components/common/error-message';
import LoadingSpinner from '@/components/common/loading-spinner';
import { Separator } from '@/components/ui/separator';
import useEmailConfirmed from '../auth/_hooks/use-email-confirmed';
import ChangeEmailSetting from './_components/change-email-setting';
import ChangePasswordSetting from './_components/change-password-setting';
import DefaultNoteDurationSetting from './_components/default-note-duration-settings';
import DisplayedDaysSetting from './_components/displayed-days-setting';
import EmailNotConfirmed from './_components/email-not-confirmed';
import ThemeSetting from './_components/theme-setting';
import useSettings from './_hooks/use-settings';

const SettingsPage = () => {
	const { settings, isPending, error } = useSettings();
	const { emailConfirmed, isPending: emailConfirmedIsPending } =
		useEmailConfirmed();

	if (isPending) return <LoadingSpinner />;

	if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

	if (!settings) return null;

	return (
		<div className='mx-auto mb-32 flex max-w-[480px] flex-col gap-8'>
			<h1 className='text-3xl font-bold'>Settings</h1>
			{emailConfirmedIsPending && <LoadingSpinner />}
			{emailConfirmed === false && <EmailNotConfirmed />}
			<ChangeEmailSetting />
			<Separator className='bg-neutral-300' />
			<ChangePasswordSetting />
			<Separator className='bg-neutral-300' />
			<ThemeSetting />
			<Separator className='bg-neutral-300' />
			<DisplayedDaysSetting initialDisplayedDays={settings.displayedDays} />
			<Separator className='bg-neutral-300' />
			<DefaultNoteDurationSetting
				initialDefaultNoteDuration={settings.defaultNoteDuration}
			/>
			<Separator className='bg-neutral-300' />
			<Logout variant='secondary' />
		</div>
	);
};

export default SettingsPage;
