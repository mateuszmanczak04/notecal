import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useToast } from '../../../../../components/toast/use-toast';
import { BACKEND_DOMAIN } from '../../../../../utils/app-domain';
import { cn } from '../../../../../utils/cn';
import { useNoteContext } from '../../../context/note-context';

const CourseTeacher = () => {
	const { currentCourse } = useNoteContext();
	const queryClient = useQueryClient();
	const teacherRef = useRef<HTMLParagraphElement>(null!);
	const { toast } = useToast();
	const { mutate, isPending } = useMutation({
		mutationFn: async (data: { id: string; teacher: string }) =>
			await fetch(`${BACKEND_DOMAIN}/api/courses/${data.id}`, {
				method: 'PATCH',
				body: JSON.stringify({ teacher: data.teacher }),
			}).then(res => res.json()),
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['courses'] });
		},
	});

	const handleSubmit = () => {
		if (!currentCourse) return;
		const newTeacher = teacherRef.current.innerText;
		// Don't want to update the same value:
		if (newTeacher.trim() === currentCourse.teacher) return;
		if (newTeacher.trim().length === 0) {
			teacherRef.current.innerText = currentCourse.teacher;
			return;
		}
		mutate({ id: currentCourse.id, teacher: newTeacher.trim() });
	};

	/**
	 * Detect Enter and Escape keys for submission or cancellation.
	 */
	const handleKeyDown = (event: React.KeyboardEvent<HTMLParagraphElement>) => {
		if (!currentCourse) return;
		if (!teacherRef.current) return;
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			teacherRef.current.blur(); // It automatically triggers handleSubmit()
			return;
		}
		if (event.key === 'Escape') {
			teacherRef.current.innerText = currentCourse.teacher;
			teacherRef.current.blur();
			return;
		}
	};

	// Set initial value:
	useEffect(() => {
		if (!currentCourse) return;
		if (!teacherRef.current) return;
		teacherRef.current.innerText = currentCourse.teacher;
	}, [currentCourse]);

	return (
		<p
			ref={teacherRef}
			contentEditable
			className={cn(
				'mt-2 break-words opacity-75 outline-none transition',
				isPending && 'pointer-events-none opacity-50',
			)}
			onKeyDown={handleKeyDown}
			onBlur={handleSubmit}
			spellCheck={false}></p>
	);
};

export default CourseTeacher;
