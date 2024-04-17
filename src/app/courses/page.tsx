import CourseItem from '@/components/CourseItem';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const page = async () => {
	const courses = await db.course.findMany();

	return (
		<>
			<h1 className='text-2xl font-bold'>Your Courses:</h1>
			<div className='mt-2 flex flex-col gap-2'>
				{courses &&
					courses.length > 0 &&
					courses.map(course => (
						<CourseItem
							key={course.id}
							id={course.id}
							name={course.name}
							teacher={course.teacher}
						/>
					))}
				{!courses.length && (
					<p className='text-lg text-gray-500'>
						You don&apos;t have any courses yet.
					</p>
				)}
				<Button
					asChild
					variant='secondary'
					size='lg'
					className='flex items-center justify-center gap-1 font-semibold'>
					<Link href='/courses/create'>
						<Plus className='h-6 w-6' /> Create a New Course
					</Link>
				</Button>
			</div>
		</>
	);
};

export default page;
