import { useState, useTransition } from 'react';
import { Button } from '../../../components/button';
import ErrorMessage from '../../../components/error-message';
import FormLoadingSpinner from '../../../components/form-loading-spinner';
import { Input } from '../../../components/input';
import LoadingSpinner from '../../../components/loading-spinner';
import SuccessMessage from '../../../components/success-message';

const ChangePasswordSetting = () => {
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const [isPending, startTransition] = useTransition();
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		startTransition(async () => {
			setError('');
			setMessage('');
			const res = await fetch('/api/user/password', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ oldPassword, newPassword }),
			}).then(res => res.json());
			if ('error' in res) {
				setError(res.error);
			}
			if ('message' in res) {
				setMessage(res.message);
				setOldPassword('');
				setNewPassword('');
			}
		});
	};

	return (
		<section className='flex flex-col gap-2'>
			<h2 className='text-lg font-semibold'>Change your password</h2>

			<form onSubmit={handleSubmit} className='mt-2 flex flex-col gap-4'>
				{/* Old password field */}
				<div>
					<label htmlFor='change-password-old' className='mb-1 block px-2 font-medium'>
						Old password
					</label>
					<Input
						placeholder='******'
						type='password'
						name='oldPassword'
						id='change-password-old'
						required
						value={oldPassword}
						onChange={e => setOldPassword(e.target.value)}
					/>
				</div>

				{/* New password field */}
				<div>
					<label htmlFor='change-password-new' className='mb-1 block px-2 font-medium'>
						New password
					</label>
					<Input
						placeholder='******'
						type='password'
						name='newPassword'
						id='change-password-new'
						required
						value={newPassword}
						onChange={e => setNewPassword(e.target.value)}
					/>
				</div>

				{/* Submit button */}
				<Button type='submit' className='gap-2'>
					{isPending && <LoadingSpinner />}
					Save changes
				</Button>

				{message && <SuccessMessage>{message}</SuccessMessage>}
				{error && <ErrorMessage>{error}</ErrorMessage>}

				<FormLoadingSpinner />
			</form>
		</section>
	);
};

export default ChangePasswordSetting;
