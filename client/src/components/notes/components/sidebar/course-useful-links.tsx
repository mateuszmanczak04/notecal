import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, X } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { cn } from '../../../../utils/cn';
import { addHttpsIfMissing, removeProtocol } from '../../../../utils/links';
import { Button } from '../../../button';
import { Input } from '../../../input';
import { useToast } from '../../../toast/use-toast';
import { useNoteContext } from '../../context/note-context';

const CourseUsefulLinks = () => {
	const { currentCourse } = useNoteContext();
	// Used in the form
	const [newLinkUrl, setNewLinkUrl] = useState<string>('');
	const [newLinkTitle, setNewLinkTitle] = useState<string>('');
	const queryClient = useQueryClient();
	const { toast } = useToast();
	// In the database they are saved as stringified JSON
	const [usefulLinks, setUsefulLinks] = useState<{ id: string; url: string; title?: string }[]>([]);

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: { id: string; usefulLinks: string }) =>
			await fetch(`/api/courses/${data.id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ usefulLinks: data.usefulLinks }),
			}).then(res => res.json()),
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

	useEffect(() => {
		setUsefulLinks(JSON.parse(currentCourse?.usefulLinks || '[]') || []);
	}, [currentCourse?.usefulLinks]);

	return (
		<div className='flex flex-col space-y-2 border-b border-neutral-200 p-6 dark:border-neutral-700'>
			<p className='font-semibold'>Useful links</p>
			<p className='text-sm opacity-75'>Keep some links to external sources in one place</p>

			{usefulLinks.length > 0 && (
				<div>
					{usefulLinks.map(link => (
						<div
							key={link.id}
							className='group mt-2 flex h-9 w-full cursor-move items-center justify-start overflow-hidden rounded-xl border border-neutral-200 bg-white px-3 text-sm first-of-type:mt-0 dark:border-neutral-700 dark:bg-neutral-800'
							title={link.title}>
							{/* <div className='mr-3 grid h-full w-6 place-content-center bg-neutral-100 dark:bg-neutral-700'>
								<GripVertical className='size-4' />
							</div> */}
							<a
								target='_blank'
								href={addHttpsIfMissing(link.url)}
								className='block min-w-0 flex-1 truncate hover:underline'>
								{link?.title || removeProtocol(link.url)}
							</a>

							<button onClick={() => handleDelete(link.id)} className='ml-auto hidden group-hover:block'>
								<X className='size-5' />
							</button>
						</div>
					))}
				</div>
			)}

			{/* Add new link */}
			<form
				onSubmit={handleAddNew}
				className={cn(
					'grid gap-2',
					usefulLinks.length === 0 && 'mt-4',
					isPending && 'pointer-events-none opacity-50',
				)}>
				<Input
					id='create-task-title'
					placeholder='Title (optional)'
					className='text-sm'
					aria-label='Title'
					name='title'
					value={newLinkTitle}
					onChange={e => setNewLinkTitle(e.target.value)}
				/>
				<Input
					id='create-task-title'
					placeholder='URL (required)'
					className='text-sm'
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
