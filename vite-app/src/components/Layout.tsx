import { Outlet } from 'react-router';

export default function Layout() {
	return (
		<div>
			<h1>Layout</h1>
			{/* will either be <Home/> or <Settings/> */}
			<Outlet />
		</div>
	);
}
