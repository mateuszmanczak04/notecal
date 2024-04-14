'use client';

import { Button, type ButtonProps } from '@/components/ui/button';
import cn from '@/utils/cn';
import { useRouter } from 'next/navigation';
import { FC, forwardRef } from 'react';

export interface GoBackButtonProps extends ButtonProps {}

// It is a button which extends the Button component
const GoBackButton: FC<GoBackButtonProps> = forwardRef(
	({ children, className, size, variant, ...props }, ref) => {
		const router = useRouter();

		return (
			<Button
				ref={ref}
				type='button'
				className={cn(className, 'flex items-center justify-center gap-1')}
				variant={variant}
				size={size}
				onClick={router.back}
				{...props}>
				{children}
			</Button>
		);
	},
);

GoBackButton.displayName = 'GoBackButton';

export default GoBackButton;
