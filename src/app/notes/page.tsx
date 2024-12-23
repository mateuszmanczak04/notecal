import { redirect } from 'next/navigation';

/**
 * This page doesn't show any useful things so we only redirect user to /courses page.
 */
const page = () => {
	redirect('/courses');
};

export default page;
