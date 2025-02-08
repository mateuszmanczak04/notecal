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
			className='flex w-full cursor-grab gap-2 border-b border-neutral-200 pb-2 pt-4 first-of-type:pt-2 last-of-type:border-transparent dark:border-neutral-700'>
			<div className='flex min-w-0 flex-1 select-none flex-col'>
				<NoteTaskTitle task={task} />
				<NoteTaskDescription task={task} />

				<div className='flex flex-wrap gap-2'>
					<NoteTaskCompleted task={task} />
					<NoteTaskCourse task={task} />
					<NoteTaskPriority task={task} />
					<NoteTaskDueDate task={task} />
				</div>
			</div>
		</Reorder.Item>
	);
};

export default NoteTaskItem;
