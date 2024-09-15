type Props = {
	teacher: string;
};

const Teacher = ({ teacher }: Props) => {
	return (
		<div className='flex flex-col gap-2'>
			<p className='text-xl font-semibold'>Teacher:</p>
			<div>{teacher}</div>
		</div>
	);
};

export default Teacher;
