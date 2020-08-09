import randomNumberBetween from 'server/utils/randomNumberBetween';

export const data = [
	{short_code: 'ril', name: 'reliance', price: randomNumberBetween(1500, 1600) },
	{short_code: 'ntl', name: 'Nestle', price: randomNumberBetween(200, 250) },
	{short_code: 'hal', name: 'Hindustan Aeronautocs', price: randomNumberBetween(2000, 2500) },
	{short_code: 'sbi', name: 'State bank', price: randomNumberBetween(300,400)},
	{short_code: 'ioc', name: 'Indian Oil Corp', price: randomNumberBetween(120, 190)},
	{short_code: 'xyz', name: 'xyz infra structure', price: randomNumberBetween(3000, 3600) },
	{short_code: 'irctc', name: 'Indian Railway', price: randomNumberBetween(1300, 1500) },
	{short_code: 'goog', name: 'google', price: randomNumberBetween(200000, 250000) },
];

async function seedStocks(models) {
	const totalStocks = await models.stocks.countDocuments({}, function countStockCB(err) {
		if (err) {
			console.log('error counting stocks',err);
			return;
		}
	});

	if (!totalStocks)
	await models.stocks.insertMany(data, function createStockCB(err) {
			if (err) {
				console.log('error seeding stocks');
				return;
			}
			console.log('Seeded Stocks Successfully');
			return;
		});
}

export default seedStocks;
