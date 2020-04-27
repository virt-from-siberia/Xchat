import { isEmail } from 'validator';
import mongoose, { Schema, Document } from "mongoose";
import { generatePasswordHash } from '../utils'


export interface IUser extends Document {
    email?: string,
    fullname?: string,
    password?: string,
    confirmed?: boolean,
    avatar?: string,
    confirmed_hash?: string,
    last_seen?: Date
}


//TODO: Create last visit
const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            validate: [isEmail, 'Invalid email'],
            unique: true,
        },
        fullname: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        confirmed: {
            type: Boolean,
            default: false,
        },
        avatar: String,
        confirmed_hash: String,
        last_seen: {
            type: Date,
            default: new Date()
        },
    },
    {
        timestamps: true,
    }
);

UserSchema.pre('save', function (next) {
    const user: IUser = this;

    if (!user.isModified('password')) return next();


    generatePasswordHash(user.password).then((hash) => {
        user.password = String(hash);
        next();
    }).catch(err => {
        next(err)
    })
})

const UserModel = mongoose.model<IUser>("User", UserSchema);
export default UserModel;
