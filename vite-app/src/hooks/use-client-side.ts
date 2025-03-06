import { useEffect, useState } from 'react';

/**
 * Used to check if the code is running on the client side. It's useful to avoid running client-side code on the server.
 */
export const useClientSide = () => {
	const [onClientSide, setOnClientSide] = useState(false);
	useEffect(() => setOnClientSide(true), []); // won't be invoked on server side, so it will be always false there
	return onClientSide;
};
