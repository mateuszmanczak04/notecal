const percentageToTime = (percentage: number) => {
	const hours = Math.floor(percentage * 24);
	const minutes = Math.floor((percentage * 24 - hours) * 60);
	return { hours, minutes };
};

export default percentageToTime;
