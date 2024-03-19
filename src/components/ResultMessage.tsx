import { FC } from 'react';

interface ResultMessageProps {
	result: {
		status: string;
		message: string;
	};
}

const ResultMessage: FC<ResultMessageProps> = ({ result }) => {
	if (result.status === 'ok')
		return (
			<p className='mt-2 w-fit rounded-md bg-green-500 px-2 py-1 text-white'>
				{result.message}
			</p>
		);

	return (
		<p className='mt-2 w-fit rounded-md bg-red-500 px-2 py-1 text-white'>
			{result.message}
		</p>
	);
};

export default ResultMessage;
