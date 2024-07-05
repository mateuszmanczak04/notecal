import React, { FC } from 'react';

interface Props {
	children: React.ReactNode;
}

const SuccessMessage: FC<Props> = ({ children }) => {
	return (
		<div className='flex h-8 items-center justify-center rounded-md bg-green-100 px-4 text-green-500'>
			{children}
		</div>
	);
};

export default SuccessMessage;
