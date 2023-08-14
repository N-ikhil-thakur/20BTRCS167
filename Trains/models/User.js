const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const UserSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    ownerName: {
        type:String,
        required: true,
    },
    rollNo: {
        type: String,
        required: true,
    },
    ownerEmail: {
        type: String,
        required: true,
    },
    accessCode: {
        type: String,
        required: true,
    },
    clientSecret: {
        type: String,
    }
});


UserSchema.pre('save', async function (next) {
    if(this.isNew){
        this.clientSecret =  Math.random().toString(36).slice(-10);
    }
    next();
})


UserSchema.methods.createJWT = function () {
    const expiry = Date.now()+ (process.env.JWT_ACCESS_EXPIRATION_MINUTES*60*1000);


    return jwt.sign(
        { userId: this._id, companyName: this.companyName },
        process.env.JWT_SECRET,
        {
            expiresIn: expiry,
        }
    )
}


module.exports = mongoose.model('User', UserSchema);