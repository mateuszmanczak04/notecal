'use client';

import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { type ElementRef, FC, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
	children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ children }) => {
	const router = useRouter();
	const dialogRef = useRef<ElementRef<'dialog'>>(null);

	// open the modal when the component mounts
	useEffect(() => {
		if (!dialogRef.current?.open) {
			dialogRef.current?.showModal();
		}
	}, []);

	// close the modal when the user clicks the close button
	const handleClose = () => {
		router.back();
	};

	// using createPortal to render the modal as the last child of the body
	// this is to ensure that the modal is not affected by the parent's styles
	// and to avoid z-index issues
	return createPortal(
		// dialog by itself does not have a close button, so we wrap it in a div
		<div onClick={handleClose}>
			<dialog
				ref={dialogRef}
				className='flex flex-col gap-4 bg-white p-4 backdrop:bg-black backdrop:bg-opacity-75'
				onClose={handleClose}>
				<Button variant='secondary' onClick={handleClose}>
					Close
				</Button>
				{children}
			</dialog>
		</div>,
		document.getElementById('modal-root')!,
	);
};

export default Modal;
