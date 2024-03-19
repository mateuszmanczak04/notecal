import { useFormStatus } from 'react-dom';
import Button, { type ButtonProps } from './Button';
import { LoaderIcon } from 'lucide-react';
import { FC, forwardRef } from 'react';
import cn from '@/utils/cn';

export interface SubmitButtonProps extends ButtonProps {}

// It is a button which extends the Button component
const SubmitButton: FC<SubmitButtonProps> = forwardRef(
	({ children, className, size, variant, ...props }, ref) => {
		const { pending } = useFormStatus();
		return (
			<Button
				ref={ref}
				type='submit'
				disabled={pending}
				className={cn(className, 'flex items-center justify-center gap-1')}
				variant={variant}
				size={size}
				{...props}>
				{pending && <LoaderIcon className='animate-spin' />} {children}
			</Button>
		);
	},
);

SubmitButton.displayName = 'SubmitButton';

export default SubmitButton;
