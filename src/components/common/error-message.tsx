import React, { FC } from 'react';

interface Props {
	children: React.ReactNode;
}

const ErrorMessage: FC<Props> = ({ children }) => {
	return (
		<div className='flex h-8 items-center justify-center rounded-md bg-red-100 px-4 text-red-500'>
			{children}
		</div>
	);
};

export default ErrorMessage;
