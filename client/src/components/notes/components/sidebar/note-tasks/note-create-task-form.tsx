import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { T_Course } from '../../../../../types';
import { cn } from '../../../../../utils/cn';
import { Button } from '../../../../button';
import { Input } from '../../../../input';
import { useToast } from '../../../../toast/use-toast';

type Props = {
	course: T_Course;
};

const NoteCreateTaskForm = ({ course }: Props) => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { mutate, isPending } = useMutation({
		mutationFn: async (data: { title: string; courseId: string }) =>
			await fetch('/api/tasks', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
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

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		mutate({ title, courseId: course.id });
		setTitle('');
	};

	return (
		<form onSubmit={handleSubmit} className={cn('grid gap-2', isPending && 'pointer-events-none opacity-50')}>
			<Input
				id='create-task-title'
				placeholder='New task title'
				className='text-sm'
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
				<Plus className='size-5' />
				Create a new task
			</Button>
		</form>
	);
};

export default NoteCreateTaskForm;
