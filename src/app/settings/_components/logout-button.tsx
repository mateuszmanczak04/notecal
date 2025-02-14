'use client';

import logout from '@/app/auth/_actions/logout';
import { Button } from '@/components/button';
import LoadingSpinner from '@/components/loading-spinner';
import { useMutation } from '@tanstack/react-query';
import { LogOut } from 'lucide-react';

const LogoutButton = () => {
	const { mutate: handleLogout, isPending: isLogoutPending } = useMutation({
		mutationFn: logout,
	});

	return (
		<Button variant='secondary' onClick={() => handleLogout()} className='w-full'>
			{isLogoutPending && <LoadingSpinner />}
			<LogOut className='h-4 w-4' />
			Logout
		</Button>
	);
};

export default LogoutButton;
