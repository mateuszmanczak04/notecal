import { useTasks } from '../../../../../hooks/use-tasks';
import { T_Task } from '../../../../../types';
import ErrorMessage from '../../../../error-message';
import LoadingSpinner from '../../../../loading-spinner';
import { useNoteContext } from '../../../context/note-context';
import NoteCreateTaskForm from './note-create-task-form';
import NoteTaskItem from './note-task-item';

/** List of tasks for /notes page */
const NoteTasks = () => {
	const { currentCourse } = useNoteContext();
	const { data: allTasks, isPending, error } = useTasks();
	const tasks = allTasks?.filter(t => t.courseId === currentCourse?.id);

	if (isPending) return <LoadingSpinner />;

	if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

	if (!tasks) return;

	if (!currentCourse) return;

	return (
		<div className='flex flex-col border-b border-neutral-200 p-6 dark:border-neutral-700'>
			{tasks.length > 0 && (
				<div className='mb-2'>{tasks?.map((task: T_Task) => <NoteTaskItem key={task.id} task={task} />)}</div>
			)}
			<NoteCreateTaskForm course={currentCourse} />
		</div>
	);
};

export default NoteTasks;
