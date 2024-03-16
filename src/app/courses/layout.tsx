const layout = ({
	modal,
	children,
}: {
	modal: React.ReactNode;
	children: React.ReactNode;
}) => {
	return (
		<div className='mx-auto max-w-screen-sm p-4'>
			{children}
			{modal}
		</div>
	);
};

export default layout;
