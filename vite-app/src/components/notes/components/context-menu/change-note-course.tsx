import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../../../../components/toast/use-toast';
import { useCourses } from '../../../../hooks/use-courses';
import { T_Course, T_Note } from '../../../../types';

type Props = {
	currentCourse: T_Course;
	note: T_Note;
	handleClose?: () => void;
};

/**
 * A dropdown menu used to choose a new course for the note.
 */
const ChangeNoteCourse = ({ currentCourse, note, handleClose }: Props) => {
	const queryClient = useQueryClient();
	const { data: courses } = useCourses();
	const { toast } = useToast();
	const { mutate } = useMutation({
		mutationFn: async (data: { id: string; courseId: string }) =>
			await fetch(`/api/notes/${data.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ courseId: data.courseId }),
			}).then(res => res.json()),
		onMutate: data => {
			// Optimistic update
			queryClient.setQueryData(['notes'], (prev: T_Note[]) => {
				return prev.map(n => {
					if (n.id === data.id) {
						return { ...n, courseId: data.courseId };
					}
					return n;
				});
			});
		},
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['notes'] });
		},
	});

	const handleSelect = (newCourseId: string) => {
		mutate({ id: note.id, courseId: newCourseId });
	};

	return (
		<div className='flex flex-col justify-center overflow-clip rounded-xl border bg-white text-neutral-800 dark:border-neutral-500 dark:bg-neutral-600 dark:text-white'>
			{/* Options */}
			{courses &&
				courses
					.filter(c => c.id !== currentCourse.id)
					.map(course => (
						<button
							onClick={() => {
								handleSelect(course.id);
								handleClose?.();
							}}
							key={course.id}
							value={course.id}
							className='flex h-9 cursor-pointer select-none items-center gap-2 truncate text-nowrap px-4 font-medium transition hover:bg-neutral-100 dark:hover:bg-neutral-500'
						>
							<div
								className='h-3 w-3 shrink-0 rounded-full'
								style={{ backgroundColor: course.color }}
							></div>
							<p className={'truncate text-sm'}>{course.name}</p>
						</button>
					))}
		</div>
	);
};

export default ChangeNoteCourse;
