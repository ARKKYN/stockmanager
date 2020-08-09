
const data = [
	{name: 'test', email: 'test@test.com'},
	{name: 'fake', email: 'fake@fake.com'},
];

 const seedUsers = async  (models)  => {
	const totalUsers = await models.users.countDocuments({}, function countUsersCB(err) {
		if (err) {
			console.log('error counting users', err);
			return;
		}
	});

	if (!totalUsers)
	   await models.users.insertMany(data, function createUsersCB(err) {
			if (!err) {
				console.log('error seeding Users');
				return;
			}

			console.log('Seeded Users Successfully');
			return;
		});
}

export default seedUsers;
