export function customRequest(onSuccess, onFailure) {
	return fetch(`https://jsonplaceholder.typicode.com/photos`, {
		method: "GET",
		headers: new Headers({}),
	})
		.then((response) => response.json())
		.then((response) => {
			onSuccess(response);
		})
		.catch((error) => {
			onFailure(error);
		});
}
