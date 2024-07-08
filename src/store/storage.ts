export function loadState<T>(key: string): T | undefined {
	try {
		const jsonSate = localStorage.getItem(key);
		if (!jsonSate) {
			return undefined;
		}
		return JSON.parse(jsonSate);
	} catch (error) {
		console.error(error);
		return undefined;
	}
}

export function saveState<T>(state: T, key: string) {
	const stringState = JSON.stringify(state);
	localStorage.setItem(key, stringState);
}
