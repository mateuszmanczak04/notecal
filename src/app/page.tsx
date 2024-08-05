import queryClient from '@/lib/query-client';
import Footer from './_components/footer';
import Hero from './_components/hero';
import getSettings from './settings/_actions/get-settings';

export default async function Home() {
	await queryClient.prefetchQuery({
		queryKey: ['settings'],
		queryFn: getSettings,
	});

	return (
		<div className='flex flex-col'>
			<Hero />
			<Footer />
		</div>
	);
}
