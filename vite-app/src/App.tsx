import { useParams } from 'react-router';

function App() {
	const { id } = useParams();

	return (
		<div>
			<h1>Hello world</h1>
			<p className='text-red-500'>{id}</p>
		</div>
	);
}

export default App;
