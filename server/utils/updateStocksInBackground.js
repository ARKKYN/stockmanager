import connectDB from 'server/config/database';
import randomNumberBetween from './randomNumberBetween';
import {EventEmitter} from "server/server";

async function updateStockAndEmit(stocks) {
	stocks.forEach(async (x) => {
		const price = randomNumberBetween(x.price, x.price + 20);
		const db = await connectDB();
		db.models.stocks
			.findByIdAndUpdate(x._id, {
				price: price,
			})
			.then((x) => {
                db.close();
				EventEmitter.emit('update', {
					id: x._id,
					price: price,
				});
			})
			.catch((x) => {
				console.log('Connection Error', x);
			});

		return;
	});
}
export default function updateStocksInBackground() {
	setInterval(async () => {
		const db = await connectDB();
		const stocks = await db.models.stocks.find({}).exec();
		db.close();
		updateStockAndEmit(stocks);
	}, 5000);
}
