'use client';

import ErrorMessage from '@/components/common/error-message';
import FormLoadingSpinner from '@/components/common/form-loading-spinner';
import SuccessMessage from '@/components/common/success-message';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useActionState } from 'react';
import changePassword from '../_actions/change-password';

const ChangePasswordSetting = () => {
	const [state, formAction] = useActionState(changePassword, { message: '' });

	return (
		<div className='flex flex-col gap-2'>
			<h2 className='text-lg font-semibold'>Change your password</h2>

			<form action={formAction} className='mt-2 flex flex-col gap-4'>
				{/* Old password field */}
				<div>
					<label htmlFor='change-password-old' className='mb-1 block px-2 font-medium'>
						Old password
					</label>
					<Input placeholder='******' type='password' name='oldPassword' id='change-password-old' />
				</div>

				{/* New password field */}
				<div>
					<label htmlFor='change-password-new' className='mb-1 block px-2 font-medium'>
						New password
					</label>
					<Input placeholder='******' type='password' name='newPassword' id='change-password-new' />
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
		</div>
	);
};

export default ChangePasswordSetting;
