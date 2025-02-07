import { isValid } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

type T_Props = {
	onSelect: (newDueDate: Date | null) => void;
	date: Date | null;
	isAlwaysOpen?: boolean;
};

export const useDatePickerFunctionality = ({ onSelect, date, isAlwaysOpen }: T_Props) => {
	const [isOpen, setIsOpen] = useState(isAlwaysOpen || false);
	const menuRef = useRef<HTMLDivElement>(null!);

	// Inputs
	const [year, setYear] = useState<string>(date ? date.getFullYear().toString() : '');
	const [month, setMonth] = useState<string>(date ? (date.getMonth() + 1).toString().padStart(2, '00') : '');
	const [day, setDay] = useState<string>(date ? date.getDate().toString().padStart(2, '00') : '');
	const [hour, setHour] = useState<string>(date ? date.getHours().toString().padStart(2, '00') : '');
	const [minute, setMinute] = useState<string>(date ? date.getMinutes().toString().padStart(2, '00') : '');

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
		// Clear the date if any input is empty:
		if (!year || !month || !day || !hour || !minute) {
			onSelect(null);
			return;
		}

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

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSubmit();
			handleCloseMenu();
		}
	};

	useOnClickOutside(menuRef, () => {
		if (isOpen || isAlwaysOpen) {
			handleSubmit();
			handleCloseMenu();
		}
	});

	useEffect(() => {
		setYear(date ? date.getFullYear().toString() : '');
		setMonth(date ? (date.getMonth() + 1).toString().padStart(2, '00') : '');
		setDay(date ? date.getDate().toString().padStart(2, '00') : '');
		setHour(date ? date.getHours().toString().padStart(2, '00') : '');
		setMinute(date ? date.getMinutes().toString().padStart(2, '00') : '');
	}, [date]);

	return {
		isOpen,
		menuRef,
		year,
		setYear,
		month,
		setMonth,
		day,
		setDay,
		hour,
		setHour,
		minute,
		setMinute,
		handleCloseMenu,
		handleOpenMenu,
		handleToggleMenu,
		handleSubmit,
		handleKeyDown,
	};
};
