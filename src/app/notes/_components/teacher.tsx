type Props = {
	teacher: string;
};

const Teacher = ({ teacher }: Props) => {
	return (
		<div className='flex flex-col gap-2'>
			<p className='text-xl font-semibold'>Teacher:</p>
			<p>{teacher}</p>
		</div>
	);
};

export default Teacher;
