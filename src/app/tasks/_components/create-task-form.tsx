'use client';

import { useAppContext } from '@/app/_components/app-context';
import { Button } from '@/components/button';
import FormLoadingSpinner from '@/components/form-loading-spinner';
import { Input } from '@/components/input';
import { Command, Plus } from 'lucide-react';
import { FormEvent, useEffect, useRef, useTransition } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

const CreateTaskForm = () => {
	const { createTask } = useAppContext();
	const [isPending, startTransition] = useTransition();

	const inputRef = useRef<HTMLInputElement | null>(null);

	const handleFocusInput = () => {
		if (!inputRef.current) return;
		inputRef.current.focus();
	};
	const { isIntersecting, ref: intersectorRef } = useIntersectionObserver();

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
		startTransition(async () => {
			const formData = new FormData(e.target as HTMLFormElement);
			const title = formData.get('title')!.toString();
			await createTask({ title });
			(e.target as HTMLFormElement).reset();
		});
	};

	return (
		<aside
			ref={intersectorRef}
			className='z-20 space-y-4 rounded-2xl bg-white p-4 shadow-[0_0_32px_-20px_rgba(0,0,0,0.3)] sm:sticky sm:top-0 sm:p-8 dark:bg-neutral-700'
			onClick={handleFocusInput}>
			{/* Heading */}
			<h2 className='text-xl font-bold sm:text-2xl'>
				Create a new task <br className='sm:hidden' />
				<span className='text-base'>
					(<Command className='mb-1 inline h-4 w-4' /> + K)
				</span>
			</h2>

			{/* Main form */}
			<form onSubmit={handleSubmit} className='flex flex-col gap-4 sm:flex-row sm:gap-0'>
				<Input
					id='create-task-title'
					placeholder='Do the math homework'
					className='h-11 sm:rounded-r-none sm:border-r-transparent sm:text-base'
					aria-label='New task title'
					name='title'
					required
					ref={inputRef}
				/>
				<Button className='h-11 sm:rounded-l-none sm:text-base' type='submit'>
					<FormLoadingSpinner />
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
