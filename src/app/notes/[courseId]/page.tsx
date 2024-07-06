'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// This page is useless
const NotePage = () => {
	const router = useRouter();

	useEffect(() => {
		router.push('/calendar');
	}, [router]);

	return null;
};

export default NotePage;
