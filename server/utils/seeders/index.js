import connectDB from "server/config/database";
import seedUsers from "./usersDocumentSeeder";
import seedStocks from "./stocksDocumentSeeder";

async function seedDatabase() {
    const DB = await connectDB();
    await seedStocks(DB.models);
    await seedUsers(DB.models);
    DB.close();
}

export default seedDatabase;
