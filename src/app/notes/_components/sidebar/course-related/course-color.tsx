'use client';

import { useNoteContext } from '@/app/notes/_content/note-context';
import { useToast } from '@/components/toast/use-toast';
import { useClientSide } from '@/hooks/use-client-side';
import { cn } from '@/utils/cn';
import { COLORS } from '@/utils/colors';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const CourseColor = () => {
	const { currentCourse } = useNoteContext();
	const isClient = useClientSide();
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { mutate, isPending } = useMutation({
		mutationFn: async (data: { id: string; color: string }) =>
			await fetch(`/api/courses/${data.id}`, {
				method: 'PATCH',
				body: JSON.stringify({ color: data.color }),
			}).then(res => res.json()),
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['courses'] });
		},
	});

	return (
		<div className={cn('mt-4 flex flex-wrap gap-1 transition', isPending && 'pointer-events-none opacity-50')}>
			{COLORS.map(color => {
				return (
					<button
						className={cn(
							'aspect-square max-w-6 flex-1 cursor-pointer place-content-center rounded-full  border-2 border-transparent font-medium text-white transition-colors hover:opacity-90',
							isClient ? currentCourse?.color === color.hex && 'border-white/50' : '',
						)}
						style={{
							backgroundColor: color.hex,
						}}
						onClick={() => mutate({ id: currentCourse?.id || '', color: color.hex })}
						key={color.hex}></button>
				);
			})}
		</div>
	);
};

export default CourseColor;
