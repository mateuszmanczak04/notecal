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
				'flex h-8 items-center justify-center rounded-md bg-green-100 px-4 text-green-500',
				className,
			)}>
			{children}
		</div>
	);
};

export default SuccessMessage;
