export const CLIENT_DOMAIN =
	process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : 'https://app.notecal.app/';

export const DEFAULT_NOTE_CONTENT =
	'{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';
