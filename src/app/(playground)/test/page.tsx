'use client';

import Button from '@/components/Button';
import { FC } from 'react';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
	const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		fetch('/api/test', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: 'mateusz@gmail.com',
				password: 'hashed-password',
			}),
		});
	};

	return (
		<div className='p-8'>
			<Button onClick={handleClick}>Click Me</Button>
		</div>
	);
};

export default page;
