'use client';

import ErrorMessage from '@/components/common/error-message';
import FormLoadingSpinner from '@/components/common/form-loading-spinner';
import SuccessMessage from '@/components/common/success-message';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useActionState } from 'react';
import changeEmail from '../_actions/change-email';

const ChangeEmailSetting = () => {
	const [state, formAction] = useActionState(changeEmail, { message: '' });

	return (
		<div className='flex flex-col gap-2'>
			<h2 className='text-lg font-semibold'>Change your e-mail address</h2>

			<form action={formAction} className='mt-2 flex flex-col gap-4'>
				{/* Email field */}
				<div>
					<label htmlFor='change-email-email' className='mb-1 block px-2 font-medium'>
						New e-mail
					</label>
					<Input placeholder='******' type='email' name='email' id='change-email-email' />
				</div>

				{/* Password field */}
				<div>
					<label htmlFor='change-email-password' className='mb-1 block px-2 font-medium'>
						Your password
					</label>
					<Input placeholder='******' type='password' name='password' id='change-email-password' />
				</div>

				{/* Submit button */}
				<Button type='submit' className='gap-2'>
					Save
				</Button>

				{/* Form results */}
				{state.message && <SuccessMessage>{state.message}</SuccessMessage>}
				{state.error && <ErrorMessage>{state.error}</ErrorMessage>}

				<FormLoadingSpinner />
			</form>
		</div>
	);
};

export default ChangeEmailSetting;
