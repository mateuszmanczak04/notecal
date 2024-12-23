'use client';

import { Button } from '@/components/button';
import ErrorMessage from '@/components/error-message';
import FormLoadingSpinner from '@/components/form-loading-spinner';
import { Input } from '@/components/input';
import SuccessMessage from '@/components/success-message';
import { useActionState } from 'react';
import changeEmail from '../_actions/change-email';

const ChangeEmailSetting = () => {
	const [state, formAction] = useActionState(changeEmail, { message: '' });

	return (
		<section className='flex flex-col gap-2'>
			<h2 className='text-lg font-semibold'>Change your e-mail address</h2>

			<form action={formAction} className='mt-2 flex flex-col gap-4'>
				{/* Email field */}
				<div>
					<label htmlFor='change-email-email' className='mb-1 block px-2 font-medium'>
						New e-mail
					</label>
					<Input placeholder='******' type='email' name='email' id='change-email-email' required />
				</div>

				{/* Password field */}
				<div>
					<label htmlFor='change-email-password' className='mb-1 block px-2 font-medium'>
						Your password
					</label>
					<Input placeholder='******' type='password' name='password' id='change-email-password' required />
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

export default ChangeEmailSetting;
