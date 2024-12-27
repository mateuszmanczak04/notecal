'use client';

import { Button } from '@/components/button';
import FormLoadingSpinner from '@/components/form-loading-spinner';
import GoBackButton from '@/components/go-back-button';
import { Input } from '@/components/input';
import { cn } from '@/utils/cn';
import { COLORS } from '@/utils/colors';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import createCourse from '../_actions/create-course';

const CreateCourseForm = () => {
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: createCourse,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['courses'] });
		},
	});
	const router = useRouter();

	const [name, setName] = useState('');
	const [teacher, setTeacher] = useState('');
	const [selectedColor, setSelectedColor] = useState<string>(COLORS[0].hex);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		mutate({ name, teacher, color: selectedColor });
		router.push('/courses');
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
			<div className='grid grid-cols-3 gap-2 sm:grid-cols-4	md:grid-cols-7'>
				{COLORS.map(color => {
					return (
						<div
							className={cn(
								'grid h-9 w-full cursor-pointer place-content-center rounded-xl border-2 border-transparent font-medium text-white transition-all hover:opacity-90',
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

			{/* Buttons */}
			<div className='grid gap-x-4 gap-y-2 sm:grid-cols-2'>
				<GoBackButton variant='secondary'>Cancel</GoBackButton>
				<Button type='submit'>
					<FormLoadingSpinner />
					Create
				</Button>
			</div>
		</form>
	);
};

export default CreateCourseForm;
