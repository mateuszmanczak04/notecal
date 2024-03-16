'use client';

import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import {
	type ElementRef,
	FC,
	useEffect,
	useRef,
	MouseEventHandler,
	useCallback,
} from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
	children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ children }) => {
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
			className='backdrop:bg-black backdrop:bg-opacity-75'>
			<div className='flex flex-col gap-4 rounded-md bg-white p-4'>
				<Button variant='secondary' onClick={handleClose}>
					Close
				</Button>
				{children}
			</div>
		</dialog>,
		document.getElementById('modal-root')!,
	);
};

export default Modal;
