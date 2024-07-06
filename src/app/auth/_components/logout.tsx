import logout from '@/app/auth/_actions/logout';
import { Button, type ButtonProps } from '@/components/ui/button';

const Logout = ({ variant }: { variant: ButtonProps['variant'] }) => {
	return (
		<form action={logout}>
			<Button type='submit' variant={variant} className='w-full'>
				Logout
			</Button>
		</form>
	);
};

export default Logout;
