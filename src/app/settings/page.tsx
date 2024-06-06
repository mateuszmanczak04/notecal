import Logout from '@/components/auth/logout';
import AmountOfDaysSetting from '@/components/settings/amount-of-days-setting';
import ChangePasswordSetting from '@/components/settings/change-password-setting';
import DarkModeSetting from '@/components/settings/dark-mode-setting';
import DefaultNoteDurationSetting from '@/components/settings/default-note-duration-settings';

const page = () => {
	return (
		<div className='flex flex-col gap-2'>
			<h1 className='text-2xl font-semibold'>Settings</h1>
			<ChangePasswordSetting />
			<DarkModeSetting />
			<AmountOfDaysSetting />
			<DefaultNoteDurationSetting />
			<Logout variant='default' />
		</div>
	);
};

export default page;