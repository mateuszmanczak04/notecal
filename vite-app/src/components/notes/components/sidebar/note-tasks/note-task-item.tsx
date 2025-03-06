import { GripVertical } from 'lucide-react';
import { Reorder, useDragControls } from 'motion/react';
import { T_Task } from '../../../../../types';
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
	const dragControls = useDragControls();

	return (
		<Reorder.Item
			value={task}
			dragListener={false}
			dragControls={dragControls}
			whileDrag={{ userSelect: 'none', pointerEvents: 'none' }}
			className='mt-2 flex w-full cursor-grab gap-2 rounded-md border border-neutral-200 bg-white first-of-type:mt-0 dark:border-neutral-700 dark:bg-neutral-800'>
			<div
				className='grid h-auto w-6 cursor-move place-content-center rounded-l-sm bg-neutral-100 dark:bg-neutral-700'
				onPointerDown={e => dragControls.start(e)}>
				<GripVertical className='size-4' />
			</div>
			<div className='flex min-w-0 flex-1 select-none flex-col p-2'>
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
