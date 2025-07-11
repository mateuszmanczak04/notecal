import React, { FC } from 'react';
import { cn } from '../utils/cn';

interface Props {
	children: React.ReactNode;
	className?: string;
}

const ErrorMessage: FC<Props> = ({ children, className }) => {
	return (
		<div
			className={cn(
				'flex items-center justify-center rounded-xl bg-red-100 px-3 py-2 text-red-500 dark:bg-red-800 dark:text-red-100',
				className,
			)}
		>
			{children}
		</div>
	);
};

export default ErrorMessage;
