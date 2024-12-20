import { Button } from '@/components/ui/button';
import db from '@/lib/db';
import { isAfter } from 'date-fns';
import { Mail } from 'lucide-react';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
	title: 'Confirm your e-mail address',
	robots: {
		index: false,
	},
};

type Props = {
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

/**
 * User may get to this page by following a link sent into his email inbox.
 */
const page = async (props: Props) => {
	const searchParams = await props.searchParams;
	const token = searchParams?.token as string | undefined;

	if (!token) {
		redirect('/auth/confirm-email/invalid-token');
	}

	const formAction = async () => {
		'use server';

		const verificationToken = await db.verificationToken.findFirst({
			where: {
				token,
			},
		});

		if (!verificationToken) {
			redirect('/auth/confirm-email/invalid-token');
		}

		const hasExpired = isAfter(new Date(), verificationToken.expires);

		if (hasExpired) {
			redirect('/auth/confirm-email/invalid-token');
		}

		await db.verificationToken.delete({
			where: {
				id: verificationToken.id,
			},
		});

		const user = await db.user.findUnique({
			where: { email: verificationToken.email },
		});

		if (!user) {
			redirect('/auth/confirm-email/invalid-token');
		}

		await db.user.update({
			where: { id: user.id },
			data: { emailVerified: new Date() },
		});

		redirect(`/auth/confirm-email/success?email=${verificationToken.email}`);
	};

	return (
		<main className='mx-auto  max-w-lg px-6'>
			<h1 className='px-2 text-3xl font-bold'>Confirm your e-mail address</h1>
			<p className='mt-2 px-2 opacity-75'>
				Confirming your e-mail address will help you recover access to your account if you lose your password.
			</p>

			<Button type='submit' className='mt-4 w-full' onClick={formAction}>
				<Mail className='h-4 w-4' />
				Confirm
			</Button>

			<p className='mt-4 px-2 opacity-75'>
				<small>We will not send you any marketing spam.</small>
			</p>
		</main>
	);
};

export default page;
