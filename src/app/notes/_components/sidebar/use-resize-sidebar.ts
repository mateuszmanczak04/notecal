import { useSettings } from '@/hooks/use-settings';
import { useEffect, useRef, useState } from 'react';

export const useResizeSidebar = () => {
	const [isResizing, setIsResizing] = useState(false);
	const { noteSidebarWidth, setNoteSidebarWidth } = useSettings();
	const sidebarRef = useRef<HTMLDivElement>(null!);

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsResizing(true);
	};

	const handleMouseUp = () => {
		setIsResizing(false);
	};

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!isResizing) return;
			setNoteSidebarWidth(prev => prev - e.movementX);
		};

		document.addEventListener('mousemove', handleMouseMove);

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
		};
	}, [isResizing, setNoteSidebarWidth]);

	return { sidebarRef, noteSidebarWidth, handleMouseDown, handleMouseUp };
};
