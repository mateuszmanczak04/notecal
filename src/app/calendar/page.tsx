'use client';

import { CalendarContextProvider } from '@/components/calendar/calendar-context';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarPage = () => {
	const currentDate = new Date();
	const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
	const currentYear = currentDate.getFullYear();

	return (
		<CalendarContextProvider>
			<h2 className='text-3xl font-bold'>
				{currentMonth} {currentYear}
			</h2>
			<div className='mt-2 flex'>
				{/* hours column: */}
				<div className='w-20'>
					<div className='h-calendar-header flex font-semibold'>
						<div className='flex flex-1 cursor-pointer items-center justify-center rounded-tl-xl border hover:bg-gray-100'>
							<ChevronLeft className='h-5 w-5' />
						</div>
						<div className='flex flex-1 cursor-pointer items-center justify-center border-b border-r border-t hover:bg-gray-100'>
							<ChevronRight className='h-5 w-5' />
						</div>
					</div>
					<div className='h-calendar-row flex items-center justify-center border-b border-l border-r font-semibold text-gray-500'>
						00:00
					</div>
					<div className='h-calendar-row flex items-center justify-center border-b border-l border-r font-semibold text-gray-500'>
						01:00
					</div>
					<div className='h-calendar-row flex items-center justify-center border-b border-l border-r font-semibold text-gray-500'>
						02:00
					</div>
					<div className='h-calendar-row flex items-center justify-center border-b border-l border-r font-semibold text-gray-500'>
						03:00
					</div>
					<div className='h-calendar-row flex items-center justify-center border-b border-l border-r font-semibold text-gray-500'>
						04:00
					</div>
					<div className='h-calendar-row flex items-center justify-center border-b border-l border-r font-semibold text-gray-500'>
						05:00
					</div>
					<div className='h-calendar-row flex items-center justify-center border-b border-l border-r font-semibold text-gray-500'>
						06:00
					</div>
					<div className='h-calendar-row flex items-center justify-center border-b border-l border-r font-semibold text-gray-500'>
						07:00
					</div>
					<div className='h-calendar-row flex items-center justify-center border-b border-l border-r font-semibold text-gray-500'>
						08:00
					</div>
					<div className='h-calendar-row flex items-center justify-center border-b border-l border-r font-semibold text-gray-500'>
						09:00
					</div>
					<div className='h-calendar-row flex items-center justify-center border-b border-l border-r font-semibold text-gray-500'>
						10:00
					</div>
					<div className='h-calendar-row flex items-center justify-center border-b border-l border-r font-semibold text-gray-500'>
						11:00
					</div>
					<div className='h-calendar-row flex items-center justify-center border-b border-l border-r font-semibold text-gray-500'>
						12:00
					</div>
					<div className='h-calendar-row flex items-center justify-center border-b border-l border-r font-semibold text-gray-500'>
						13:00
					</div>
					<div className='h-calendar-row flex items-center justify-center border-b border-l border-r font-semibold text-gray-500'>
						14:00
					</div>
					<div className='h-calendar-row flex items-center justify-center border-b border-l border-r font-semibold text-gray-500'>
						15:00
					</div>
					<div className='h-calendar-row flex items-center justify-center border-b border-l border-r font-semibold text-gray-500'>
						16:00
					</div>
					<div className='h-calendar-row flex items-center justify-center border-b border-l border-r font-semibold text-gray-500'>
						17:00
					</div>
					<div className='h-calendar-row flex items-center justify-center border-b border-l border-r font-semibold text-gray-500'>
						18:00
					</div>
					<div className='h-calendar-row flex items-center justify-center border-b border-l border-r font-semibold text-gray-500'>
						19:00
					</div>
					<div className='h-calendar-row flex items-center justify-center border-b border-l border-r font-semibold text-gray-500'>
						20:00
					</div>
					<div className='h-calendar-row flex items-center justify-center border-b border-l border-r font-semibold text-gray-500'>
						21:00
					</div>
					<div className='h-calendar-row flex items-center justify-center border-b border-l border-r font-semibold text-gray-500'>
						22:00
					</div>
					<div className='h-calendar-row flex items-center justify-center rounded-bl-xl border-b border-l border-r font-semibold text-gray-500'>
						23:00
					</div>
				</div>
				{/* monday column: */}
				<div className='flex-1'>
					<div className='h-calendar-header flex items-center justify-center border-b border-r border-t font-semibold text-gray-500'>
						MON 11
					</div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
				</div>
				{/* tuesday column: */}
				<div className='flex-1'>
					<div className='h-calendar-header flex items-center justify-center border-b border-r border-t font-semibold text-gray-500'>
						TUE 11
					</div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
				</div>
				{/* wednesday column: */}
				<div className='flex-1'>
					<div className='h-calendar-header flex items-center justify-center border-b border-r border-t bg-gray-100 font-semibold'>
						WED 11
					</div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r bg-gray-50 font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r bg-gray-50 font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r bg-gray-50 font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r bg-gray-50 font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r bg-gray-50 font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r bg-gray-50 font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r bg-gray-50 font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r bg-gray-50 font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r bg-gray-50 font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r bg-gray-50 font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r bg-gray-50 font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r bg-gray-50 font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r bg-gray-50 font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r bg-gray-50 font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r bg-gray-50 font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r bg-gray-50 font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r bg-gray-50 font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r bg-gray-50 font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r bg-gray-50 font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r bg-gray-50 font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r bg-gray-50 font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r bg-gray-50 font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r bg-gray-50 font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r bg-gray-50 font-semibold text-gray-500'></div>
				</div>
				{/* thursday column: */}
				<div className='flex-1'>
					<div className='h-calendar-header flex items-center justify-center border-b border-r border-t font-semibold text-gray-500'>
						THU 11
					</div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
				</div>
				{/* friday column: */}
				<div className='flex-1'>
					<div className='h-calendar-header flex items-center justify-center rounded-tr-xl border-b border-r border-t font-semibold text-gray-500'>
						FRI 11
					</div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center border-b border-r font-semibold text-gray-500'></div>
					<div className='h-calendar-row flex items-center justify-center rounded-br-xl border-b border-r font-semibold text-gray-500'></div>
				</div>
			</div>
		</CalendarContextProvider>
	);
};

export default CalendarPage;
