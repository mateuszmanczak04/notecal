'use client';

import { FC } from 'react';
import Input from './Input';
import SubmitButton from './SubmitButton';
import renameCourse from '@/actions/renameCourse';
import { useFormState } from 'react-dom';
import ResultMessage from './ResultMessage';

interface RenameCourseProps {
	id: string;
	name: string;
}

const RenameCourse: FC<RenameCourseProps> = ({ id, name }) => {
	const [result, dispatch] = useFormState(renameCourse, undefined);

	return (
		<form className='mt-4' action={dispatch}>
			<input type='hidden' name='id' value={id} />
			<label htmlFor='nwe-course-name-input' className='block font-medium'>
				Name of the Course
			</label>
			<Input
				type='text'
				name='name'
				id='new-course-name-input'
				required
				placeholder={name}
				defaultValue={name}
				className='mt-1 w-full'
			/>
			<SubmitButton className='mt-2 w-full'>Save</SubmitButton>
			{result && <ResultMessage result={result} />}
		</form>
	);
};

export default RenameCourse;