import ChangeEmailSetting from './change-email-setting';
import ChangePasswordSetting from './change-password-setting';
import EmailNotConfirmed from './email-not-confirmed';
import LogoutButton from './logout-button';

const SettingsPage = () => {
	return (
		<main className='mx-auto mb-32 mt-8 flex max-w-lg flex-col gap-8'>
			<h1 className='text-3xl font-bold'>Settings</h1>
			<EmailNotConfirmed />
			<ChangeEmailSetting />
			<ChangePasswordSetting />
			<LogoutButton />
		</main>
	);
};

export default SettingsPage;
