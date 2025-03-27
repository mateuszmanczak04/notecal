import { format } from 'date-fns';
import { useDatePickerFunctionality } from '../hooks/use-date-picker-functionality';
import { cn } from '../utils/cn';
import Tag from './tag';

type Props = {
	onSelect: (newDueDate: Date | null) => void;
	date: Date | null;
	isPending?: boolean;
	className?: string;
};

const DatePicker = ({ isPending, onSelect, date, className }: Props) => {
	const {
		day,
		handleKeyDown,
		handleToggleMenu,
		hour,
		isOpen,
		menuRef,
		minute,
		month,
		year,
		setDay,
		setHour,
		setMinute,
		setMonth,
		setYear,
	} = useDatePickerFunctionality({ onSelect, date });

	return (
		<div className={cn('relative h-9 text-sm font-medium sm:text-base', className)} ref={menuRef}>
			<Tag onClick={handleToggleMenu} className={cn('h-full w-full max-w-none', isPending && 'opacity-50')}>
				{date ? format(date, 'yyyy-MM-dd - HH:mm') : 'No due date'}
			</Tag>
			{isOpen && (
				<div className='absolute left-1/2 top-0 flex h-full w-full -translate-x-1/2 items-center justify-center gap-2 rounded-xl border bg-neutral-100 font-mono dark:border-neutral-500 dark:bg-neutral-700'>
					{/* Year, month, day: */}
					<div className='flex overflow-hidden rounded-xl dark:text-neutral-100'>
						<input
							placeholder={new Date().getFullYear().toString()}
							type='text'
							value={year}
							onChange={e => setYear(e.target.value)}
							onKeyDown={handleKeyDown}
							className='w-12 bg-neutral-100 px-1 focus:outline-none dark:bg-neutral-700'
							autoFocus
						/>
						/
						<input
							placeholder={(new Date().getMonth() + 1).toString().padStart(2, '00')}
							type='text'
							value={month}
							onChange={e => setMonth(e.target.value)}
							onKeyDown={handleKeyDown}
							className='w-7 bg-neutral-100 px-1 focus:outline-none dark:bg-neutral-700'
						/>
						/
						<input
							placeholder={new Date().getDate().toString().padStart(2, '00')}
							type='text'
							value={day}
							onChange={e => setDay(e.target.value)}
							onKeyDown={handleKeyDown}
							className='w-7 bg-neutral-100 px-1 focus:outline-none dark:bg-neutral-700'
						/>
					</div>

					{/* Hour, minute: */}
					<div className='flex overflow-hidden rounded-xl'>
						<input
							placeholder={new Date().getHours().toString().padStart(2, '00')}
							type='text'
							value={hour}
							onChange={e => setHour(e.target.value)}
							onKeyDown={handleKeyDown}
							className='w-7 bg-neutral-100 px-1 focus:outline-none dark:bg-neutral-700'
						/>
						:
						<input
							placeholder={new Date().getMinutes().toString().padStart(2, '00')}
							type='text'
							value={minute}
							onChange={e => setMinute(e.target.value)}
							onKeyDown={handleKeyDown}
							className='w-7 bg-neutral-100 px-1 focus:outline-none dark:bg-neutral-700'
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default DatePicker;
