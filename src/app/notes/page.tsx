import { redirect } from 'next/navigation';

const page = () => {
	redirect('/notes/1');
};

export default page;
