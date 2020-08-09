import StocksSchema from "server/models/stocks";
import UserSchema from "server/models/user";
import mongoose from "mongoose";

async function connectDB() {
    const connect  = await mongoose.createConnection(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology :  true, 'useFindAndModify' : false , 'useCreateIndex' : true});
    connect.model("users", UserSchema);
    connect.model("stocks", StocksSchema)
    return connect;
}

export default connectDB;