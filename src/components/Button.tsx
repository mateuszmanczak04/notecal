import cn from '@/utils/cn';
import { VariantProps, cva } from 'class-variance-authority';
import { ButtonHTMLAttributes, FC, forwardRef } from 'react';

export const buttonVariants = cva('transition rounded-md font-medium', {
	variants: {
		variant: {
			primary:
				'bg-primary disabled:bg-primary/50 disabled:cursor-not-allowed hover:bg-primary/90 text-white',
			secondary: 'bg-gray-200 text-black hover:bg-gray-300',
		},
		size: {
			small: 'h-8 px-2',
			medium: 'h-10 px-3',
			large: 'h-12 px-4',
		},
	},
	defaultVariants: {
		variant: 'primary',
		size: 'medium',
	},
});

export interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	ref?: React.Ref<HTMLButtonElement>;
}

const Button: FC<ButtonProps> = forwardRef(
	({ children, className, size, variant, ...props }, ref) => {
		return (
			<button
				ref={ref}
				className={cn(buttonVariants({ className, variant, size }))}
				{...props}>
				{children}
			</button>
		);
	},
);

Button.displayName = 'Button';

export default Button;
