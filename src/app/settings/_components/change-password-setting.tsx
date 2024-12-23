'use client';

import { Button } from '@/components/button';
import ErrorMessage from '@/components/error-message';
import FormLoadingSpinner from '@/components/form-loading-spinner';
import { Input } from '@/components/input';
import SuccessMessage from '@/components/success-message';
import { useActionState } from 'react';
import changePassword from '../_actions/change-password';

const ChangePasswordSetting = () => {
	const [state, formAction] = useActionState(changePassword, { message: '' });

	return (
		<section className='flex flex-col gap-2'>
			<h2 className='text-lg font-semibold'>Change your password</h2>

			<form action={formAction} className='mt-2 flex flex-col gap-4'>
				{/* Old password field */}
				<div>
					<label htmlFor='change-password-old' className='mb-1 block px-2 font-medium'>
						Old password
					</label>
					<Input placeholder='******' type='password' name='oldPassword' id='change-password-old' required />
				</div>

				{/* New password field */}
				<div>
					<label htmlFor='change-password-new' className='mb-1 block px-2 font-medium'>
						New password
					</label>
					<Input placeholder='******' type='password' name='newPassword' id='change-password-new' required />
				</div>

				{/* Submit button */}
				<Button type='submit' className='gap-2'>
					Save changes
				</Button>

				{/* Form results */}
				{state.message && <SuccessMessage>{state.message}</SuccessMessage>}
				{state.error && <ErrorMessage>{state.error}</ErrorMessage>}

				<FormLoadingSpinner />
			</form>
		</section>
	);
};

export default ChangePasswordSetting;
