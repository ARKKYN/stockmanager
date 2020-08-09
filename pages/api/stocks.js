
export default async function stocksAPI(req, res) {
    const data = await req.db.stocks.find({}).exec();
    return res.json(data);
}