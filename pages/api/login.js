export default async function loginHandler(req, res) {
	if (req.method != 'POST') {
		return res.status(405).json({error: 'Method Not allowed'});
	}

	const result = await req.db.users.findOne({email: req.body.email}).exec();

	if (!result) {
		return res.status(401).json({});
	}

	return res.status(200).json({jwt: ''});
}
