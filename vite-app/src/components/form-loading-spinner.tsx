import { useFormStatus } from 'react-dom';
import { ClassNameValue } from 'tailwind-merge';
import LoadingSpinner from './loading-spinner';

type Props = {
	className?: ClassNameValue;
};

/**
 * A component which returns LoadingSpinner only if it's inside the pending form.
 */
const FormLoadingSpinner = ({ className }: Props) => {
	const { pending } = useFormStatus();
	if (!pending) return;
	return <LoadingSpinner className={className} />;
};

export default FormLoadingSpinner;
