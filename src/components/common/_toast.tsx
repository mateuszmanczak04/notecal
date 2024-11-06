'use client';

import { cn } from '@/lib/utils';
import React, { createContext, useContext, useState } from 'react';
import { ClassNameValue } from 'tailwind-merge';
import { Button } from '../ui/button';

export const ToastTitle = ({ className, children }: { className?: ClassNameValue; children: React.ReactNode }) => {
	return <p className={cn('text-xl font-bold', className)}>{children}</p>;
};

export const ToastBody = ({ className, children }: { className?: ClassNameValue; children: React.ReactNode }) => {
	return <p className={cn('mt-2 text-neutral-500', className)}>{children}</p>;
};

export const ToastButtons = ({ className, children }: { className?: ClassNameValue; children: React.ReactNode }) => {
	return <div className={cn('mt-4 flex w-full gap-4', className)}>{children}</div>;
};

export const ToastPrimaryButton = ({
	className,
	children,
	onClick,
}: {
	className?: ClassNameValue;
	children: React.ReactNode;
	onClick?: () => void;
}) => {
	return (
		<Button onClick={onClick} className={cn('flex-1', className)}>
			{children}
		</Button>
	);
};

export const ToastSecondaryButton = ({
	className,
	children,
	onClick,
}: {
	className?: ClassNameValue;
	children: React.ReactNode;
	onClick?: () => void;
}) => {
	return (
		<Button variant='secondary' onClick={onClick} className={cn('flex-1', className)}>
			{children}
		</Button>
	);
};

export const Toast = ({ className, children }: { className?: ClassNameValue; children: React.ReactNode }) => {
	return (
		<div className={cn('fixed bottom-8 right-8 z-50 max-w-96 rounded-xl bg-white p-4 shadow-xl', className)}>
			{children}
		</div>
	);
};

const ToastContext = createContext(
	{} as {
		openToast: (
			title?: React.ReactNode,
			body?: React.ReactNode,
			onSecondaryClick?: () => void,
			onPrimaryClick?: () => void,
			secondaryButtonContent?: React.ReactNode,
			primaryButtonContent?: React.ReactNode,
			showButtons?: boolean,
			showSecondaryButton?: boolean,
			showPrimaryButton?: boolean,
		) => void;
		hideToast: () => void;
	},
);

export const ToastContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [title, setTitle] = useState<React.ReactNode | undefined>();
	const [body, setBody] = useState<React.ReactNode | undefined>();
	const [secondaryButtonContent, setSecondaryButtonContent] = useState<React.ReactNode | undefined>();
	const [primaryButtonContent, setPrimaryButtonContent] = useState<React.ReactNode | undefined>();
	const [onSecondaryClick, setOnSecondaryClick] = useState<(() => void) | undefined>();
	const [onPrimaryClick, setOnPrimaryClick] = useState<(() => void) | undefined>();
	const [showButtons, setShowButtons] = useState<boolean | undefined>();
	const [showSecondaryButton, setShowSecondaryButton] = useState<boolean | undefined>();
	const [showPrimaryButton, setShowPrimaryButton] = useState<boolean | undefined>();

	const hideToast = () => {
		setIsOpen(false);
	};

	const openToast = (
		title?: React.ReactNode,
		body?: React.ReactNode,
		onSecondaryClick?: () => void,
		onPrimaryClick?: () => void,
		secondaryButtonContent?: React.ReactNode,
		primaryButtonContent?: React.ReactNode,
		showButtons?: boolean,
		showSecondaryButton?: boolean,
		showPrimaryButton?: boolean,
	) => {
		setTitle(title);
		setBody(body);
		setOnSecondaryClick(onSecondaryClick);
		setOnPrimaryClick(onPrimaryClick);
		setSecondaryButtonContent(secondaryButtonContent);
		setPrimaryButtonContent(primaryButtonContent);
		setShowButtons(showButtons);
		setShowSecondaryButton(showSecondaryButton);
		setShowPrimaryButton(showPrimaryButton);

		// Automatically close after 3 seconds
		setIsOpen(true);
		setTimeout(() => {
			hideToast();
		}, 3000);
	};

	return (
		<ToastContext.Provider value={{ openToast, hideToast }}>
			{children}

			{/* Toast component */}
			{isOpen && (
				<Toast>
					{title && <ToastTitle>{title}</ToastTitle>}
					{body && <ToastBody>{body}</ToastBody>}
					{showButtons && (
						<ToastButtons>
							{showSecondaryButton && (
								<ToastSecondaryButton onClick={onSecondaryClick}>
									{secondaryButtonContent}
								</ToastSecondaryButton>
							)}
							{showPrimaryButton && (
								<ToastPrimaryButton onClick={onPrimaryClick}>{primaryButtonContent}</ToastPrimaryButton>
							)}
						</ToastButtons>
					)}
				</Toast>
			)}
		</ToastContext.Provider>
	);
};

export const useToast = () => {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error('useToast must be used within ToastContextProvider');
	}
	return context;
};
