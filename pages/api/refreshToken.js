import {JWT_EXPIRY} from 'server/config/config';

import {refreshToken} from 'server/utils/auth/jwt';

export default async function refreshTokenHandler(req, res) {
	if (req.method != 'POST') {
		return res.status(405).json({error: 'Method Not allowed'});
	}

	const token = refreshToken(req.cookies.token);
	if (!token) {
		return res.status(200).json({error: 'session expired'});
	}
	const cookieExpiry = JWT_EXPIRY * 1000;
	res.cookie('client', `${token}`, {maxAge: cookieExpiry});

	return res.status(200).json({});
}
