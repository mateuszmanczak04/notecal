type Props = {
	teacher: string;
};

const Teacher = ({ teacher }: Props) => {
	return (
		<article className='flex flex-col gap-2'>
			<p className='text-xl font-semibold'>Teacher:</p>
			<p>{teacher}</p>
		</article>
	);
};

export default Teacher;
