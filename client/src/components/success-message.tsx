import React, { FC } from 'react';
import { cn } from '../utils/cn';

interface Props {
	children: React.ReactNode;
	className?: string;
}

const SuccessMessage: FC<Props> = ({ children, className }) => {
	return (
		<div
			className={cn(
				'flex items-center justify-center rounded-xl bg-green-100 px-3 py-2 text-green-500 dark:bg-green-800 dark:text-green-100',
				className,
			)}
		>
			{children}
		</div>
	);
};

export default SuccessMessage;
