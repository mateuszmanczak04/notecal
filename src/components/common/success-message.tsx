import { cn } from '@/lib/utils';
import React, { FC } from 'react';

interface Props {
	children: React.ReactNode;
	className?: string;
}

const SuccessMessage: FC<Props> = ({ children, className }) => {
	return (
		<div
			className={cn(
				'flex items-center justify-center rounded-md bg-green-100 px-3 py-2 text-green-500',
				className,
			)}>
			{children}
		</div>
	);
};

export default SuccessMessage;
