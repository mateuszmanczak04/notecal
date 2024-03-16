'use client';

import Input from './Input';
import Button from './Button';
import createCourse from '@/actions/createCourse';
import { useFormState, useFormStatus } from 'react-dom';
import { LoaderIcon } from 'lucide-react';

const SubmitButton = () => {
	const { pending } = useFormStatus();
	return (
		<Button
			type='submit'
			disabled={pending}
			aria-disabled={pending}
			className='flex w-full items-center justify-center gap-1'
			variant='primary'
			size='medium'>
			{pending && <LoaderIcon className='animate-spin' />} Create a New Course
		</Button>
	);
};

const CreateCourse = () => {
	const [course, dispatch] = useFormState(createCourse, undefined);

	return (
		<div className='w-full'>
			<p className='text-2xl font-semibold'>Create a new Course</p>
			<form
				action={async (fd: FormData) => {
					dispatch(fd);
				}}
				className='mt-4 flex flex-col gap-4'>
				<div className='w-full'>
					<label htmlFor='course-name' className='block font-medium'>
						Name of the Course<span className='text-red-500'> *</span>
					</label>
					<Input
						type='text'
						name='courseName'
						id='course-name'
						required
						placeholder='Computer Science'
						className='mt-1 w-full'
					/>
				</div>
				<div className='w-full'>
					<label htmlFor='course-teacher' className='block font-medium'>
						Teacher name (optional)
					</label>
					<Input
						type='text'
						name='courseTeacher'
						id='course-teacher'
						placeholder='John Doe'
						className='mt-1 w-full'
					/>
				</div>
				<SubmitButton />
			</form>
		</div>
	);
};

export default CreateCourse;
