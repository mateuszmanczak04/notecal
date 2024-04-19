import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
	return (
		<div className=''>
			<h1 className='text-2xl font-bold'>Your Courses:</h1>
			<div className='mt-2 flex flex-col gap-2'>
				{new Array(5).fill(0).map((_, index) => (
					<Skeleton key={index} className='h-16 w-full' />
				))}
			</div>
		</div>
	);
};

export default Loading;
