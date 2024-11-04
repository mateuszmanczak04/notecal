import LoadingSpinner from '@/components/common/loading-spinner';

const Loading = () => {
	return (
		<div className='grid h-full w-full place-content-center'>
			<div className='flex flex-col gap-4'>
				<LoadingSpinner />
				<p className='animate-pulse'>
					Give us a second, we are loading your data 😅
				</p>
			</div>
		</div>
	);
};

export default Loading;
