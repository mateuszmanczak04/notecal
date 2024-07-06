import Logout from '@/app/auth/_components/logout';
import AmountOfDaysSetting from './_components/amount-of-days-setting';
import ChangePasswordSetting from './_components/change-password-setting';
import ThemeSetting from './_components/theme-setting';
import DefaultNoteDurationSetting from './_components/default-note-duration-settings';

const page = () => {
	return (
		<div className='mx-auto mt-4 flex max-w-[480px] flex-col gap-4'>
			<h1 className='text-3xl font-bold'>Settings</h1>
			<ChangePasswordSetting />
			<ThemeSetting />
			<AmountOfDaysSetting />
			<DefaultNoteDurationSetting />
			<Logout variant='secondary' />
		</div>
	);
};

export default page;
