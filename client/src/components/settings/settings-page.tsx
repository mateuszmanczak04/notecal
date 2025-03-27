import ChangeEmailSetting from './components/change-email-setting';
import ChangePasswordSetting from './components/change-password-setting';
import EmailNotVerified from './components/email-not-verified';
import LogoutButton from './components/logout-button';

const SettingsPage = () => {
	return (
		<main className='mx-auto mb-32 mt-8 flex max-w-lg flex-col gap-8'>
			<title>Settings</title>
			<h1 className='text-3xl font-bold'>Settings</h1>
			<EmailNotVerified />
			<ChangeEmailSetting />
			<ChangePasswordSetting />
			<LogoutButton />
		</main>
	);
};

export default SettingsPage;
