'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { FC, useCallback, useEffect, useRef, type ElementRef } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
	children: React.ReactNode;
	className?: string;
}

const Modal: FC<ModalProps> = ({ children, className }) => {
	const router = useRouter();
	const dialogRef = useRef<ElementRef<'dialog'>>(null);

	// close the modal when the user clicks the close button
	const handleClose = useCallback(() => {
		router.back();
	}, [router]);

	// open the modal when the component mounts
	useEffect(() => {
		if (!dialogRef.current?.open) {
			dialogRef.current?.showModal();
		}
	}, [handleClose]);

	// using createPortal to render the modal as the last child of the body
	// this is to ensure that the modal is not affected by the parent's styles
	// and to avoid z-index issues
	return createPortal(
		<dialog
			ref={dialogRef}
			className={cn(
				'flex w-full flex-col gap-4 rounded-md bg-white p-4 backdrop:bg-black backdrop:bg-opacity-75',
				className,
			)}>
			<Button variant='secondary' onClick={handleClose}>
				Close
			</Button>
			{children}
		</dialog>,
		document.getElementById('modal-root')!,
	);
};

export default Modal;
