const page = () => {
	return (
		<main className='mx-auto max-w-lg px-8'>
			<h1 className='text-3xl font-bold'>Invalid token</h1>
			<p className='mt-2 opacity-75'>The token from your URL is missing, invalid or has expired</p>
		</main>
	);
};

export default page;
