import {JWT_KEY, JWT_EXPIRY} from 'server/config/config';
import jwt from 'jsonwebtoken';
import {v4 as uuidv4} from 'uuid';

export default async function loginHandler(req, res) {
	if (req.method != 'POST') {
		return res.status(405).json({error: 'Method Not allowed'});
	}

	const result = await req.db.users.findOne({email: req.body.email}).exec();

	if (!result) {
		return res.status(401).json({});
	}

	const token = jwt.sign({email: result.email, id: uuidv4()}, JWT_KEY, {
		algorithm: 'HS256',
		expiresIn: JWT_EXPIRY, // seconds
	});

	const secure = process.env.NODE_ENV == 'production';
	const cookieExpiry = JWT_EXPIRY * 1000;
	res.cookie('client', `${token}`, {maxAge: JWT_EXPIRY * 1000, secure: secure});

	return res.status(200).json({});
}
