import LoadingSpinner from '../loading-spinner';

const LoadingScreen = () => {
	return (
		<div className='fixed inset-0 flex flex-col items-center justify-center text-center'>
			<h1 className='text-2xl font-semibold'>Please wait for a second!</h1>
			<p className='max-w-md text-balance text-lg text-neutral-500 dark:text-neutral-400'>
				We are loading all necessary data to make Your app experience better 😊
			</p>
			<LoadingSpinner className='size-20' />
		</div>
	);
};

export default LoadingScreen;
