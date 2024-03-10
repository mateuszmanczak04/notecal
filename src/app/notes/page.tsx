import { redirect } from 'next/navigation';

const page = async () => {
	redirect('/calendar');
	return <div>page</div>;
};

export default page;
