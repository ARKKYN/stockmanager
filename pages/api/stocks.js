
export default async function stocksAPI(req, res) {
    const data = await req.db.users.findOne({email: req.user.email})
            .populate("stocks").exec();
    return res.json(data);
}