import { cn } from '@/lib/utils';
import React, { FC } from 'react';

interface Props {
	children: React.ReactNode;
	className?: string;
}

const ErrorMessage: FC<Props> = ({ children, className }) => {
	return (
		<div
			className={cn(
				'flex h-8 items-center justify-center rounded-md bg-red-100 px-4 text-red-500',
				className,
			)}>
			{children}
		</div>
	);
};

export default ErrorMessage;
