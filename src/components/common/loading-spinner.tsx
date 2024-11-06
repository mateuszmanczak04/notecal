import { cn } from '@/lib/utils';

const LoadingSpinner = ({ className }: { className?: string }) => {
	return (
		<div
			className={cn(
				'mx-auto inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-neutral-800 motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-neutral-100',
				className,
			)}
			role='status'
			aria-label='loading spinner'
		></div>
	);
};

export default LoadingSpinner;
