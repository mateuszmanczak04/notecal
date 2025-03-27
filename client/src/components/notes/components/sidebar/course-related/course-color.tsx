import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cn } from '../../../../../utils/cn';
import { COLORS } from '../../../../../utils/colors';
import { useToast } from '../../../../toast/use-toast';
import { useNoteContext } from '../../../context/note-context';

const CourseColor = () => {
	const { currentCourse } = useNoteContext();
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { mutate, isPending } = useMutation({
		mutationFn: async (data: { id: string; color: string }) =>
			await fetch(`/api/courses/${data.id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
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
							'aspect-square max-w-6 flex-1 place-content-center rounded-full border-2 border-transparent font-medium text-white transition-colors hover:opacity-90',
							currentCourse?.color === color.hex && 'border-white/50',
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
