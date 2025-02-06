'use client';

import createTask from '@/app/tasks/_actions/create-task';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { useToast } from '@/components/toast/use-toast';
import { cn } from '@/utils/cn';
import { Course } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

type Props = {
	course?: Course;
};

const NoteCreateTaskForm = ({ course }: Props) => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { mutate, isPending } = useMutation({
		mutationFn: createTask,
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
		},
	});
	const [title, setTitle] = useState('');
	const inputRef = useRef<HTMLInputElement>(null!);
	const { isIntersecting, ref: intersectorRef } = useIntersectionObserver();

	const handleFocusInput = () => {
		inputRef.current.focus();
	};

	// Detect keyboard shortcut
	useEffect(() => {
		if (!inputRef.current) return;

		const listener = (e: KeyboardEvent) => {
			// Don't do anything if input is active
			if (inputRef.current === document.activeElement) return;

			// Focus input on Cmd + K
			if (e.metaKey && e.key.toLowerCase() === 'k') {
				handleFocusInput();
			}
		};
		window.addEventListener('keydown', listener);

		return () => {
			window.removeEventListener('keydown', listener);
		};
	}, []);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		mutate({ title, courseId: course?.id });
		setTitle('');
	};

	return (
		<form onSubmit={handleSubmit} className={cn('grid gap-2', isPending && 'pointer-events-none opacity-50')}>
			<Input
				id='create-task-title'
				placeholder='New task title'
				className=' text-sm '
				aria-label='New task title'
				name='title'
				value={title}
				onChange={e => setTitle(e.target.value)}
				required
			/>
			<Button
				className='rounded-xl text-sm'
				type='submit'
				disabled={isPending}
				style={{ backgroundColor: course?.color || '' }}>
				<Plus className='h-5 w-5' />
				Create a new task
			</Button>
		</form>
	);
};

export default NoteCreateTaskForm;
