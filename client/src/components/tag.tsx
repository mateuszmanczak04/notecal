import React, { FC, MouseEvent } from 'react';
import { cn } from '../utils/cn';

interface TagProps {
	className?: string;
	onClick?: (event: MouseEvent<HTMLDivElement>) => void;
	children: React.ReactNode;
}

const Tag: FC<TagProps> = ({ children, className, onClick }) => {
	return (
		<div
			onClick={onClick}
			className={cn(
				'flex h-6 max-w-52 select-none items-center justify-center gap-2 text-nowrap rounded-xl bg-neutral-100 px-4 transition hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600',
				className,
			)}>
			{children}
		</div>
	);
};

export default Tag;
