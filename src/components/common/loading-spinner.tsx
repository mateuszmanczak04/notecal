import { cn } from '@/lib/utils';
import { ScaleLoader } from 'react-spinners';

const LoadingSpinner = ({ className }: { className?: string }) => {
	return <ScaleLoader className={cn('mx-auto', className)} />;
};

export default LoadingSpinner;
