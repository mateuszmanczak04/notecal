'use client';

import Input from './Input';
import createCourse from '@/actions/createCourse';
import { useFormState } from 'react-dom';
import SubmitButton from './SubmitButton';
import ResultMessage from './ResultMessage';

const CreateCourse = () => {
	const [result, dispatch] = useFormState(createCourse, undefined);

	return (
		<div className='w-full'>
			<p className='text-2xl font-semibold'>Create a new Course</p>
			<form
				action={async (fd: FormData) => {
					dispatch(fd);
				}}
				className='mt-4 flex flex-col gap-4'>
				<div className='w-full'>
					<label htmlFor='course-name-input' className='block font-medium'>
						Name of the Course<span className='text-red-500'> *</span>
					</label>
					<Input
						type='text'
						name='name'
						id='course-name-input'
						required
						placeholder='Computer Science'
						className='mt-1 w-full'
					/>
				</div>
				<div className='w-full'>
					<label htmlFor='course-teacher-input' className='block font-medium'>
						Teacher name (optional)
					</label>
					<Input
						type='text'
						name='teacher'
						id='course-teacher-input'
						placeholder='John Doe'
						className='mt-1 w-full'
					/>
				</div>
				<SubmitButton>Create a New Course</SubmitButton>
				{result && <ResultMessage result={result} />}
			</form>
		</div>
	);
};

export default CreateCourse;
