const layout = ({
	modal,
	children,
}: {
	modal: React.ReactNode;
	children: React.ReactNode;
}) => {
	return (
		<div>
			{children}
			{modal}
		</div>
	);
};

export default layout;
