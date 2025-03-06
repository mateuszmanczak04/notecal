import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Command, Plus } from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';
import { Button } from '../../../components/button';
import { Input } from '../../../components/input';
import { useToast } from '../../../components/toast/use-toast';
import { T_Course } from '../../../types';
import { BACKEND_DOMAIN } from '../../../utils/app-domain';
import { cn } from '../../../utils/cn';

type Props = {
	course?: T_Course;
};

const CreateTaskForm = ({ course }: Props) => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { mutate, isPending } = useMutation({
		mutationFn: async (data: { title: string; courseId: string }) =>
			await fetch(`${BACKEND_DOMAIN}/api/tasks`, {
				method: 'POST',
				body: JSON.stringify(data),
			}).then(res => res.json()),
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
		mutate({ title, courseId: course?.id || '' });
		setTitle('');
	};

	return (
		<aside
			ref={intersectorRef}
			className={cn(
				'z-20 space-y-4 rounded-2xl bg-white p-4 shadow-[0_0_32px_-20px_rgba(0,0,0,0.3)] sm:sticky sm:top-4 sm:p-8 dark:bg-neutral-700',
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
