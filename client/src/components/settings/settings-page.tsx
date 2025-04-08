import ChangeEmailSetting from './components/change-email-setting';
import ChangePasswordSetting from './components/change-password-setting';
import EmailNotVerified from './components/email-not-verified';
import LogoutButton from './components/logout-button';

const SettingsPage = () => {
	return (
		<main className='mx-auto flex max-w-lg flex-col gap-8 p-4 lg:mt-8'>
			<title>Settings</title>
			<EmailNotVerified />
			<ChangeEmailSetting />
			<ChangePasswordSetting />
			<LogoutButton />
		</main>
	);
};

export default SettingsPage;
