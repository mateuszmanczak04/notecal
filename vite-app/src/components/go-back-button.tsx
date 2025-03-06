import { forwardRef } from 'react';
import { Button, type ButtonProps } from './button';

// It is a button which extends the Button component
const GoBackButton = forwardRef<HTMLButtonElement, ButtonProps>(({ children, className, variant, ...props }, ref) => {
	// const router = useRouter();

	return (
		<Button
			ref={ref}
			type='button'
			className={className}
			variant={variant}
			// onClick={router.back}
			{...props}
		>
			{children}
		</Button>
	);
});

GoBackButton.displayName = 'GoBackButton';

export default GoBackButton;
