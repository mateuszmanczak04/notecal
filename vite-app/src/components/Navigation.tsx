import { NavLink } from 'react-router';

const Navigation = () => {
	return (
		<>
			<div className='fixed inset-x-0 top-0 flex gap-2 bg-white'>
				<NavLink to='/settings'>Account</NavLink>
				<NavLink to='/calendar'> Calendar</NavLink>
				<NavLink to='/tasks'>Tasks</NavLink>
				<NavLink to='/courses'>Courses</NavLink>
			</div>
		</>
	);
};

export default Navigation;
