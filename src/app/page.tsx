import queryClient from '@/lib/query-client';
import getSettings from './settings/_actions/get-settings';
import Footer from './_components/Footer';
import Hero from './_components/Hero';

export default async function Home() {
	await queryClient.prefetchQuery({
		queryKey: ['settings'],
		queryFn: getSettings,
	});

	return (
		<div className='flex min-h-screen flex-col'>
			<Hero />
			<Footer />
		</div>
	);
}
