import { useState } from 'react';

/**
 * Utility hook to handle opening and closing of note's context menu
 */
export const useNoteContextMenu = () => {
	const [contextMenuPosition, setContextMenuPosition] = useState<{ x: number; y: number } | null>(null);
	const handleContextMenu = (event: React.MouseEvent) => {
		event.preventDefault();
		setContextMenuPosition({ x: event.clientX, y: event.clientY });
	};
	const closeContextMenu = () => {
		setContextMenuPosition(null);
	};

	return {
		contextMenuPosition,
		handleContextMenu,
		closeContextMenu,
	};
};
