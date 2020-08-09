export function loginApi(email) {
	return fetch('/api/login', {
		method: 'POST',
		body: JSON.stringify({email}),
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'same-origin',
	});
}

export function refreshAuthApi() {
	return fetch('/api/refreshToken', {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'same-origin',
	});
}
