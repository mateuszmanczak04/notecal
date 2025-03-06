import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useToast } from '../../../../../components/toast/use-toast';
import { cn } from '../../../../../utils/cn';
import { useNoteContext } from '../../../context/note-context';

const CourseName = () => {
	const { currentCourse } = useNoteContext();
	const queryClient = useQueryClient();
	const nameRef = useRef<HTMLHeadingElement>(null!);
	const { toast } = useToast();
	const { mutate, isPending } = useMutation({
		mutationFn: async (data: { id: string; name: string }) =>
			await fetch(`/api/courses/${data.id}`, {
				method: 'PATCH',
				body: JSON.stringify({ name: data.name }),
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
		const newName = nameRef.current.innerText;
		// Don't want to update the same value:
		if (newName.trim() === currentCourse.name) return;
		if (newName.trim().length === 0) {
			nameRef.current.innerText = currentCourse.name;
			return;
		}
		mutate({ id: currentCourse.id, name: newName.trim() });
	};

	/**
	 * Detect Enter and Escape keys for submission or cancellation.
	 */
	const handleKeyDown = (event: React.KeyboardEvent<HTMLParagraphElement>) => {
		if (!currentCourse) return;
		if (!nameRef.current) return;
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			nameRef.current.blur(); // It automatically triggers handleSubmit()
			return;
		}
		if (event.key === 'Escape') {
			nameRef.current.innerText = currentCourse.name;
			nameRef.current.blur();
			return;
		}
	};

	// Set initial value:
	useEffect(() => {
		if (!currentCourse) return;
		if (!nameRef.current) return;
		nameRef.current.innerText = currentCourse.name;
	}, [currentCourse]);

	return (
		<h2
			ref={nameRef}
			contentEditable
			className={cn(
				'break-words pr-10 text-2xl font-bold outline-none transition',
				isPending && 'pointer-events-none opacity-50',
			)}
			onKeyDown={handleKeyDown}
			onBlur={handleSubmit}
			spellCheck={false}></h2>
	);
};

export default CourseName;
