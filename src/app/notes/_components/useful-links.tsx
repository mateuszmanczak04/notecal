'use client';

import updateCourse from '@/app/courses/_actions/update-course';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { useToast } from '@/components/toast/use-toast';
import { cn } from '@/utils/cn';
import { addHttpsIfMissing, removeProtocol } from '@/utils/links';
import { Course } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, X } from 'lucide-react';
import { FormEvent, useState } from 'react';

type Props = {
	course: Course;
};

const UsefulLinks = ({ course }: Props) => {
	// Used in the form
	const [newLinkUrl, setNewLinkUrl] = useState<string>('');
	const [newLinkTitle, setNewLinkTitle] = useState<string>('');
	const queryClient = useQueryClient();
	const { toast } = useToast();
	// In the database they are saved as stringified JSON
	const [usefulLinks, setUsefulLinks] = useState<{ url: string; title?: string }[]>(
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

		const newLinks = [...usefulLinks, { url: newLinkUrl, title: newLinkTitle }];
		setUsefulLinks(newLinks);
		mutate({ id: course.id, usefulLinks: JSON.stringify(newLinks) });
	};

	const handleDelete = (url: string) => {
		const newLinks = usefulLinks.filter(l => l.url !== url);
		setUsefulLinks(newLinks);
		mutate({ id: course.id, usefulLinks: JSON.stringify(newLinks) });
	};

	return (
		<article className={cn(isPending && 'pointer-events-none opacity-50')}>
			<div className='grid gap-y-2'>
				{usefulLinks.map(link => (
					<div
						key={link.url + link.title}
						className='group flex h-9 w-full cursor-pointer items-center justify-between rounded-xl px-3 dark:bg-neutral-700'
						title={link.title}>
						<a
							target='_blank'
							href={addHttpsIfMissing(link.url)}
							className='block min-w-0 max-w-52 flex-1 truncate hover:underline'>
							{link?.title || removeProtocol(link.url)}
						</a>

						<button onClick={() => handleDelete(link.url)}>
							<X className='size-5' />
						</button>
					</div>
				))}
			</div>

			{/* Add new link */}
			<form
				onSubmit={handleAddNew}
				className={cn('mt-2 grid gap-2', isPending && 'pointer-events-none opacity-50')}>
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
	);
};

export default UsefulLinks;
