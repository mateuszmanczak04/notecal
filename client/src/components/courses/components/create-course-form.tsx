import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';
import { BACKEND_DOMAIN } from '../../../utils/app-domain';
import { cn } from '../../../utils/cn';
import { COLORS } from '../../../utils/colors';
import { Button } from '../../button';
import { Input } from '../../input';
import LoadingSpinner from '../../loading-spinner';
import { useToast } from '../../toast/use-toast';

type T_Props = {
	handleCloseModal: () => void;
};

const CreateCourseForm = ({ handleCloseModal }: T_Props) => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { mutate, isPending } = useMutation({
		mutationFn: async (data: { name: string; teacher: string; color: string }) =>
			await fetch(`${BACKEND_DOMAIN}/api/courses`, {
				method: 'POST',
				body: JSON.stringify(data),
			}).then(res => res.json()),
		// onMutate: data => {
		// 	queryClient.setQueryData(['courses'], (prevCourses: Course[]) => {
		// 		const newTempCourse = createTemporaryCourse(data);
		// 		return [...prevCourses, newTempCourse];
		// 	});
		// 	handleCloseModal();
		// }, // TODO
		onSettled: async data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			await queryClient.invalidateQueries({ queryKey: ['courses'] });
			await queryClient.invalidateQueries({ queryKey: ['notes'] });
			await queryClient.refetchQueries({ queryKey: ['courses'] });
			await queryClient.refetchQueries({ queryKey: ['notes'] });
			handleCloseModal();
		},
	});

	const [name, setName] = useState('');
	const [teacher, setTeacher] = useState('');
	const [selectedColor, setSelectedColor] = useState<string>(COLORS[0].hex);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		mutate({ name, teacher, color: selectedColor });
	};

	return (
		<form onSubmit={handleSubmit} className='mt-4 space-y-4 sm:space-y-6 md:space-y-8'>
			{/* Name field */}
			<div>
				<label htmlFor='name' className='mb-1 block px-2 after:text-red-500 after:content-["_*"]'>
					Name
				</label>
				<Input
					placeholder='Computer Science'
					name='name'
					id='name'
					value={name}
					onChange={e => setName(e.target.value)}
					required
				/>
			</div>

			{/* Teacher field */}
			<div>
				<label htmlFor='teacher' className='mb-1 block px-2 after:text-red-500 after:content-["_*"]'>
					Teacher
				</label>
				<Input
					placeholder='Computer Science'
					name='teacher'
					id='teacher'
					value={teacher}
					onChange={e => setTeacher(e.target.value)}
					required
				/>
			</div>

			{/* Color field */}
			<input type='hidden' name='color' value={selectedColor} />
			<div className='grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-7'>
				{COLORS.map(color => {
					return (
						<div
							className={cn(
								'grid h-9 w-full place-content-center rounded-xl border-2 border-transparent font-medium text-white transition-all hover:opacity-90',
								selectedColor === color.hex && 'border-white/50',
							)}
							onClick={() => setSelectedColor(color.hex)}
							style={{
								backgroundColor: color.hex,
							}}
							key={color.hex}>
							<span
								className={cn(
									'rounded-xl bg-neutral-900/50 px-1 text-sm leading-5 transition',
									selectedColor === color.hex ? 'opacity-1' : 'opacity-0',
								)}>
								{color.description}
							</span>
						</div>
					);
				})}
			</div>

			<Button type='submit' className='w-full'>
				{isPending && <LoadingSpinner />}
				Create
			</Button>
		</form>
	);
};

export default CreateCourseForm;
