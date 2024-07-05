import { cn } from '@/lib/utils';
import { FC } from 'react';

interface TagProps {
	text: string;
	className?: string;
}

const Tag: FC<TagProps> = ({ text, className }) => {
	return (
		<div
			className={cn(
				'flex h-6 w-fit cursor-pointer items-center justify-center rounded-md bg-gray-100 px-4',
				className,
			)}>
			{text}
		</div>
	);
};

export default Tag;
