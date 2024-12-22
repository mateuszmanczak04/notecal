'use client';

import ErrorMessage from '@/components/common/error-message';
import GoBackButton from '@/components/common/go-back-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn, COLORS } from '@/lib/utils';
import { useActionState, useState } from 'react';
import createCourse from '../_actions/create-course';

const CreateCourseForm = () => {
	const [state, formAction] = useActionState(createCourse, null);

	const [selectedColor, setSelectedColor] = useState<string>(COLORS[0].hex);

	return (
		<form action={formAction} className='mt-4 space-y-4 sm:space-y-6 md:space-y-8'>
			{/* Name field */}
			<div>
				<label htmlFor='name' className='mb-1 block px-2 after:text-red-500 after:content-["_*"]'>
					Name
				</label>
				<Input placeholder='Computer Science' name='name' id='name' required />
			</div>

			{/* Teacher field */}
			<div>
				<label htmlFor='teacher' className='mb-1 block px-2 after:text-red-500 after:content-["_*"]'>
					Teacher
				</label>
				<Input placeholder='Computer Science' name='teacher' id='teacher' required />
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
				<Button type='submit'>Create</Button>
			</div>

			{/* Optional result */}
			{state?.error && <ErrorMessage>{state.error}</ErrorMessage>}
		</form>
	);
};

export default CreateCourseForm;
