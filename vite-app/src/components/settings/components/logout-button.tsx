import { useMutation } from '@tanstack/react-query';
import { LogOut } from 'lucide-react';
import { Button } from '../../../components/button';
import LoadingSpinner from '../../../components/loading-spinner';

const LogoutButton = () => {
	const { mutate, isPending } = useMutation({
		mutationFn: async () =>
			await fetch('/api/auth/logout', { method: 'POST' }).then(() => {
				window.location.reload();
			}),
	});

	return (
		<Button variant='secondary' onClick={() => mutate()} className='w-full'>
			{isPending && <LoadingSpinner />}
			<LogOut className='h-4 w-4' />
			Logout
		</Button>
	);
};

export default LogoutButton;
