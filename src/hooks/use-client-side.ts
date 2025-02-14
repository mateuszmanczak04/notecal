import { useEffect, useState } from 'react';

export const useClientSide = () => {
	const [onClientSide, setOnClientSide] = useState(false);
	useEffect(() => setOnClientSide(true), []); // won't be invoked on server side, so it will be always false there
	return onClientSide;
};
