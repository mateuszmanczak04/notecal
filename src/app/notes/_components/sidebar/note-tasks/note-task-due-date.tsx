'use client';

import { useTaskDueDate } from '@/app/tasks/_hooks/use-task-due-date';
import { useDatePickerFunctionality } from '@/hooks/use-date-picker-functionality';
import { cn } from '@/utils/cn';
import { Task } from '@prisma/client';

type T_Props = {
	task: Task;
};

const NoteTaskDueDate = ({ task }: T_Props) => {
	const { updateTaskDueDate, isPending } = useTaskDueDate(task);
	const { day, handleKeyDown, hour, menuRef, minute, month, year, setDay, setHour, setMinute, setMonth, setYear } =
		useDatePickerFunctionality({ onSelect: updateTaskDueDate, date: task.dueDate, isAlwaysOpen: true });

	return (
		<div className='flex text-sm' ref={menuRef}>
			<div
				className={cn(
					'flex rounded-md border border-neutral-100 p-1 transition-opacity dark:border-neutral-800 dark:text-neutral-100',
					isPending && 'pointer-events-none opacity-50',
				)}>
				{/* Year */}
				<input
					placeholder={new Date().getFullYear().toString()}
					type='text'
					value={year}
					onChange={e => setYear(e.target.value)}
					onKeyDown={handleKeyDown}
					className='w-12 bg-transparent px-1 focus:outline-none'
					autoFocus
				/>
				/{/* Month */}
				<input
					placeholder={(new Date().getMonth() + 1).toString().padStart(2, '00')}
					type='text'
					value={month}
					onChange={e => setMonth(e.target.value)}
					onKeyDown={handleKeyDown}
					className='w-8 bg-transparent px-1 focus:outline-none'
				/>
				/{/* Day */}
				<input
					placeholder={new Date().getDate().toString().padStart(2, '00')}
					type='text'
					value={day}
					onChange={e => setDay(e.target.value)}
					onKeyDown={handleKeyDown}
					className='w-8 bg-transparent px-1 focus:outline-none'
				/>
				{/* Hour */}
				<input
					placeholder={new Date().getHours().toString().padStart(2, '00')}
					type='text'
					value={hour}
					onChange={e => setHour(e.target.value)}
					onKeyDown={handleKeyDown}
					className='w-8 bg-transparent px-1 focus:outline-none'
				/>
				:{/* Minute */}
				<input
					placeholder={new Date().getMinutes().toString().padStart(2, '00')}
					type='text'
					value={minute}
					onChange={e => setMinute(e.target.value)}
					onKeyDown={handleKeyDown}
					className='w-8 bg-transparent px-1 focus:outline-none'
				/>
			</div>
		</div>
	);
};

export default NoteTaskDueDate;
