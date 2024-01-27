import { hash } from "bcrypt";
import { Schema } from "mongoose";

export const UserSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
})

// validar se a senha está sendo enviada.
UserSchema.pre('save', async function (next) {
    try {
        if (!this.isModified("password")) {
            return next()
        }

        this['password'] = await hash(this['password'], 10)
    }
    catch (err) {
        return next(err)
    }
})