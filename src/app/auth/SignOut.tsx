import logout from '@/actions/logout';
import { Button, type ButtonProps } from '@/components/ui/button';

const SignOut = ({ variant }: { variant: ButtonProps['variant'] }) => {
	return (
		<form action={logout}>
			<Button type='submit' variant={variant} className='w-full'>
				Sign Out
			</Button>
		</form>
	);
};

export default SignOut;
