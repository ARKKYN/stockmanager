
 const data = [
	{name: 'test', email: 'test@test.com'},
	{name: 'fake', email: 'fake@fake.com'},
];

 async function seedUsers(models) {
	const totalUsers = await models.users.countDocuments({});

	if (totalUsers){
	  return;
	}

	await models.users.insertMany(data);
	return;
}

export default seedUsers;
