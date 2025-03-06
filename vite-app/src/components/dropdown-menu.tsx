import { ChevronDown } from 'lucide-react';
import React, { createContext, RefObject, useContext, useRef, useState } from 'react';
import { ClassNameValue } from 'tailwind-merge';
import { useOnClickOutside } from 'usehooks-ts';
import { cn } from '../utils/cn';
import Tag from './tag';

const DropdownMenuContext = createContext(
	{} as {
		isOpen: boolean;
		setIsOpen: (isOpen: boolean) => void;
		handleToggle: () => void;
		menuRef: RefObject<HTMLDivElement>;
	},
);

const DropdownMenuContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null!);

	const handleToggle = () => {
		if (isOpen) {
			setIsOpen(false);
		} else {
			setIsOpen(true);
		}
	};

	return (
		<DropdownMenuContext.Provider
			value={{
				isOpen,
				setIsOpen,
				handleToggle,
				menuRef,
			}}
		>
			{children}
		</DropdownMenuContext.Provider>
	);
};

const useDropdownMenuContext = () => {
	const context = useContext(DropdownMenuContext);
	return context;
};

export const DropdownMenuItem = ({
	value,
	className,
	children,
	onSelect,
}: {
	value: any;
	className?: ClassNameValue;
	children: React.ReactNode;
	onSelect: (value: any) => void;
}) => {
	const { setIsOpen } = useDropdownMenuContext();
	const handleSelect = () => {
		setIsOpen(false);
		onSelect(value);
	};

	return (
		<button
			className={cn(
				'flex h-9 cursor-pointer select-none items-center justify-center gap-2 truncate text-nowrap px-4 font-medium transition hover:bg-neutral-100 sm:max-w-none dark:hover:bg-neutral-500',
				className,
			)}
			onClick={handleSelect}
		>
			{children}
		</button>
	);
};

export const DropdownMenuList = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: ClassNameValue;
}) => {
	const { isOpen } = useDropdownMenuContext();

	if (!isOpen) return null;
	return (
		<div
			className={cn(
				'absolute left-0 top-9 z-20 flex w-full flex-col justify-center overflow-hidden rounded-b-xl border-b border-l border-r bg-white shadow-xl dark:border-neutral-500 dark:bg-neutral-600',
				className,
			)}
		>
			{children}
		</div>
	);
};

export const DropdownMenuTrigger = ({
	children,
	className,
	showChevron,
}: {
	children: React.ReactNode;
	className?: ClassNameValue;
	showChevron?: boolean;
}) => {
	const { isOpen, handleToggle } = useDropdownMenuContext();

	return (
		<Tag
			onClick={handleToggle}
			className={cn(
				'h-full max-w-none truncate rounded-none border border-l border-r border-t border-transparent font-medium',
				isOpen ? 'rounded-t-xl dark:border-neutral-500' : 'rounded-xl',
				className,
			)}
		>
			{children}
			{showChevron && <ChevronDown className='h-4 w-4 shrink-0' />}
		</Tag>
	);
};

const DropdownMenuWrapper = ({ children, className }: { children: React.ReactNode; className?: ClassNameValue }) => {
	const { setIsOpen, menuRef } = useDropdownMenuContext();

	useOnClickOutside(menuRef, () => {
		setIsOpen(false);
	});

	return (
		<div className={cn('relative h-9 text-sm sm:text-base', className)} ref={menuRef}>
			{children}
		</div>
	);
};

export const DropdownMenu = ({ className, children }: { children: React.ReactNode; className?: ClassNameValue }) => {
	return (
		<DropdownMenuContextProvider>
			<DropdownMenuWrapper className={className}>{children}</DropdownMenuWrapper>
		</DropdownMenuContextProvider>
	);
};
