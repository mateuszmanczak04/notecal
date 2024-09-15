type Props = {
	title: string;
	time: string;
};

const Title = ({ title, time }: Props) => {
	return (
		<div>
			<h1 className='mt-2 text-xl font-semibold'>
				{title}
				<span className='ml-2 text-sm opacity-75'>({time})</span>
			</h1>
		</div>
	);
};

export default Title;
