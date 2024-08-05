import { cn } from '@/lib/utils';
import { FC, MouseEvent } from 'react';

interface TagProps {
	text: string;
	className?: string;
	onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

const Tag: FC<TagProps> = ({ text, className, onClick }) => {
	return (
		<div
			onClick={onClick}
			className={cn(
				'flex h-6 w-fit cursor-pointer select-none items-center justify-center overflow-hidden truncate text-nowrap rounded-md bg-gray-100 px-4 transition hover:bg-gray-200',
				className,
			)}>
			{text}
		</div>
	);
};

export default Tag;
