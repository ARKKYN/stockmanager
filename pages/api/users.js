
export default async function usersAPI(req, res) {
    const data = await req.db.users.find({}).exec();
    return res.json(data);
}