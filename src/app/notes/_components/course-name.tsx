type Props = {
	name: string;
};

const CourseName = ({ name }: Props) => {
	return <h2 className='mt-2 text-3xl font-bold'>{name}</h2>;
};

export default CourseName;
