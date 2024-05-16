'use client';

import { ChangeEventHandler, FC, FormEvent, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { Input } from '../ui/input';

interface TimePickerProps {
	initialHour: number;
	initialMinute: number;
	onChange: ({ hour, minute }: { hour: number; minute: number }) => void;
}

const TimePicker: FC<TimePickerProps> = ({
	initialHour,
	initialMinute,
	onChange,
}) => {
	const [value, setValue] = useState<string>(
		`${initialHour.toString().padStart(2, '0')}:${initialMinute.toString().padStart(2, '0')}`,
	);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const save = () => {
		const isValid = /^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9])$/.test(value);
		if (!isValid) {
			console.log('invalid');
			setValue(
				`${initialHour.toString().padStart(2, '0')}:${initialMinute.toString().padStart(2, '0')}`,
			);
			return;
		}

		const parts = value.split(':');
		const hour = parseInt(parts[0]);
		const minute = parseInt(parts[1]);
		setValue(
			`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
		);
		onChange({ hour, minute });
	};

	useOnClickOutside(inputRef, save);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		save();
	};

	return (
		<form onSubmit={handleSubmit} autoComplete='off'>
			<Input
				ref={inputRef}
				className='w-20'
				value={value}
				onChange={e => setValue(e.target.value)}
			/>
		</form>
	);
};

export default TimePicker;
