import Button from '@/components/Button';
import DeleteCourse from '@/components/DeleteCourse';
import GoBackButton from '@/components/GoBackButton';
import { redirect } from 'next/navigation';
import { FC } from 'react';

interface pageProps {
	searchParams?: { [key: string]: string | string[] | undefined };
}

const page: FC<pageProps> = ({ searchParams }) => {
	const id = searchParams?.id;
	const name = searchParams?.name;

	if (!id || typeof id !== 'string' || !name || typeof name !== 'string') {
		redirect('/courses');
	}

	return (
		<div>
			<h1 className='text-2xl font-semibold'>Delete Course</h1>
			<p>
				Are you sure you want to delete this course? <strong>{name}</strong>
			</p>
			<div className='mt-4 flex items-center gap-2'>
				<GoBackButton variant='secondary' size='medium' className='flex-1'>
					Cancel
				</GoBackButton>
				<DeleteCourse id={id} className='flex-1' />
			</div>
		</div>
	);
};

export default page;
