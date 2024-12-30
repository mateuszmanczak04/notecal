'use client';

import updateCourse from '@/app/courses/_actions/update-course';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { useToast } from '@/components/toast/use-toast';
import { cn } from '@/utils/cn';
import { addHttpsIfMissing, removeProtocol } from '@/utils/links';
import { Course } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { FormEvent, useState } from 'react';

type Props = {
	course: Course;
};

const UsefulLinks = ({ course }: Props) => {
	// Used in the form
	const [newLink, setNewLink] = useState<string>('');
	const queryClient = useQueryClient();
	const { toast } = useToast();
	// In the database they are saved as stringified JSON
	const [usefulLinks, setUsefulLinks] = useState<string[]>(JSON.parse(course.usefulLinks || '[]') || []);
	const { mutate, isPending } = useMutation({
		mutationFn: updateCourse,
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['courses'] });
			setNewLink('');
		},
	});

	const handleAddNew = (e: FormEvent) => {
		e.preventDefault();

		const newLinks = [...usefulLinks, newLink];
		setUsefulLinks(newLinks);
		mutate({ id: course.id, usefulLinks: JSON.stringify(newLinks) });
	};

	return (
		<article className={cn(isPending && 'pointer-events-none opacity-50')}>
			<div className='grid gap-y-2 overflow-x-clip'>
				{usefulLinks.map(link => (
					<a target='_blank' href={addHttpsIfMissing(link)} key={link} className='truncate underline'>
						{removeProtocol(link)}
						{/* TODO: delete functionality */}
					</a>
				))}
			</div>

			{/* Add new link */}
			<form
				onSubmit={handleAddNew}
				className={cn('mt-4 grid gap-2', isPending && 'pointer-events-none opacity-50')}>
				<Input
					id='create-task-title'
					placeholder='New link'
					className=' text-sm '
					aria-label='New link'
					name='title'
					value={newLink}
					onChange={e => setNewLink(e.target.value)}
					required
				/>
				<Button
					className='rounded-xl text-sm'
					type='submit'
					disabled={isPending}
					style={{ backgroundColor: course?.color || '' }}>
					<Plus className='h-5 w-5' />
					Add new link to the list
				</Button>
			</form>
		</article>
	);
};

export default UsefulLinks;
