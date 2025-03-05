import { useParams } from 'react-router';

function App() {
	const { id } = useParams();

	return (
		<div>
			<h1>Hello world {id}</h1>
		</div>
	);
}

export default App;
