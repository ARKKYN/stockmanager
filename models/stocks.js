import mongoose from "mongoose";

const Schema = mongoose.Schema;

const StocksSchema = new Schema({
    id : mongoose.ObjectId,
    short_code: {
        type: 'String',
        unique: true
    },
    name: {
        type: 'String',
        unique: true
    },
    price: 'Number',
    users: [{
        type: Schema.Types.ObjectId,
        ref: "users"
    }]
}, {
    timestamps : true
});



export default StocksSchema;