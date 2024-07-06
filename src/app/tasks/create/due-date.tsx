'use client';

import { cn } from '@/lib/utils';
import { FC, useEffect, useRef, useState, useTransition } from 'react';
import Tag from '../_components/tag';
import { useOnClickOutside } from 'usehooks-ts';
import { format, isValid } from 'date-fns';

interface DueDateProps {
	onSelect: (newDueDate: Date | null) => void;
	currentDueDate: Date | null;
}

const DueDate: FC<DueDateProps> = ({ onSelect, currentDueDate }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isPending, startTransition] = useTransition();
	const menuRef = useRef<HTMLDivElement | null>(null);

	// Inputs
	const [year, setYear] = useState<string>(
		currentDueDate ? currentDueDate.getFullYear().toString() : '',
	);
	const [month, setMonth] = useState<string>(
		currentDueDate
			? (currentDueDate.getMonth() + 1).toString().padStart(2, '00')
			: '',
	);
	const [day, setDay] = useState<string>(
		currentDueDate ? currentDueDate.getDate().toString().padStart(2, '00') : '',
	);
	const [hour, setHour] = useState<string>(
		currentDueDate
			? currentDueDate.getHours().toString().padStart(2, '00')
			: '',
	);
	const [minute, setMinute] = useState<string>(
		currentDueDate
			? currentDueDate.getMinutes().toString().padStart(2, '00')
			: '',
	);

	const handleCloseMenu = () => {
		setIsOpen(false);
	};

	const handleOpenMenu = () => {
		setIsOpen(true);
	};

	const handleToggleMenu = () => {
		if (isOpen) {
			handleCloseMenu();
		} else {
			handleOpenMenu();
		}
	};

	const handleSubmit = () => {
		const newDate = new Date(
			parseInt(year),
			parseInt(month || '1') - 1,
			parseInt(day || '1'),
			parseInt(hour || '0'),
			parseInt(minute || '0'),
		);

		if (!isValid(newDate)) return;

		// No need to update the date if these are the same:
		if (currentDueDate && newDate.getTime() === currentDueDate.getTime())
			return;

		onSelect(newDate);
	};

	useOnClickOutside(menuRef, () => {
		handleSubmit();
		handleCloseMenu();
	});

	useEffect(() => {
		setYear(currentDueDate ? currentDueDate.getFullYear().toString() : '');
		setMonth(
			currentDueDate
				? (currentDueDate.getMonth() + 1).toString().padStart(2, '00')
				: '',
		);
		setDay(
			currentDueDate
				? currentDueDate.getDate().toString().padStart(2, '00')
				: '',
		);
		setHour(
			currentDueDate
				? currentDueDate.getHours().toString().padStart(2, '00')
				: '',
		);
		setMinute(
			currentDueDate
				? currentDueDate.getMinutes().toString().padStart(2, '00')
				: '',
		);
	}, [currentDueDate]);

	return (
		<div className='relative' ref={menuRef}>
			<Tag
				text={
					currentDueDate
						? format(currentDueDate, 'yyyy-MM-dd - HH:mm')
						: 'No due date'
				}
				onClick={handleToggleMenu}
				className={cn('w-full transition', isPending && 'opacity-50')}
			/>
			{isOpen && (
				<div className='absolute left-1/2 top-0 flex h-6 w-full -translate-x-1/2 items-center justify-center gap-2 rounded-md border bg-neutral-100 font-mono'>
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
				</div>
			)}
		</div>
	);
};

export default DueDate;
