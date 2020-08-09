export default function loginApi(email) {
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
