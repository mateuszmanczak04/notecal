'use client';

import GoBackButton from '@/components/common/go-back-button';
import { useCalendarContext } from '../_context/calendar-context';
import { ArrowLeft } from 'lucide-react';

const Header = () => {
	const { currentFirstDay } = useCalendarContext();
	const currentMonth = currentFirstDay.toLocaleString('default', {
		month: 'long',
	});
	const currentYear = currentFirstDay.getFullYear();

	return (
		<div className='flex items-center gap-2'>
			<GoBackButton variant='secondary'>
				<ArrowLeft className='h-4 w-4' />
				Go back
			</GoBackButton>
			<h2 className='text-3xl font-bold'>
				{currentMonth} {currentYear}
			</h2>
		</div>
	);
};

export default Header;
