import { JWT_EXPIRY} from 'server/config/config';

import { generateJwt, refreshToken } from 'server/utils/auth/jwt';

export default async function loginHandler(req, res) {
	if (req.method != 'POST') {
		return res.status(405).json({error: 'Method Not allowed'});
	}

	const result = await req.db.users.findOne({email: req.body.email}).exec();

	if (!result) {
		return res.status(401).json({});
	}

	const token = generateJwt(result);

	const cookieExpiry = JWT_EXPIRY * 1000;
	res.cookie('client', `${token}`, {maxAge: cookieExpiry});

	return res.status(200).json({});
}
