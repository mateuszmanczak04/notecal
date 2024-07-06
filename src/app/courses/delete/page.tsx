import DeleteCourseButton from '@/app/courses/_components/delete-course-button';
import GoBackButton from '@/components/common/go-back-button';
import { MoveLeft } from 'lucide-react';
import { redirect } from 'next/navigation';
import { FC } from 'react';

interface pageProps {
	searchParams?: { [key: string]: string | string[] | undefined };
}

const page: FC<pageProps> = ({ searchParams }) => {
	const id = searchParams?.id;

	if (!id || typeof id !== 'string') {
		redirect('/courses');
	}

	return (
		<div className='mx-auto max-w-[600px]'>
			<h1 className='text-2xl font-semibold'>Delete Course</h1>
			<p className='mt-2'>
				Are you sure you want to delete this course with all it&apos;s tasks and
				notes?
			</p>
			<div className='mt-4 flex flex-col items-center gap-2 sm:flex-row'>
				<GoBackButton
					variant='secondary'
					className='w-full flex-1 gap-1 shadow-none'>
					<MoveLeft className='h-5 w-5' />
					Cancel
				</GoBackButton>
				<DeleteCourseButton id={id} />
			</div>
		</div>
	);
};

export default page;
