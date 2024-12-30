export function addHttpsIfMissing(url: string): string {
	const hasProtocol = url.startsWith('http://') || url.startsWith('https://');
	if (!hasProtocol) {
		return 'https://' + url;
	}
	return url;
}

export function removeProtocol(url: string): string {
	const protocolPattern = /^https?:\/\//;
	return url.replace(protocolPattern, '');
}
