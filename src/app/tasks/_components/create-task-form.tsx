'use client';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { cn } from '@/utils/cn';
import { useMutation } from '@tanstack/react-query';
import { Command, Plus } from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';
import createTask from '../_actions/create-task';

type Props = {
	/** Specify use case for this component. It can be user either big one in /tasks page or as a small task in /notes/[id] page. */
	forPage?: 'tasks' | 'notes';
	courseId?: string;
};

const CreateTaskForm = ({ forPage = 'tasks', courseId }: Props) => {
	const { mutate, isPending } = useMutation({
		mutationFn: createTask,
	});
	const [title, setTitle] = useState('');
	const inputRef = useRef<HTMLInputElement>(null!);
	const { isIntersecting, ref: intersectorRef } = useIntersectionObserver();

	const handleFocusInput = () => {
		inputRef.current.focus();
	};

	// Detect keyboard shortcut
	useEffect(() => {
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
		mutate({ title, courseId });
		(e.target as HTMLFormElement).reset();
	};

	if (forPage === 'notes') {
		return (
			<form
				onSubmit={handleSubmit}
				className={cn(
					'grid gap-2 rounded-xl bg-neutral-700 p-2',
					isPending && 'pointer-events-none opacity-50',
				)}>
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
				<Button className='rounded-xl text-sm' type='submit' disabled={isPending}>
					<Plus className='h-5 w-5' />
					Create a new task
				</Button>
			</form>
		);
	}

	return (
		<aside
			ref={intersectorRef}
			className={cn(
				'z-20 space-y-4 rounded-2xl bg-white p-4 shadow-[0_0_32px_-20px_rgba(0,0,0,0.3)] sm:sticky sm:top-0 sm:p-8 dark:bg-neutral-700',
				isPending && 'opacity-50',
			)}
			onClick={handleFocusInput}>
			{/* Heading */}
			<h2 className='text-xl font-bold sm:text-2xl'>
				Create a new task <br className='sm:hidden' />
				<span className='text-base'>
					(<Command className='mb-1 inline h-4 w-4' /> + K)
				</span>
			</h2>

			{/* Main form */}
			<form
				onSubmit={handleSubmit}
				className={cn(
					'flex flex-col gap-4 sm:flex-row sm:gap-0',
					isPending && 'pointer-events-none opacity-50',
				)}>
				<Input
					id='create-task-title'
					placeholder='Do the math homework'
					className='h-11 sm:rounded-r-none sm:border-r-transparent sm:text-base'
					aria-label='New task title'
					name='title'
					required
					value={title}
					onChange={e => setTitle(e.target.value)}
					ref={inputRef}
				/>
				<Button className='h-11 sm:rounded-l-none sm:text-base' type='submit' disabled={isPending}>
					<Plus className='h-5 w-5' />
					Add to the list
				</Button>
			</form>

			{/* Should appear only on mobile when form is not visible */}
			{!isIntersecting && (
				<Button type='button' size='icon' className='fixed bottom-8 right-8 z-20 h-12 w-12 rounded-full'>
					<Plus />
				</Button>
			)}
		</aside>
	);
};

export default CreateTaskForm;
