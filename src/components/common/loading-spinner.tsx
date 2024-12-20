import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';
import { ClassNameValue } from 'tailwind-merge';

const LoadingSpinner = ({ className }: { className?: ClassNameValue }) => {
	return (
		<LoaderCircle
			className={cn('animate-spin motion-reduce:animate-[spin_1.5s_linear_infinite]', className)}
			role='status'
			aria-label='loading spinner'
		/>
	);
};

export default LoadingSpinner;
