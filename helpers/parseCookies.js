export default function parseCookies() {
	const cookies = document.cookie;
	return cookies.split('; ').map((cookie) => {
		const temp = cookie.split('=');
		return {[`${temp[0]}`]: temp[1]};
	});
}
