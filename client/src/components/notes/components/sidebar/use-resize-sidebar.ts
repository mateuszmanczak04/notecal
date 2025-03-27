import { useEffect, useRef, useState } from 'react';
import { useSettings } from '../../../../hooks/use-settings';

export const useResizeSidebar = () => {
	const [isResizing, setIsResizing] = useState(false);
	const { noteSidebarWidth, setNoteSidebarWidth } = useSettings();
	const sidebarRef = useRef<HTMLDivElement>(null!);

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsResizing(true);
	};

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!isResizing) return;
			setNoteSidebarWidth(prev => {
				if (prev - e.movementX < 240) {
					setIsResizing(false);
					return 240;
				}
				if (prev - e.movementX > 600) {
					setIsResizing(false);
					return 600;
				}
				return prev - e.movementX;
			});
		};

		const handleMouseUp = () => {
			setIsResizing(false);
		};

		document.addEventListener('mouseup', handleMouseUp);
		document.addEventListener('mousemove', handleMouseMove);

		return () => {
			document.removeEventListener('mouseup', handleMouseUp);
			document.removeEventListener('mousemove', handleMouseMove);
		};
	}, [isResizing, setNoteSidebarWidth]);

	return { sidebarRef, noteSidebarWidth, handleMouseDown };
};
