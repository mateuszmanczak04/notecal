'use client';

import { format, isValid } from 'date-fns';
import { FC, useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import useTasks from '../_hooks/use-tasks';
import Tag from './tag';

interface TaskTitleProps {
	id: string;
	dueDate: Date | null;
}

const DueDate: FC<TaskTitleProps> = ({ id, dueDate }) => {
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef<HTMLFormElement | null>(null);
	const { update: updateTask } = useTasks();

	// Inputs
	const [year, setYear] = useState<string>(
		dueDate ? dueDate.getFullYear().toString() : '',
	);
	const [month, setMonth] = useState<string>(
		dueDate ? (dueDate.getMonth() + 1).toString().padStart(2, '00') : '',
	);
	const [day, setDay] = useState<string>(
		dueDate ? dueDate.getDate().toString().padStart(2, '00') : '',
	);
	const [hour, setHour] = useState<string>(
		dueDate ? dueDate.getHours().toString().padStart(2, '00') : '',
	);
	const [minute, setMinute] = useState<string>(
		dueDate ? dueDate.getMinutes().toString().padStart(2, '00') : '',
	);

	// Should be fired always when closing the menu:
	const handleSaveChanges = () => {
		let newDate: Date | null;

		if (parseInt(year) === 0 || !year) {
			newDate = null;

			if (dueDate === newDate) return;
		} else {
			newDate = new Date(
				parseInt(year),
				parseInt(month || '1') - 1,
				parseInt(day || '1'),
				parseInt(hour || '0'),
				parseInt(minute || '0'),
			);

			if (!isValid(newDate)) return;

			// No need to update the date if these are the same:
			if (dueDate && newDate.getTime() === dueDate.getTime()) return;
		}

		updateTask({ id, dueDate: newDate });
	};

	useEffect(() => {
		setYear(dueDate ? dueDate.getFullYear().toString() : '');
		setMonth(
			dueDate ? (dueDate.getMonth() + 1).toString().padStart(2, '00') : '',
		);
		setDay(dueDate ? dueDate.getDate().toString().padStart(2, '00') : '');
		setHour(dueDate ? dueDate.getHours().toString().padStart(2, '00') : '');
		setMinute(dueDate ? dueDate.getMinutes().toString().padStart(2, '00') : '');
	}, [dueDate]);

	const handleCloseMenu = () => {
		setIsOpen(false);
	};

	const handleOpenMenu = () => {
		setIsOpen(true);
	};

	useOnClickOutside(menuRef, () => {
		handleSaveChanges();
		handleCloseMenu();
	});

	return (
		<div className='relative  text-sm sm:text-base'>
			<Tag
				text={dueDate ? format(dueDate, 'yyyy-MM-dd - HH:mm') : 'No due date'}
				onClick={handleOpenMenu}
				className='w-52'
			/>
			{isOpen && (
				<form
					onSubmit={e => {
						e.preventDefault();
						handleSaveChanges();
						handleCloseMenu();
					}}
					ref={menuRef}
					className='absolute left-1/2 top-0 flex h-6 w-52 -translate-x-1/2 items-center justify-center gap-2 rounded-md bg-neutral-100 font-mono'>
					{/* Year, month, day: */}
					<div className='flex overflow-hidden rounded-md'>
						<input
							placeholder={new Date().getFullYear().toString()}
							type='text'
							value={year}
							onChange={e => setYear(e.target.value)}
							className='w-12 bg-neutral-100 px-1 focus:outline-none'
							autoFocus
						/>
						/
						<input
							placeholder={(new Date().getMonth() + 1)
								.toString()
								.padStart(2, '00')}
							type='text'
							value={month}
							onChange={e => setMonth(e.target.value)}
							className='w-7 bg-neutral-100 px-1 focus:outline-none'
						/>
						/
						<input
							placeholder={new Date().getDate().toString().padStart(2, '00')}
							type='text'
							value={day}
							onChange={e => setDay(e.target.value)}
							className='w-7 bg-neutral-100 px-1 focus:outline-none'
						/>
					</div>

					{/* Hour, minute: */}
					<div className='flex overflow-hidden rounded-md'>
						<input
							placeholder={new Date().getHours().toString().padStart(2, '00')}
							type='text'
							value={hour}
							onChange={e => setHour(e.target.value)}
							className='w-7 bg-neutral-100 px-1 focus:outline-none'
						/>
						:
						<input
							placeholder={new Date().getMinutes().toString().padStart(2, '00')}
							type='text'
							value={minute}
							onChange={e => setMinute(e.target.value)}
							className='w-7 bg-neutral-100 px-1 focus:outline-none'
						/>
					</div>

					{/* Without this button "onSubmit" doesn't work when clicking enter */}
					<button type='submit' hidden></button>
				</form>
			)}
		</div>
	);
};

export default DueDate;
