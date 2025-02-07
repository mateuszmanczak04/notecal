'use client';

import updateCourse from '@/app/courses/_actions/update-course';
import { useToast } from '@/components/toast/use-toast';
import { cn } from '@/utils/cn';
import { COLORS } from '@/utils/colors';
import { Course } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Props = {
	course: Course;
};

const CourseColor = ({ course }: Props) => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { mutate, isPending } = useMutation({
		mutationFn: updateCourse,
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['courses'] });
		},
	});

	return (
		<div className={cn('flex flex-wrap gap-1 transition', isPending && 'pointer-events-none opacity-50')}>
			{COLORS.map(color => {
				return (
					<button
						className={cn(
							'aspect-square max-w-6 flex-1 cursor-pointer place-content-center rounded-full  border-2 border-transparent font-medium text-white transition-colors hover:opacity-90',
							course.color === color.hex && 'border-white/50',
						)}
						style={{
							backgroundColor: color.hex,
						}}
						onClick={() => mutate({ id: course.id, color: color.hex })}
						key={color.hex}></button>
				);
			})}
		</div>
	);
};

export default CourseColor;
