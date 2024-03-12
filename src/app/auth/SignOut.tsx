import logout from '@/actions/logout';
import Button from '@/components/Button';

const SignOut = ({ variant }: { variant: 'primary' | 'secondary' }) => {
	return (
		<form action={logout}>
			<Button type='submit' variant={variant} size='medium' className='w-full'>
				Sign Out
			</Button>
		</form>
	);
};

export default SignOut;
