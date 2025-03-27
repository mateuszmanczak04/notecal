import { useMutation } from '@tanstack/react-query';
import { LogOut } from 'lucide-react';
import { Button } from '../../button';
import LoadingSpinner from '../../loading-spinner';

const LogoutButton = () => {
	const { mutate, isPending } = useMutation({
		mutationFn: async () =>
			await fetch('/api/auth/logout', { method: 'POST' }).then(res => {
				if (res.ok) {
					window.location.reload();
				}
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
