import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id : mongoose.ObjectId,
    email: {
        type: 'String',
        unique: true
    },
    name: 'String',
    stocks:  [{
        type: Schema.Types.ObjectId,
        ref: "stocks"
    }]
}, {
    timestamps: true
});



export default UserSchema;
