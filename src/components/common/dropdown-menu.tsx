'use client';

import { cn } from '@/lib/utils';
import { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import Tag from './tag';
import { ClassNameValue } from 'tailwind-merge';

type Props = {
	currentOption: {
		value: any;
		label: string;
		className?: ClassNameValue;
	};
	options: {
		value: any;
		label: string;
		className?: ClassNameValue;
	}[];
	onChange: (value: string) => void;
	className?: ClassNameValue;
	height?: number;
};

const DropdownMenu = ({
	currentOption,
	options,
	onChange,
	className,
	height = 9,
}: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement | null>(null);

	const handleCloseMenu = () => {
		setIsOpen(false);
	};

	const handleOpenMenu = () => {
		setIsOpen(true);
	};

	const handleToggleMenu = () => {
		if (isOpen) {
			handleCloseMenu();
		} else {
			handleOpenMenu();
		}
	};

	const handleSelect = (value: any) => {
		onChange(value);
		handleCloseMenu();
	};

	useOnClickOutside(menuRef, () => {
		handleCloseMenu();
	});

	return (
		<div
			className={cn('relative text-sm sm:text-base', className, `h-${height}`)}
			ref={menuRef}>
			<Tag
				text={currentOption.label || 'None'}
				onClick={handleToggleMenu}
				className={cn(
					'h-full max-w-none rounded-none border border-l border-r border-t border-transparent',
					isOpen ? 'rounded-t-xl dark:border-neutral-500' : 'rounded-xl',
					currentOption.className,
				)}
			/>
			{isOpen && (
				<div
					className={cn(
						'absolute left-0 z-20 flex w-full flex-col justify-center rounded-b-xl border-b border-l border-r bg-white shadow-xl dark:border-neutral-500 dark:bg-neutral-600',
						`top-${height}`,
					)}>
					<button
						className={cn(
							'w-full cursor-pointer select-none text-nowrap px-4 transition hover:bg-neutral-100 dark:hover:bg-neutral-500',
							`h-${height}`,
						)}
						onClick={() => {
							handleSelect(null);
						}}>
						No course
					</button>
					{options?.map(option => (
						<button
							className={cn(
								'cursor-pointer select-none truncate text-nowrap px-4 transition hover:bg-neutral-100 dark:hover:bg-neutral-500 sm:max-w-none',
								`h-${height}`,
								option.className,
							)}
							key={option.value}
							onClick={() => {
								handleSelect(option.value);
							}}>
							{option.label}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default DropdownMenu;
