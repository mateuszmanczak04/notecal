import logout from '@/app/auth/_actions/logout';
import { Button, type ButtonProps } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const Logout = ({ variant }: { variant: ButtonProps['variant'] }) => {
	return (
		<form action={logout}>
			<Button type='submit' variant={variant} className='w-full'>
				<LogOut className='h-5 w-5' />
				Logout
			</Button>
		</form>
	);
};

export default Logout;
