'use client';

import {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarItem,
	MenubarLabel,
	MenubarMenu,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarTrigger,
} from '@/components/menubar';
import { useCourses } from '@/hooks/use-courses';
import { T_DisplayedDays, T_ViewMode, useSettings } from '@/hooks/use-settings';
import { ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import { useCalendarContext } from '../_context/calendar-context';

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
		displayedDays,
		setDisplayedDays,
	} = useSettings();
	const { data: courses } = useCourses();
	const { handleHideCourse, handleShowCourse, hiddenCoursesIds } = useCalendarContext();

	const handleFilterCourse = (checked: boolean | string, id: string) => {
		if (checked) {
			handleShowCourse(id);
		} else {
			handleHideCourse(id);
		}
	};

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
			<Menubar className='sticky top-0 z-50 h-10 text-nowrap rounded-none border-0 border-l bg-white dark:bg-neutral-900'>
				<MenubarLabel className='w-32 cursor-default select-none justify-center hover:bg-white data-[state=open]:bg-white dark:hover:bg-neutral-900 dark:data-[state=open]:bg-neutral-800'>
					{currentMonth} {currentYear}
				</MenubarLabel>
				<MenubarSeparator />

				{/* View mode */}
				<MenubarMenu>
					<MenubarTrigger>View mode</MenubarTrigger>
					<MenubarContent>
						<MenubarRadioGroup value={viewMode} onValueChange={value => setViewMode(value as T_ViewMode)}>
							<MenubarRadioItem value='days'>Days</MenubarRadioItem>
							<MenubarRadioItem value='month'>Month</MenubarRadioItem>
							<MenubarRadioItem value='list'>List</MenubarRadioItem>
						</MenubarRadioGroup>
					</MenubarContent>
				</MenubarMenu>
				<MenubarSeparator />

				{/* Filter courses */}
				{courses && (
					<>
						<MenubarMenu>
							<MenubarTrigger>Filter courses</MenubarTrigger>
							<MenubarContent>
								{courses.map(course => (
									<MenubarCheckboxItem
										key={course.id}
										checked={!hiddenCoursesIds.includes(course.id)}
										onCheckedChange={checked => handleFilterCourse(checked, course.id)}
										className='gap-1'>
										{course.name}
									</MenubarCheckboxItem>
								))}
							</MenubarContent>
						</MenubarMenu>
						<MenubarSeparator />
					</>
				)}

				{/* displayedDays */}
				{viewMode === 'days' && (
					<>
						<MenubarMenu>
							<MenubarTrigger>Days to see</MenubarTrigger>
							<MenubarContent>
								<MenubarRadioGroup
									value={displayedDays.toString()}
									onValueChange={value => setDisplayedDays(parseInt(value) as T_DisplayedDays)}>
									{[1, 2, 3, 4, 5, 6, 7].map(days => (
										<MenubarRadioItem key={days} value={days.toString()}>
											{days}
										</MenubarRadioItem>
									))}
								</MenubarRadioGroup>
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
						<MenubarLabel onClick={() => zoomOut()} className='data-[state=open]:bg-white'>
							<Minus className='size-5' />
						</MenubarLabel>
						<MenubarSeparator />
						<MenubarLabel onClick={() => zoomIn()} className='data-[state=open]:bg-white'>
							<Plus className='size-5' />
						</MenubarLabel>
					</>
				)}
			</Menubar>
		</>
	);
};

export default CalendarMenu;
