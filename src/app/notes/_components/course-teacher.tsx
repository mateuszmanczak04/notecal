'use client';

import updateCourse from '@/app/courses/_actions/update-course';
import { useToast } from '@/components/toast/use-toast';
import { cn } from '@/utils/cn';
import { Course } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

type Props = {
	course: Course;
};

const CourseTeacher = ({ course }: Props) => {
	const queryClient = useQueryClient();
	const teacherRef = useRef<HTMLParagraphElement>(null!);
	const { toast } = useToast();
	const { mutate, isPending } = useMutation({
		mutationFn: updateCourse,
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['courses'] });
		},
	});

	const handleSubmit = () => {
		const newTeacher = teacherRef.current.innerText;
		// Don't want to update the same value:
		if (newTeacher.trim() === course.teacher) return;
		if (newTeacher.trim().length === 0) {
			teacherRef.current.innerText = course.teacher;
			return;
		}
		mutate({ id: course.id, teacher: newTeacher.trim() });
	};

	/**
	 * Detect Enter and Escape keys for submission or cancellation.
	 */
	const handleKeyDown = (event: React.KeyboardEvent<HTMLParagraphElement>) => {
		if (!teacherRef.current) return;
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			teacherRef.current.blur(); // It automatically triggers handleSubmit()
			return;
		}
		if (event.key === 'Escape') {
			teacherRef.current.innerText = course.teacher;
			teacherRef.current.blur();
			return;
		}
	};

	// Set initial value:
	useEffect(() => {
		if (!teacherRef.current) return;
		teacherRef.current.innerText = course.teacher;
	}, [course.teacher]);

	return (
		<p
			ref={teacherRef}
			contentEditable
			className={cn('break-all outline-none transition', isPending && 'pointer-events-none opacity-50')}
			onKeyDown={handleKeyDown}
			onBlur={handleSubmit}
			spellCheck={false}></p>
	);
};

export default CourseTeacher;
