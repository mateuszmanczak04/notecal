'use client';

import { Button } from '@/components/ui/button';
import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { FC, useLayoutEffect, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

interface MenuProps {
	courseId: string;
}

const Menu: FC<MenuProps> = ({ courseId }) => {
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement | null>(null);

	const handleCloseMenu = () => {
		setIsOpen(false);
	};

	const handleToggleIsOpen = () => {
		setIsOpen(prevState => !prevState);
	};

	useOnClickOutside(menuRef, handleCloseMenu);

	useLayoutEffect(() => {}, []);

	return (
		<div className='relative' ref={menuRef}>
			<Button size='icon' variant='secondary' onClick={handleToggleIsOpen}>
				<EllipsisVertical className='h-6 w-6' />
			</Button>
			{isOpen && (
				<div className='absolute right-10 top-0 flex flex-col gap-2 rounded-xl border bg-white p-2 shadow-xl'>
					<Link
						href={`/courses/edit?id=${courseId}`}
						className='flex h-10 shrink-0 items-center gap-1 rounded-md px-4 transition hover:bg-neutral-100'
						onClick={handleCloseMenu}>
						<Pencil className='h-4 w-4' />
						Edit
					</Link>
					<Link
						href={`/courses/delete?id=${courseId}`}
						className='flex h-10 shrink-0 items-center gap-1 rounded-md bg-red-50 px-4 text-red-500 transition hover:bg-red-100'
						onClick={handleCloseMenu}>
						<Trash2 className='h-4 w-4' />
						Delete
					</Link>
				</div>
			)}
		</div>
	);
};

export default Menu;
