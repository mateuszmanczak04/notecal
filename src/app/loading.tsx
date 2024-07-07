import LoadingSpinner from '@/components/common/loading-spinner';

const Loading = async () => {
	return (
		<div className='flex h-full w-full items-center justify-center'>
			<LoadingSpinner />
		</div>
	);
};

export default Loading;
