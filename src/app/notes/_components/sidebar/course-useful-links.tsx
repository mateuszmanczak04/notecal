'use client';

import updateCourse from '@/app/courses/_actions/update-course';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { useToast } from '@/components/toast/use-toast';
import { cn } from '@/utils/cn';
import { addHttpsIfMissing, removeProtocol } from '@/utils/links';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GripVertical, Plus, X } from 'lucide-react';
import { Reorder } from 'motion/react';
import { FormEvent, useState } from 'react';
import { useNoteContext } from '../../_content/note-context';

const CourseUsefulLinks = () => {
	const { currentCourse } = useNoteContext();
	// Used in the form
	const [newLinkUrl, setNewLinkUrl] = useState<string>('');
	const [newLinkTitle, setNewLinkTitle] = useState<string>('');
	const queryClient = useQueryClient();
	const { toast } = useToast();
	// In the database they are saved as stringified JSON
	const [usefulLinks, setUsefulLinks] = useState<{ id: string; url: string; title?: string }[]>(
		JSON.parse(currentCourse?.usefulLinks || '[]') || [],
	);
	const [hasChangedOrder, setHasChangedOrder] = useState(false);

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
		if (!currentCourse) return;
		e.preventDefault();
		const newLinks = [...usefulLinks, { id: crypto.randomUUID(), url: newLinkUrl, title: newLinkTitle }];
		setUsefulLinks(newLinks);
		mutate({ id: currentCourse.id, usefulLinks: JSON.stringify(newLinks) });
	};

	const handleDelete = (id: string) => {
		if (!currentCourse) return;
		const newLinks = usefulLinks.filter(l => l.id !== id);
		setUsefulLinks(newLinks);
		mutate({ id: currentCourse.id, usefulLinks: JSON.stringify(newLinks) });
	};

	const handleSaveNewOrder = () => {
		if (!currentCourse) return;
		mutate({ id: currentCourse.id, usefulLinks: JSON.stringify(usefulLinks) });
		setHasChangedOrder(false);
	};

	if (!currentCourse) return;

	return (
		<div className='flex flex-col border-b border-neutral-200 p-6 dark:border-neutral-700'>
			<p className='font-semibold'>Useful links</p>
			<p className='mb-4 mt-2 text-sm opacity-75'>Keep some links to external sources in one place</p>

			{/* List of existing links */}
			{hasChangedOrder && (
				<Button
					className='mb-2 w-full'
					style={{ backgroundColor: currentCourse.color }}
					onClick={handleSaveNewOrder}>
					Save new order
				</Button>
			)}

			{usefulLinks.length > 0 && (
				<Reorder.Group
					values={usefulLinks}
					onReorder={newLinks => {
						setUsefulLinks(newLinks);
						setHasChangedOrder(true);
					}}>
					{usefulLinks.map(link => (
						<Reorder.Item
							value={link}
							whileDrag={{ pointerEvents: 'none' }}
							key={link.id}
							className='group mt-2 flex h-9 w-full cursor-move items-center justify-start overflow-hidden rounded-xl border border-neutral-200 bg-white pr-3 text-sm first-of-type:mt-0 dark:border-neutral-700 dark:bg-neutral-800'
							title={link.title}>
							<div className='mr-3 grid h-full w-6 place-content-center bg-neutral-100 dark:bg-neutral-700'>
								<GripVertical className='size-4' />
							</div>
							<a
								target='_blank'
								href={addHttpsIfMissing(link.url)}
								className='block min-w-0 flex-1 truncate hover:underline'>
								{link?.title || removeProtocol(link.url)}
							</a>

							<button onClick={() => handleDelete(link.id)} className='ml-auto hidden group-hover:block'>
								<X className='size-5' />
							</button>
						</Reorder.Item>
					))}
				</Reorder.Group>
			)}

			{/* Add new link */}
			<form
				onSubmit={handleAddNew}
				className={cn(
					'mt-2 grid gap-2',
					usefulLinks.length === 0 && 'mt-4',
					isPending && 'pointer-events-none opacity-50',
				)}>
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
					placeholder='URL (required)'
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
					style={{ backgroundColor: currentCourse?.color || '' }}>
					<Plus className='size-5' />
					Add new link to the list
				</Button>
			</form>
		</div>
	);
};

export default CourseUsefulLinks;
