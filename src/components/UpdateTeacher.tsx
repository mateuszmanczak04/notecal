'use client';

import { FC } from 'react';
import SubmitButton from './SubmitButton';
import Input from './Input';
import { useFormState } from 'react-dom';
import updateTeacher from '@/actions/updateTeacher';
import ResultMessage from './ResultMessage';

interface UpdateTeacherProps {
	id: string;
	teacher?: string;
}

const UpdateTeacher: FC<UpdateTeacherProps> = ({ id, teacher = '' }) => {
	const [result, dispatch] = useFormState(updateTeacher, undefined);

	return (
		<form className='mt-8' action={dispatch}>
			<input type='hidden' name='id' value={id} />
			<label htmlFor='new-teacher-input' className='block font-medium'>
				Teacher name (optional)
			</label>
			<Input
				type='text'
				name='teacher'
				id='new-teacher-input'
				placeholder={teacher}
				defaultValue={teacher}
				className='mt-1 w-full'
			/>
			<SubmitButton className='mt-2 w-full'>Save</SubmitButton>
			{result && <ResultMessage result={result} />}
		</form>
	);
};

export default UpdateTeacher;
