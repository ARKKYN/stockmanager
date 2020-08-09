import { JWT_EXPIRY, JWT_KEY } from "server/config/config";
import jwt from 'jsonwebtoken';
import {v4 as uuidv4} from 'uuid';

export function generateJwt(user) {
    const token = jwt.sign({email: user.email, uid: user._id, cid : uuidv4() }, JWT_KEY, {
		algorithm: 'HS256',
		expiresIn: JWT_EXPIRY, // seconds
	});
    return token;
}

export function verifyJwt(token) {
    var payload
	try {
		payload = jwt.verify(token, JWT_KEY);
		return payload;
	} catch (e) {		
		return false;
	}
}

export function refreshToken(oldToken) {
    if(!verifyJwt(oldToken)) {
        return false;
    }

    const payload = JSON.parse(oldToken.split(".")[1]);

    const token = jwt.sign({email: payload.email, uid: payload.uid, cid : payload.cid }, JWT_KEY, {
		algorithm: 'HS256',
		expiresIn: JWT_EXPIRY, // seconds
	});
    return token;
}