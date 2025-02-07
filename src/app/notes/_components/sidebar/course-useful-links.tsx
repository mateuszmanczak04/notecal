'use client';

import updateCourse from '@/app/courses/_actions/update-course';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { useToast } from '@/components/toast/use-toast';
import { cn } from '@/utils/cn';
import { addHttpsIfMissing, removeProtocol } from '@/utils/links';
import { Course as T_Course } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, X } from 'lucide-react';
import { FormEvent, useState } from 'react';

type T_Props = {
	course: T_Course;
};

const CourseUsefulLinks = ({ course }: T_Props) => {
	// Used in the form
	const [newLinkUrl, setNewLinkUrl] = useState<string>('');
	const [newLinkTitle, setNewLinkTitle] = useState<string>('');
	const queryClient = useQueryClient();
	const { toast } = useToast();
	// In the database they are saved as stringified JSON
	const [usefulLinks, setUsefulLinks] = useState<{ id: string; url: string; title?: string }[]>(
		JSON.parse(course.usefulLinks || '[]') || [],
	);
	const { mutate, isPending } = useMutation({
		mutationFn: updateCourse,
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['courses'] });
			setNewLinkUrl('');
			setNewLinkTitle('');
		},
	});

	const handleAddNew = (e: FormEvent) => {
		e.preventDefault();

		const newLinks = [...usefulLinks, { id: crypto.randomUUID(), url: newLinkUrl, title: newLinkTitle }];
		setUsefulLinks(newLinks);
		mutate({ id: course.id, usefulLinks: JSON.stringify(newLinks) });
	};

	const handleDelete = (id: string) => {
		const newLinks = usefulLinks.filter(l => l.id !== id);
		setUsefulLinks(newLinks);
		mutate({ id: course.id, usefulLinks: JSON.stringify(newLinks) });
	};

	return (
		<fieldset className='flex flex-col gap-y-4 rounded-xl border border-neutral-200 p-4 dark:border-neutral-700'>
			<legend className='px-2'>Useful links</legend>
			<article className={cn(isPending && 'pointer-events-none opacity-50')}>
				{usefulLinks.length > 0 && (
					<div className='mb-4 grid gap-y-2'>
						{usefulLinks.map(link => (
							<div
								key={link.id}
								className='group flex h-9 w-full items-center justify-between rounded-xl px-3 dark:bg-neutral-700'
								title={link.title}>
								<a
									target='_blank'
									href={addHttpsIfMissing(link.url)}
									className='block min-w-0 max-w-52 flex-1 truncate hover:underline'>
									{link?.title || removeProtocol(link.url)}
								</a>

								<button onClick={() => handleDelete(link.id)} className='hidden group-hover:block'>
									<X className='size-5' />
								</button>
							</div>
						))}
					</div>
				)}

				{/* Add new link */}
				<form
					onSubmit={handleAddNew}
					className={cn(' grid gap-2', isPending && 'pointer-events-none opacity-50')}>
					<Input
						id='create-task-title'
						placeholder='Title (optional)'
						className=' text-sm '
						aria-label='Title'
						name='title'
						value={newLinkTitle}
						onChange={e => setNewLinkTitle(e.target.value)}
					/>
					<Input
						id='create-task-title'
						placeholder='URL'
						className=' text-sm '
						aria-label='URL'
						name='url'
						value={newLinkUrl}
						onChange={e => setNewLinkUrl(e.target.value)}
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
		</fieldset>
	);
};

export default CourseUsefulLinks;
