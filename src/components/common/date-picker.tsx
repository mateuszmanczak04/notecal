'use client';

import { cn } from '@/lib/utils';
import { format, isValid } from 'date-fns';
import { FC, useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import Tag from './tag';

interface DatePickerProps {
	onSelect: (newDueDate: Date | null) => void;
	date: Date | null;
	isPending?: boolean;
	className?: string;
}

const DatePicker: FC<DatePickerProps> = ({
	isPending,
	onSelect,
	date,
	className,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement | null>(null);

	// Inputs
	const [year, setYear] = useState<string>(
		date ? date.getFullYear().toString() : '',
	);
	const [month, setMonth] = useState<string>(
		date ? (date.getMonth() + 1).toString().padStart(2, '00') : '',
	);
	const [day, setDay] = useState<string>(
		date ? date.getDate().toString().padStart(2, '00') : '',
	);
	const [hour, setHour] = useState<string>(
		date ? date.getHours().toString().padStart(2, '00') : '',
	);
	const [minute, setMinute] = useState<string>(
		date ? date.getMinutes().toString().padStart(2, '00') : '',
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
		if (date && newDate.getTime() === date.getTime()) return;

		onSelect(newDate);
	};

	useOnClickOutside(menuRef, () => {
		handleSubmit();
		handleCloseMenu();
	});

	useEffect(() => {
		setYear(date ? date.getFullYear().toString() : '');
		setMonth(date ? (date.getMonth() + 1).toString().padStart(2, '00') : '');
		setDay(date ? date.getDate().toString().padStart(2, '00') : '');
		setHour(date ? date.getHours().toString().padStart(2, '00') : '');
		setMinute(date ? date.getMinutes().toString().padStart(2, '00') : '');
	}, [date]);

	return (
		<div
			className={cn('relative h-9 text-sm sm:text-base', className)}
			ref={menuRef}>
			<Tag
				text={date ? format(date, 'yyyy-MM-dd - HH:mm') : 'No due date'}
				onClick={handleToggleMenu}
				className={cn('h-full w-full max-w-none', isPending && 'opacity-50')}
			/>
			{isOpen && (
				<div className='absolute left-1/2 top-0 flex h-full w-full -translate-x-1/2 items-center justify-center gap-2 rounded-xl border bg-neutral-100 font-mono dark:border-neutral-500 dark:bg-neutral-700'>
					{/* Year, month, day: */}
					<div className='flex overflow-hidden rounded-md dark:text-neutral-100'>
						<input
							placeholder={new Date().getFullYear().toString()}
							type='text'
							value={year}
							onChange={e => setYear(e.target.value)}
							className='w-12 bg-neutral-100 px-1 focus:outline-none dark:bg-neutral-700'
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
							className='w-7 bg-neutral-100 px-1 focus:outline-none dark:bg-neutral-700'
						/>
						/
						<input
							placeholder={new Date().getDate().toString().padStart(2, '00')}
							type='text'
							value={day}
							onChange={e => setDay(e.target.value)}
							className='w-7 bg-neutral-100 px-1 focus:outline-none dark:bg-neutral-700'
						/>
					</div>

					{/* Hour, minute: */}
					<div className='flex overflow-hidden rounded-md'>
						<input
							placeholder={new Date().getHours().toString().padStart(2, '00')}
							type='text'
							value={hour}
							onChange={e => setHour(e.target.value)}
							className='w-7 bg-neutral-100 px-1 focus:outline-none dark:bg-neutral-700'
						/>
						:
						<input
							placeholder={new Date().getMinutes().toString().padStart(2, '00')}
							type='text'
							value={minute}
							onChange={e => setMinute(e.target.value)}
							className='w-7 bg-neutral-100 px-1 focus:outline-none dark:bg-neutral-700'
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default DatePicker;
