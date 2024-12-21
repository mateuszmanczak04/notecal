import { useEffect, useState } from 'react';

/**
 * Main purpose: optimistic updates and not blocking UPDATE requests before CREATE request ends.
 * @method enqueue adds a new async function to the queue which will be fired immediately after the previous one has finished work
 */
export const useAsyncFunctionQueue = () => {
	const [queue, setQueue] = useState<(() => Promise<void>)[]>([]);
	const [isProcessing, setIsProcessing] = useState(false);

	// TODO: if there is something in the background show "Do you really want to quit?" when user tried to close the tab

	const enqueue = (fn: () => Promise<void>) => {
		setQueue(prev => [...prev, fn]);
	};

	useEffect(() => {
		const processQueue = async () => {
			if (isProcessing) return;

			setIsProcessing(true);

			const [head, ...newQueue] = queue;

			try {
				await head();
			} finally {
				setQueue(newQueue);
				setIsProcessing(false);
			}
		};

		if (queue.length === 0 || isProcessing) return;
		processQueue();
	}, [isProcessing, queue]);

	return { enqueue, empty: queue.length === 0 };
};
