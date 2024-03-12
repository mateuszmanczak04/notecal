import Button from '@/components/Button';
import { auth } from '@/utils/auth';
import { Pencil, Trash2 } from 'lucide-react';
import { redirect } from 'next/navigation';

const Course = async ({ title }: { title: string }) => {
	const session = await auth();
	if (!session) redirect('/auth/signup');

	return (
		<div className='flex w-full flex-col rounded-md bg-gray-100 p-4 text-lg font-semibold text-black'>
			<p>{title}</p>
			<div className='mt-2 flex w-full justify-between gap-2'>
				<Button
					size='small'
					className='flex flex-1 items-center justify-center gap-1'
					variant='primary'>
					{/* <Brain className='h-4 w-4' /> */}
					Notes
				</Button>
				<Button
					size='small'
					className='flex flex-1 items-center justify-center gap-1 '
					variant='secondary'>
					<Pencil className='h-4 w-4' />
					Edit
				</Button>
				<Button
					size='small'
					className='flex flex-1 items-center justify-center gap-1'
					variant='secondary'>
					<Trash2 className='h-4 w-4' />
					Delete
				</Button>
			</div>
		</div>
	);
};

const COURSES = [
	{
		id: 1,
		title: 'Course 1',
	},
	{
		id: 2,
		title: 'Course 2',
	},
	{
		id: 3,
		title: 'Course 3',
	},
];

const page = () => {
	return (
		<div className='p-4'>
			<h1 className='text-2xl font-bold'>Your Courses:</h1>
			<div className='mt-2 flex flex-col gap-2'>
				<Button variant='secondary' size='large'>
					+ Create a New Course
				</Button>
				{COURSES.map(course => (
					<Course key={course.id} {...course} />
				))}
			</div>
		</div>
	);
};

export default page;
