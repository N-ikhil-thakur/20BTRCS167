const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors/index');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');


const register = async (req, res) => {
    const {companyName, ownerName, rollNo, ownerEmail, accessCode } = req.body;

    const user = await User.create({ companyName, ownerName, rollNo, ownerEmail, accessCode });
    res.status(StatusCodes.CREATED).json({
        companyName: user.companyName,
        clientID: user._id,
        clientSecret: user.clientSecret
    });
}

const login = async (req, res) => {
    const { companyName, clientID, ownerName, ownerEmail,rollNo, clientSecret } = req.body;
    if(!companyName || !clientID || !ownerName || !ownerEmail || !rollNo || !clientSecret) {
        throw new BadRequestError("Missing values");
    }
    

    const user = await User.findOne({
        companyName,
        _id: clientID,
        ownerName,
        ownerEmail,
        rollNo,
        clientSecret
    });
    if (!user) {
        throw new UnauthenticatedError("Invalid credentials .");
    }

    const token = user.createJWT();
    const expiry = Date.now()+ (process.env.JWT_ACCESS_EXPIRATION_MINUTES*60*1000);

    res.status(StatusCodes.OK).json({
        token_type: "Bearer",
        access_token : token,
        expires_in: expiry
    });
}


module.exports = {
    register,
    login
}

























// const register = async (req, res) => {
//     const { name, email, password } = req.body;

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password,salt);
//     const tempUser = { name, email, password:hashedPassword };

//     const user = await User.create({ ...tempUser });
//     res.status(StatusCodes.CREATED).json({user});
// }

