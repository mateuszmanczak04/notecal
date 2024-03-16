import Input from './Input';
import Button from './Button';
import createCourse from '@/actions/createCourse';

const CreateCourse = () => {
	return (
		<div className='w-full'>
			<p className='text-2xl font-semibold'>Create a new Course</p>
			<form action={createCourse} className='mt-4 flex flex-col gap-4'>
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
				<Button
					type='submit'
					className='w-full'
					variant='primary'
					size='medium'>
					Create a New Course
				</Button>
			</form>
		</div>
	);
};

export default CreateCourse;
