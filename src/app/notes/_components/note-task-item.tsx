import { Task as T_Task, type Task as NoteTaskItem } from '@prisma/client';
import { Reorder } from 'motion/react';
import NoteTaskCompleted from './note-task-completed';
import NoteTaskCourse from './note-task-course';
import NoteTaskDescription from './note-task-description';
import NoteTaskDueDate from './note-task-due-date';
import NoteTaskPriority from './note-task-priority';
import NoteTaskTitle from './note-task-title';

type T_Props = {
	task: T_Task;
};

/** Single task used in /notes page */
const NoteTaskItem = ({ task }: T_Props) => {
	return (
		<Reorder.Item
			value={task}
			whileDrag={{ userSelect: 'none', pointerEvents: 'none' }}
			className='flex w-full cursor-grab gap-2 border-b border-neutral-200 bg-white p-2 dark:border-neutral-700 dark:bg-neutral-800'>
			<NoteTaskCompleted task={task} />
			<div className='flex min-w-0 flex-1 select-none flex-col'>
				<NoteTaskTitle task={task} forPage='notes' />
				<NoteTaskDescription task={task} forPage='notes' />

				<div className='flex flex-col gap-y-2 '>
					<NoteTaskCourse task={task} forPage='notes' />
					<NoteTaskDueDate task={task} forPage='notes' />
					<NoteTaskPriority task={task} forPage='notes' />
				</div>
			</div>
		</Reorder.Item>
	);
};

export default NoteTaskItem;
