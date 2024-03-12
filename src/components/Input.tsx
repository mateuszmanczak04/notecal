import cn from '@/utils/cn';
import { VariantProps, cva } from 'class-variance-authority';
import { FC, InputHTMLAttributes, forwardRef } from 'react';

export const inputVariants = cva(
	'transition rounded-md border-2 border-gray-200',
	{
		variants: {
			variant: {
				default: 'bg-white text-black',
				disabled: 'bg-gray-400 text-gray-800',
			},
			inputSize: {
				small: 'h-8 px-2',
				medium: 'h-10 px-3',
				large: 'h-12 px-4',
			},
		},
		defaultVariants: {
			variant: 'default',
			inputSize: 'medium',
		},
	},
);

export interface InputProps
	extends InputHTMLAttributes<HTMLInputElement>,
		VariantProps<typeof inputVariants> {
	ref?: React.Ref<HTMLInputElement>;
}

const Input: FC<InputProps> = forwardRef(
	({ children, className, inputSize, variant, ...props }, ref) => {
		return (
			<input
				ref={ref}
				className={cn(inputVariants({ className, variant, inputSize }))}
				{...props}>
				{children}
			</input>
		);
	},
);

Input.displayName = 'Input';

export default Input;
