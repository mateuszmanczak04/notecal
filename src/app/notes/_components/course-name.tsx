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

const CourseName = ({ course }: Props) => {
	const queryClient = useQueryClient();
	const nameRef = useRef<HTMLHeadingElement>(null!);
	const { toast } = useToast();
	const { mutate, isPending } = useMutation({
		mutationFn: updateCourse,
		onSettled: data => {
			console.log(data);
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['courses'] });
		},
	});

	const handleSubmit = () => {
		const newName = nameRef.current.innerText;
		// Don't want to update the same value:
		if (newName.trim() === course.name) return;
		if (newName.trim().length === 0) {
			nameRef.current.innerText = course.name;
			return;
		}
		mutate({ id: course.id, name: newName.trim() });
	};

	/**
	 * Detect Enter and Escape keys for submission or cancellation.
	 */
	const handleKeyDown = (event: React.KeyboardEvent<HTMLParagraphElement>) => {
		if (!nameRef.current) return;
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			nameRef.current.blur(); // It automatically triggers handleSubmit()
			return;
		}
		if (event.key === 'Escape') {
			nameRef.current.innerText = course.name;
			nameRef.current.blur();
			return;
		}
	};

	// Set initial value:
	useEffect(() => {
		if (!nameRef.current) return;
		nameRef.current.innerText = course.name;
	}, [course.name]);

	return (
		<h2
			ref={nameRef}
			contentEditable
			className={cn('text-2xl font-bold outline-none ', isPending && 'pointer-events-none opacity-50')}
			onKeyDown={handleKeyDown}
			onBlur={handleSubmit}
			spellCheck={false}></h2>
	);
};

export default CourseName;
