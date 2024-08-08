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
				'flex h-6 max-w-52 cursor-pointer select-none items-center justify-center text-nowrap rounded-xl bg-neutral-100 px-4 transition hover:bg-neutral-200 dark:bg-neutral-700',
				className,
			)}>
			<p className='truncate'>{text}</p>
		</div>
	);
};

export default Tag;
