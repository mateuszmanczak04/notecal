'use client';

import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarLabel,
	MenubarMenu,
	MenubarSeparator,
	MenubarTrigger,
} from '@/components/menubar';
import { useSettings } from '@/hooks/use-settings';
import { ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';

/**
 * A top bar above the calendar grid.
 * User can use it for navigation, zooming in/out, etc.
 */
const CalendarMenu = () => {
	const {
		firstCalendarDay,
		zoomIn,
		zoomOut,
		goDayBackward,
		goDayForward,
		goToToday,
		viewMode,
		goMonthForward,
		goMonthBackward,
		setViewMode,
		setDisplayedDays,
	} = useSettings();
	const currentMonth = firstCalendarDay.toLocaleString('default', {
		month: 'long',
	});
	const currentYear = firstCalendarDay.getFullYear();

	const handleForward = () => {
		if (viewMode === 'days') {
			goDayForward();
		} else if (viewMode === 'month') {
			goMonthForward();
		}
	};

	const handleBackward = () => {
		if (viewMode === 'days') {
			goDayBackward();
		} else if (viewMode === 'month') {
			goMonthBackward();
		}
	};

	return (
		<>
			<Menubar className='mb-4 w-fit text-nowrap'>
				<MenubarLabel className='cursor-default select-none text-neutral-700 hover:bg-white data-[state=open]:bg-white'>
					{currentMonth} {currentYear}
				</MenubarLabel>
				<MenubarSeparator />

				{/* View mode */}
				<MenubarMenu>
					<MenubarTrigger>View mode</MenubarTrigger>
					<MenubarContent>
						<MenubarItem onClick={() => setViewMode('days')}>Days</MenubarItem>
						<MenubarItem onClick={() => setViewMode('month')}>Month</MenubarItem>
						<MenubarItem onClick={() => setViewMode('list')}>List</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
				<MenubarSeparator />

				{/* displayedDays */}
				{viewMode === 'days' && (
					<>
						<MenubarMenu>
							<MenubarTrigger>Days to see</MenubarTrigger>
							<MenubarContent>
								<MenubarItem onClick={() => setDisplayedDays(1)}>1</MenubarItem>
								<MenubarItem onClick={() => setDisplayedDays(2)}>2</MenubarItem>
								<MenubarItem onClick={() => setDisplayedDays(3)}>3</MenubarItem>
								<MenubarItem onClick={() => setDisplayedDays(4)}>4</MenubarItem>
								<MenubarItem onClick={() => setDisplayedDays(5)}>5</MenubarItem>
								<MenubarItem onClick={() => setDisplayedDays(6)}>6</MenubarItem>
								<MenubarItem onClick={() => setDisplayedDays(7)}>7</MenubarItem>
							</MenubarContent>
						</MenubarMenu>
						<MenubarSeparator />
					</>
				)}

				{viewMode !== 'list' && (
					<>
						{/* Go to */}
						<MenubarMenu>
							<MenubarTrigger>Go to</MenubarTrigger>
							<MenubarContent>
								<MenubarItem onClick={goToToday}>Today</MenubarItem>
								<MenubarItem disabled>First day of the week</MenubarItem>
								<MenubarItem disabled>First day of the month</MenubarItem>
								<MenubarItem disabled>First day of the year</MenubarItem>
							</MenubarContent>
						</MenubarMenu>

						<MenubarSeparator />

						{/* Back/forward */}
						<MenubarLabel onClick={handleBackward} className='data-[state=open]:bg-white'>
							<ChevronLeft className='size-5' />
						</MenubarLabel>
						<MenubarSeparator />
						<MenubarLabel onClick={handleForward} className='data-[state=open]:bg-white'>
							<ChevronRight className='size-5' />
						</MenubarLabel>

						<MenubarSeparator />

						{/* Zooming */}
						<MenubarLabel onClick={zoomOut} className='data-[state=open]:bg-white'>
							<Minus className='size-5' />
						</MenubarLabel>
						<MenubarSeparator />
						<MenubarLabel onClick={zoomIn} className='data-[state=open]:bg-white'>
							<Plus className='size-5' />
						</MenubarLabel>
					</>
				)}
			</Menubar>
		</>
	);
};

export default CalendarMenu;
