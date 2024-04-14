import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FC } from 'react';
import RenameCourse from './RenameCourse';
import UpdateTeacher from './UpdateTeacher';

interface EditCourseProps {
	id: string;
	name: string;
	teacher?: string;
}

const EditCourse: FC<EditCourseProps> = ({ id, name, teacher }) => {
	if (!id || !name) {
		redirect('/courses');
	}

	return (
		<div className='w-full'>
			<h1 className='text-2xl font-semibold'>Edit Course</h1>
			<RenameCourse id={id} name={name} />
			<UpdateTeacher id={id} teacher={teacher} />
			<Button asChild variant='destructive' className='mt-8 w-full gap-1'>
				<Link href={`/courses/delete?id=${id}&name=${name}`}>
					<Trash2 className='h-4 w-4' />
					Delete Course
				</Link>
			</Button>
		</div>
	);
};

export default EditCourse;
