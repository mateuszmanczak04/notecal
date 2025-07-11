import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../utils/cn';

const buttonVariants = cva(
	'inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-xl text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 transition',
	{
		variants: {
			variant: {
				default: 'bg-primary-600 text-white hover:opacity-90',
				destructive:
					'bg-error-100 text-error-800 hover:bg-error-200 dark:bg-error-600 dark:text-white dark:hover:bg-error-400',
				outline: 'border border-primary-500 bg-white hover:bg-primary-100 hover:text-primary-400',
				secondary:
					'bg-neutral-100 text-neutral-800 dark:hover:bg-neutral-600 hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-100',
				ghost: 'hover:bg-neutral-100 hover:text-neutral-700',
				link: 'text-primary-500 underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-9 px-4 py-2',
				sm: 'h-8 px-3 text-xs',
				lg: 'h-10 px-8',
				icon: 'h-9 w-9',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';
		return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
	},
);
Button.displayName = 'Button';

export { Button, buttonVariants };
