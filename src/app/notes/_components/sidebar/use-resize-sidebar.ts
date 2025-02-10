import { useEffect, useRef, useState } from 'react';

export const useResizeSidebar = () => {
	const [isResizing, setIsResizing] = useState(false);
	const [sidebarWidth, setSidebarWidth] = useState(360);
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
			setSidebarWidth(prev => prev - e.movementX);
		};

		document.addEventListener('mousemove', handleMouseMove);

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
		};
	}, [isResizing]);

	return { sidebarRef, sidebarWidth, handleMouseDown, handleMouseUp };
};
